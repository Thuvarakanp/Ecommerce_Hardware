import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ChevronLeft } from 'lucide-react'
import ProductImage from '../components/ProductImage'
import { StockLabel } from '../components/ProductCard'
import { api, money } from '../lib/api'
import { useCart } from '../lib/cart'
import { useFetch } from '../lib/useFetch'

export default function ProductPage() {
  const { id = '' } = useParams()
  const { data: p, error, loading } = useFetch(() => api.product(id), [id])
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32">
      <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-fg"><ChevronLeft size={16} /> All parts</Link>
      {loading && <p className="text-zinc-500">Loading…</p>}
      {error && <p className="text-ember">{error}</p>}
      {p && (
        <div className="grid gap-10 md:grid-cols-2">
          <ProductImage product={p} className="aspect-square rounded-2xl" />
          <div>
            <p className="text-sm uppercase tracking-wider text-zinc-500">{p.brand} · {p.category}</p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight">{p.name}</h1>
            <p className="mt-4 font-display text-3xl font-bold">{money(p.price_cents)}</p>
            <div className="mt-1"><StockLabel stock={p.stock} /></div>
            <p className="mt-6 leading-relaxed text-zinc-300">{p.description}</p>
            <p className="mt-4 font-mono text-xs text-zinc-500">SKU {p.sku}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                Qty
                <input
                  id="qty" type="number" min={1} max={Math.min(p.stock, 99)} value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value) || 1, p.stock, 99)))}
                  className="w-20 rounded-xl border border-line bg-panel px-3 py-2.5 outline-none focus:border-amber"
                />
              </label>
              <button
                disabled={p.stock === 0}
                onClick={() => { add(p, qty); setAdded(true); setTimeout(() => setAdded(false), 1800) }}
                className="inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                {added ? <><Check size={18} /> Added</> : 'Add to cart'}
              </button>
              <Link to="/cart" className="text-sm text-zinc-400 underline-offset-4 hover:text-fg hover:underline">View cart</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
