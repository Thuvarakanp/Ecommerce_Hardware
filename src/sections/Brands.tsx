const brands = ['VOLTRA', 'ANVIL&CO', 'BEAMLINE', 'TORQUE', 'STEELHAUS', 'KRAFTON', 'NORTHGRIP', 'BOLTWORKS']

export default function Brands() {
  const row = [...brands, ...brands]
  return (
    <section className="border-y border-line bg-panel/40 py-8" aria-label="Brands we stock">
      <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-zinc-500">Trusted brands on every shelf</p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex w-max gap-16 pr-16 hover:[animation-play-state:paused]" style={{ animation: 'marquee 30s linear infinite' }}>
          {row.map((b, i) => (
            <span key={i} className="font-display text-2xl font-bold tracking-wider text-zinc-600 transition-colors hover:text-amber-ink">{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
