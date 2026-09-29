import express from 'express'
import crypto from 'node:crypto'
import { db } from './db.js'

export const app = express()
app.use(express.json({ limit: '50kb' }))

const SORTS = {
  featured: 'featured DESC, name ASC',
  'price-asc': 'price_cents ASC',
  'price-desc': 'price_cents DESC',
  name: 'name ASC',
}

app.get('/api/categories', (_req, res) => {
  res.json(db.prepare('SELECT category AS name, COUNT(*) AS count FROM products GROUP BY category ORDER BY category').all())
})

app.get('/api/products', (req, res) => {
  const { q = '', category = '', sort = 'featured', featured } = req.query
  const where = []
  const args = []
  if (q) { where.push('(name LIKE ? OR brand LIKE ? OR sku LIKE ?)'); const l = `%${q}%`; args.push(l, l, l) }
  if (category) { where.push('category = ?'); args.push(category) }
  if (featured) where.push('featured = 1')
  const sql = `SELECT * FROM products ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY ${SORTS[sort] ?? SORTS.featured}`
  res.json(db.prepare(sql).all(...args))
})

app.get('/api/products/:id', (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE id = ?').get(Number(req.params.id))
  if (!p) return res.status(404).json({ error: 'Product not found' })
  res.json(p)
})

app.post('/api/orders', (req, res) => {
  const { name, email, address, items } = req.body ?? {}
  const str = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max
  if (!str(name, 100) || !str(address, 300) || !str(email, 120) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ error: 'Enter your name, a valid email and a delivery address.' })
  if (!Array.isArray(items) || items.length === 0 || items.length > 50 ||
      !items.every((i) => Number.isInteger(i?.productId) && Number.isInteger(i?.qty) && i.qty >= 1 && i.qty <= 99))
    return res.status(400).json({ error: 'Your cart is empty or invalid.' })

  const getP = db.prepare('SELECT * FROM products WHERE id = ?')
  const dec = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?')
  db.exec('BEGIN IMMEDIATE')
  try {
    const merged = new Map()
    for (const i of items) merged.set(i.productId, (merged.get(i.productId) ?? 0) + i.qty)
    const lines = []
    for (const [productId, qty] of merged) {
      const p = getP.get(productId)
      if (!p) throw Object.assign(new Error('A product in your cart no longer exists.'), { status: 409 })
      if (dec.run(qty, productId, qty).changes === 0)
        throw Object.assign(new Error(`Only ${p.stock} of "${p.name}" left in stock.`), { status: 409 })
      lines.push({ p, qty })
    }
    const total = lines.reduce((s, l) => s + l.p.price_cents * l.qty, 0)
    const code = 'ORD-' + crypto.randomBytes(5).toString('hex').toUpperCase()
    const { lastInsertRowid } = db.prepare('INSERT INTO orders (code,name,email,address,total_cents) VALUES (?,?,?,?,?)').run(code, name.trim(), email.trim(), address.trim(), total)
    const insI = db.prepare('INSERT INTO order_items (order_id,product_id,name,unit_cents,qty) VALUES (?,?,?,?,?)')
    for (const { p, qty } of lines) insI.run(lastInsertRowid, p.id, p.name, p.price_cents, qty)
    db.exec('COMMIT')
    res.status(201).json({ code, total_cents: total })
  } catch (e) {
    db.exec('ROLLBACK')
    res.status(e.status ?? 500).json({ error: e.status ? e.message : 'Could not place the order.' })
  }
})

app.get('/api/orders/:code', (req, res) => {
  const o = db.prepare('SELECT id, code, name, email, address, total_cents, status, created_at FROM orders WHERE code = ?').get(req.params.code)
  if (!o) return res.status(404).json({ error: 'Order not found' })
  const items = db.prepare('SELECT name, unit_cents, qty FROM order_items WHERE order_id = ?').all(o.id)
  res.json({ ...o, items })
})
