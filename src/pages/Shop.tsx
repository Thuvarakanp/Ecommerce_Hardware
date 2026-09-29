import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'
import { useFetch } from '../lib/useFetch'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const sort = params.get('sort') ?? 'featured'
  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (v && !(k === 'sort' && v === 'featured')) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  const cats = useFetch(() => api.categories(), [])
  const prods = useFetch(() => api.products({ q, category, sort }), [q, category, sort])

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <h1 className="font-display text-4xl font-bold tracking-tight">Shop parts</h1>
      <p className="mt-2 text-zinc-400">Bike and vehicle parts with live stock.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <label className="relative min-w-[14rem] flex-1">
          <span className="sr-only">Search products</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            id="search"
            value={q}
            onChange={(e) => set('q', e.target.value)}
            placeholder="Search name, brand or SKU"
            className="w-full rounded-xl border border-line bg-panel py-2.5 pl-9 pr-3 outline-none focus:border-amber"
          />
        </label>
        <label>
          <span className="sr-only">Sort by</span>
          <select id="sort" value={sort} onChange={(e) => set('sort', e.target.value)} className="rounded-xl border border-line bg-panel px-3 py-2.5 outline-none focus:border-amber">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Categories">
        {[{ name: '', count: 0 }, ...(cats.data ?? [])].map((c) => (
          <button
            key={c.name || 'all'}
            onClick={() => set('category', c.name)}
            aria-pressed={category === c.name}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${category === c.name ? 'border-fg bg-fg text-ink' : 'border-line hover:border-zinc-500'}`}
          >
            {c.name || 'All'}
          </button>
        ))}
      </div>

      <div className="mt-8" aria-live="polite">
        {prods.error && <p className="rounded-xl border border-ember/40 bg-ember/10 p-4 text-ember">Could not load products: {prods.error}</p>}
        {prods.loading && !prods.data && <p className="text-zinc-500">Loading…</p>}
        {prods.data && prods.data.length === 0 && <p className="text-zinc-500">No products match your search.</p>}
        {prods.data && prods.data.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {prods.data.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
