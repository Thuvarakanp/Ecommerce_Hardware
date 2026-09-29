import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/fx/Reveal'
import SpotlightCard from '../components/fx/SpotlightCard'
import { api } from '../lib/api'
import { categoryMeta, iconFor } from '../lib/categories'
import { useFetch } from '../lib/useFetch'

export default function Categories() {
  const { data } = useFetch(() => api.categories(), [])
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="font-display text-4xl font-bold tracking-tight">Shop by category</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(data ?? []).map((c, i) => {
          const Icon = iconFor(c.name)
          return (
            <motion.div key={c.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}>
              <Link to={`/shop?category=${encodeURIComponent(c.name)}`} className="block h-full">
                <SpotlightCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-8 flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber/15 text-amber-ink"><Icon size={24} /></span>
                    <ArrowUpRight size={18} className="text-zinc-500 transition-all group-hover:text-amber-ink" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{categoryMeta[c.name]?.blurb}</p>
                  <p className="mt-3 font-mono text-xs text-zinc-500">{c.count} products</p>
                </SpotlightCard>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
