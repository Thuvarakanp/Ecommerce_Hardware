import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product } from './api'

export type CartLine = { product: Product; qty: number }
type Cart = {
  lines: CartLine[]
  count: number
  subtotal: number
  add: (p: Product, qty?: number) => void
  setQty: (id: number, qty: number) => void
  remove: (id: number) => void
  clear: () => void
}

const KEY = 'cart.v1'
const Ctx = createContext<Cart | null>(null)

function load(): CartLine[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch { /* storage unavailable */ }
  }, [lines])

  const value = useMemo<Cart>(() => {
    const clamp = (p: Product, q: number) => Math.max(1, Math.min(q, p.stock, 99))
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.product.price_cents * l.qty, 0),
      add: (p, qty = 1) => setLines((ls) => {
        const found = ls.find((l) => l.product.id === p.id)
        return found
          ? ls.map((l) => (l.product.id === p.id ? { product: p, qty: clamp(p, l.qty + qty) } : l))
          : [...ls, { product: p, qty: clamp(p, qty) }]
      }),
      setQty: (id, qty) => setLines((ls) => ls.map((l) => (l.product.id === id ? { ...l, qty: clamp(l.product, qty) } : l))),
      remove: (id) => setLines((ls) => ls.filter((l) => l.product.id !== id)),
      clear: () => setLines([]),
    }
  }, [lines])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside CartProvider')
  return c
}
