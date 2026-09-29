import { Star } from 'lucide-react'
import Reveal from '../components/fx/Reveal'
import SpotlightCard from '../components/fx/SpotlightCard'

const reviews = [
  { q: "Stock counts on the site are actually right. We stopped losing jobs to 'sorry, none left'.", n: 'Carlos M.', r: 'Site foreman' },
  { q: 'Team accounts with spending limits saved our office manager hours every week.', n: 'Aisha K.', r: 'Contractor, 12 staff' },
  { q: 'Next-day delivery on a full pallet of fasteners. Prices beat every distributor we tried.', n: 'Jon P.', r: 'Workshop owner' },
]

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="mb-14 text-center">
        <p className="mb-3 font-mono text-sm text-amber-ink">/ 05 — REVIEWS</p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Trusted on real job sites</h2>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.n} delay={i * 0.1}>
            <SpotlightCard className="h-full p-7">
              <div className="mb-4 flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} className="fill-amber text-amber-ink" />)}</div>
              <p className="leading-relaxed text-zinc-200">"{r.q}"</p>
              <p className="mt-6 font-display font-semibold">{r.n}</p>
              <p className="text-sm text-zinc-500">{r.r}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
