import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, money } from '../lib/api'
import { useCart } from '../lib/cart'

const field = 'w-full rounded-xl border border-line bg-panel px-3 py-2.5 outline-none focus:border-amber'

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const nav = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-xl px-5 pt-36 text-center">
        <p className="text-zinc-400">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block text-amber-ink underline">Browse parts</Link>
      </div>
    )

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true); setError('')
    try {
      const { code } = await api.placeOrder({
        name: String(f.get('name')), email: String(f.get('email')), address: String(f.get('address')),
        items: lines.map((l) => ({ productId: l.product.id, qty: l.qty })),
      })
      clear()
      nav(`/order/${code}`)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <h1 className="font-display text-4xl font-bold tracking-tight">Checkout</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_18rem]">
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm">Full name<input id="name" name="name" required maxLength={100} autoComplete="name" className={field + ' mt-1'} /></label>
          <label className="block text-sm">Email<input id="email" name="email" type="email" required maxLength={120} autoComplete="email" className={field + ' mt-1'} /></label>
          <label className="block text-sm">Delivery address<textarea id="address" name="address" required maxLength={300} rows={3} autoComplete="street-address" className={field + ' mt-1'} /></label>
          <p className="rounded-xl border border-line bg-panel p-3 text-sm text-zinc-400">Payment is not connected yet. Orders are recorded as placed and stock is reserved.</p>
          {error && <p role="alert" className="rounded-xl border border-ember/40 bg-ember/10 p-3 text-sm text-ember">{error}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-amber py-3 font-semibold text-black hover:opacity-90 disabled:opacity-50">{busy ? 'Placing order…' : `Place order · ${money(subtotal)}`}</button>
        </form>
        <aside className="h-fit rounded-2xl border border-line bg-panel p-5 text-sm">
          <ul className="space-y-2">
            {lines.map(({ product: p, qty }) => (
              <li key={p.id} className="flex justify-between gap-3"><span className="min-w-0 truncate">{qty} × {p.name}</span><span className="font-mono">{money(p.price_cents * qty)}</span></li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-3 font-semibold"><span>Total</span><span>{money(subtotal)}</span></div>
        </aside>
      </div>
    </div>
  )
}
