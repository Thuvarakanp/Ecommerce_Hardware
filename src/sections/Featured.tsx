import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/fx/Reveal'
import { api } from '../lib/api'
import { useFetch } from '../lib/useFetch'

export default function Featured() {
  const { data } = useFetch(() => api.products({ featured: '1' }), [])
  return (
    <section className="bg-panel/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight">Featured parts</h2>
          <Link to="/shop" className="text-sm text-zinc-400 underline-offset-4 hover:text-fg hover:underline">View all products →</Link>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(data ?? []).slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}
