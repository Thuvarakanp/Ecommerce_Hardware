import { motion } from 'motion/react'
import { Plus, Star } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../components/fx/Reveal'
import TiltCard from '../components/fx/TiltCard'
import { products } from '../data/products'

export default function Featured() {
  const [added, setAdded] = useState<Record<string, boolean>>({})
  return (
    <section className="relative bg-panel/30 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-sm text-amber">/ 02 — FEATURED</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">This week's <span className="text-gradient">top gear</span></h2>
          </div>
          <a href="#shop" className="text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline">View all products →</a>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const low = p.stock < 15
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <TiltCard className="group h-full rounded-2xl border border-line bg-panel p-4 transition-colors hover:border-amber/40">
                  <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-950">
                    <div className="absolute h-32 w-32 rounded-full bg-amber/0 blur-2xl transition-all duration-500 group-hover:bg-amber/25" />
                    <p.icon size={72} strokeWidth={1.2} className="relative text-zinc-300 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-amber" />
                    {p.tag && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${low ? 'bg-ember/20 text-ember' : 'bg-amber/15 text-amber'}`}>{p.tag}</span>}
                  </div>
                  <div className="px-1 pt-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">{p.brand}</p>
                    <h3 className="mt-1 min-h-[2.75rem] font-display font-semibold leading-snug">{p.name}</h3>
                    <p className="mt-2 flex items-center gap-1 text-xs text-zinc-400"><Star size={13} className="fill-amber text-amber" /> {p.rating}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="font-display text-xl font-bold">${p.price}</span>
                        {p.was && <span className="ml-2 text-sm text-zinc-600 line-through">${p.was}</span>}
                        <p className={`mt-0.5 font-mono text-[11px] ${low ? 'text-ember' : 'text-emerald-400'}`}>{low ? `Only ${p.stock} left` : `${p.stock} in stock`}</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setAdded((a) => ({ ...a, [p.id]: !a[p.id] }))}
                        aria-label={`Add ${p.name} to cart`}
                        className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${added[p.id] ? 'bg-emerald-400 text-black' : 'bg-white text-black hover:bg-amber'}`}
                      >
                        <motion.span animate={{ rotate: added[p.id] ? 135 : 0 }}><Plus size={18} /></motion.span>
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
