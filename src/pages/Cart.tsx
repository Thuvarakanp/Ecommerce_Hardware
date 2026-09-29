import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import ProductImage from '../components/ProductImage'
import { money } from '../lib/api'
import { useCart } from '../lib/cart'

export default function Cart() {
  const { lines, subtotal, setQty, remove } = useCart()
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <h1 className="font-display text-4xl font-bold tracking-tight">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-line bg-panel p-10 text-center">
          <p className="text-zinc-400">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block rounded-xl bg-amber px-5 py-2.5 font-semibold text-black">Browse parts</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_18rem]">
          <ul className="divide-y divide-line rounded-2xl border border-line bg-panel">
            {lines.map(({ product: p, qty }) => (
              <li key={p.id} className="flex gap-4 p-4">
                <ProductImage product={p} className="h-20 w-20 shrink-0 rounded-lg" />
                <div className="min-w-0 flex-1">
                  <Link to={`/product/${p.id}`} className="font-medium hover:text-amber-ink">{p.name}</Link>
                  <p className="text-sm text-zinc-500">{money(p.price_cents)} each</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button aria-label="Decrease quantity" onClick={() => setQty(p.id, qty - 1)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:bg-fg/5"><Minus size={14} /></button>
                    <span className="w-8 text-center font-mono">{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => setQty(p.id, qty + 1)} disabled={qty >= p.stock} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:bg-fg/5 disabled:opacity-30"><Plus size={14} /></button>
                    <button aria-label={`Remove ${p.name}`} onClick={() => remove(p.id)} className="ml-2 text-zinc-500 hover:text-ember"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="font-display font-semibold">{money(p.price_cents * qty)}</p>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-2xl border border-line bg-panel p-5">
            <div className="flex justify-between"><span className="text-zinc-400">Subtotal</span><span className="font-display text-xl font-bold">{money(subtotal)}</span></div>
            <p className="mt-1 text-xs text-zinc-500">Shipping is arranged after your order.</p>
            <Link to="/checkout" className="mt-5 block rounded-xl bg-amber py-3 text-center font-semibold text-black hover:opacity-90">Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  )
}
