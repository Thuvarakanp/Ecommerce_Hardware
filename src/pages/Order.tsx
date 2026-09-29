import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { api, money } from '../lib/api'
import { useFetch } from '../lib/useFetch'

export default function OrderPage() {
  const { code = '' } = useParams()
  const { data: o, error, loading } = useFetch(() => api.order(code), [code])
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-32">
      {loading && <p className="text-zinc-500">Loading…</p>}
      {error && <p className="text-ember">{error}</p>}
      {o && (
        <>
          <CheckCircle2 size={40} className="text-emerald-600" />
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Order placed</h1>
          <p className="mt-2 text-zinc-400">Order <span className="font-mono text-fg">{o.code}</span> for {o.name}. Keep this reference.</p>
          <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-panel">
            {o.items.map((i, k) => (
              <li key={k} className="flex justify-between gap-3 p-4"><span>{i.qty} × {i.name}</span><span className="font-mono">{money(i.unit_cents * i.qty)}</span></li>
            ))}
            <li className="flex justify-between p-4 font-semibold"><span>Total</span><span>{money(o.total_cents)}</span></li>
          </ul>
          <p className="mt-6 text-sm text-zinc-500">Delivering to: {o.address}</p>
          <Link to="/shop" className="mt-8 inline-block rounded-xl bg-amber px-5 py-2.5 font-semibold text-black">Continue shopping</Link>
        </>
      )}
    </div>
  )
}
