import test from 'node:test'
import assert from 'node:assert/strict'
process.env.DB_FILE = ':memory:'
const { app } = await import('./app.js')
const server = app.listen(0)
const base = `http://localhost:${server.address().port}`
const j = (p, o) => fetch(base + p, o).then(async (r) => ({ status: r.status, body: await r.json() }))
const post = (p, b) => j(p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) })
const cust = { name: 'A B', email: 'a@b.co', address: '1 Road' }
test.after(() => server.close())

test('lists, filters and searches products', async () => {
  assert.ok((await j('/api/products')).body.length >= 20)
  const brakes = (await j('/api/products?category=Brakes')).body
  assert.ok(brakes.length > 0 && brakes.every((p) => p.category === 'Brakes'))
  assert.equal((await j('/api/products?q=zzzz')).body.length, 0)
})
test('order decrements stock and uses server prices', async () => {
  const p = (await j('/api/products/1')).body
  const r = await post('/api/orders', { ...cust, items: [{ productId: 1, qty: 2, price: 1 }] })
  assert.equal(r.status, 201)
  assert.equal(r.body.total_cents, p.price_cents * 2)
  assert.equal((await j('/api/products/1')).body.stock, p.stock - 2)
  assert.equal((await j('/api/orders/' + r.body.code)).body.items[0].qty, 2)
})
test('rejects oversell without changing stock', async () => {
  const before = (await j('/api/products/17')).body.stock
  const r = await post('/api/orders', { ...cust, items: [{ productId: 1, qty: 1 }, { productId: 17, qty: before + 1 }] })
  assert.equal(r.status, 409)
  assert.equal((await j('/api/products/17')).body.stock, before)
})
test('validates input', async () => {
  assert.equal((await post('/api/orders', { ...cust, email: 'nope', items: [{ productId: 1, qty: 1 }] })).status, 400)
  assert.equal((await post('/api/orders', { ...cust, items: [] })).status, 400)
})
