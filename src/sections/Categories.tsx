import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/fx/Reveal'
import SpotlightCard from '../components/fx/SpotlightCard'
import SplitText from '../components/fx/SplitText'
import { categories } from '../data/products'

export default function Categories() {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-sm text-amber">/ 01 — CATEGORIES</p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl"><SplitText text="Every aisle, one click away." /></h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}>
            <a href="#shop" className="block h-full">
              <SpotlightCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-10 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber/10 text-amber ring-1 ring-amber/20"><c.icon size={24} /></span>
                  <ArrowUpRight size={18} className="text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber" />
                </div>
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{c.blurb}</p>
                <p className="mt-4 font-mono text-xs text-zinc-500">{c.count.toLocaleString()} items</p>
              </SpotlightCard>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
