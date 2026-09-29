import { motion } from 'motion/react'
import { ArrowRight, PackageCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Aurora from '../components/fx/Aurora'
import Magnetic from '../components/fx/Magnetic'
import SplitText from '../components/fx/SplitText'
import ProductImage from '../components/ProductImage'
import { StockLabel } from '../components/ProductCard'
import { api, money } from '../lib/api'
import { useFetch } from '../lib/useFetch'

const chips = [
  { icon: PackageCheck, t: 'Live stock counts' },
  { icon: Truck, t: 'Order lookup by reference code' },
]

export default function Hero() {
  const { data } = useFetch(() => api.products({ featured: '1' }), [])
  const p = data?.[0]
  return (
    <section className="noise relative isolate flex items-center overflow-hidden pb-24 pt-36">
      <Aurora className="absolute inset-x-0 bottom-0 -z-10 h-[70%] opacity-70" />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <SplitText text="Parts that keep" delay={0.1} />
            <SplitText text="you moving." charClassName="text-amber-ink" delay={0.4} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Brakes, chains, tyres, lighting and more for bikes, scooters and motorcycles. Search by name, brand or SKU and see what is in stock before you order.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className="mt-8">
            <Magnetic>
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3.5 font-semibold text-black shadow-lg shadow-amber/30">
                Shop all parts <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </motion.div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400">
            {chips.map(({ icon: I, t }) => (
              <li key={t} className="flex items-center gap-2"><I size={16} className="text-amber-ink" /> {t}</li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">
          {p && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <Link to={`/product/${p.id}`} className="block rounded-3xl border border-line bg-panel/80 p-5 shadow-2xl shadow-shade backdrop-blur-xl transition-transform hover:-translate-y-1">
                <ProductImage product={p} className="aspect-[4/3] rounded-2xl" />
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">{p.brand} · Featured</p>
                    <p className="mt-1 truncate font-display text-lg font-semibold">{p.name}</p>
                    <StockLabel stock={p.stock} />
                  </div>
                  <p className="font-display text-2xl font-bold">{money(p.price_cents)}</p>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
