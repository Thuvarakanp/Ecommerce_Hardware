import CountUp from '../components/fx/CountUp'
import Reveal from '../components/fx/Reveal'

const stats = [
  { to: 12480, suffix: '+', label: 'Products in stock' },
  { to: 48, suffix: 'K', label: 'Trade customers' },
  { to: 99.2, suffix: '%', label: 'Stock accuracy', decimals: 1 },
  { to: 24, suffix: 'h', label: 'Average delivery' },
]

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-8 text-center">
            <p className="text-gradient font-display text-5xl font-bold"><CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} /></p>
            <p className="mt-2 text-sm text-zinc-400">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
