import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { useRef } from 'react'
import Aurora from '../components/fx/Aurora'
import Magnetic from '../components/fx/Magnetic'
import ShinyText from '../components/fx/ShinyText'
import SplitText from '../components/fx/SplitText'
import TiltCard from '../components/fx/TiltCard'

const chips = [
  { icon: Truck, t: 'Same-day dispatch' },
  { icon: ShieldCheck, t: '2-year warranty' },
  { icon: PackageCheck, t: 'Live stock counts' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="noise relative isolate flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <Aurora className="absolute inset-x-0 bottom-0 -z-10 h-[75%] opacity-80" />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div style={{ y, opacity: fade }} className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-fg/5 px-3 py-1.5 text-xs backdrop-blur"
          >
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            <ShinyText>12,480 SKUs in stock · updated live</ShinyText>
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            <SplitText text="Built for people" delay={0.3} />
            <SplitText text="who build things." charClassName="text-amber-ink" delay={0.7} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Professional-grade tools, fasteners and materials — backed by real-time inventory, trade pricing and team accounts that keep your whole crew ordering from one place.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.7 }} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#shop" className="group inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3.5 font-semibold text-black shadow-[0_0_40px_-8px] shadow-amber transition-shadow hover:shadow-[0_0_60px_-4px] hover:shadow-amber">
                Shop the catalog <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#inventory" className="inline-flex items-center gap-2 rounded-xl border border-line bg-fg/5 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:bg-fg/10">
                See the dashboard
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul initial="h" animate="s" transition={{ staggerChildren: 0.12, delayChildren: 1.8 }} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400">
            {chips.map(({ icon: I, t }) => (
              <motion.li key={t} variants={{ h: { opacity: 0, x: -12 }, s: { opacity: 1, x: 0 } }} className="flex items-center gap-2">
                <I size={16} className="text-amber-ink" /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="hidden lg:block">
          <HeroCard />
        </motion.div>
      </motion.div>
    </section>
  )
}

function HeroCard() {
  return (
    <TiltCard className="relative">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-3xl border border-fg/10 bg-gradient-to-b from-panel to-panel/60 p-6 shadow-2xl shadow-shade backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between text-xs text-zinc-400">
          <span className="rounded-full bg-amber/15 px-2.5 py-1 font-medium text-amber-ink">Best seller</span>
          <span className="font-mono">SKU VLT-2041</span>
        </div>
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950">
          <div className="absolute h-56 w-56 rounded-full bg-amber/30 blur-3xl" />
          <motion.svg viewBox="0 0 200 140" className="relative h-44 w-64" animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <rect x="20" y="40" width="110" height="46" rx="14" fill="#ffb020" />
            <rect x="30" y="50" width="70" height="8" rx="4" fill="#0a0a0d" opacity=".35" />
            <rect x="130" y="50" width="42" height="26" rx="6" fill="#3a3a44" />
            <rect x="172" y="58" width="16" height="10" rx="3" fill="#8a8a96" />
            <path d="M52 86h34l-8 44H60z" fill="#1c1c22" stroke="#3a3a44" />
            <circle cx="48" cy="63" r="6" fill="#0a0a0d" /><circle cx="48" cy="63" r="2" fill="#ff5a1f" />
          </motion.svg>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="font-display text-lg font-semibold">BrushlessPro 20V Drill</p>
            <p className="mt-1 text-sm text-zinc-400">★ 4.9 · 2,318 reviews</p>
          </div>
          <p className="font-display text-2xl font-bold">$189</p>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-zinc-400"><span>In stock</span><span className="font-mono text-emerald-400">42 units</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
            <motion.div initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ delay: 1.6, duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber" />
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }} className="absolute -left-10 top-24 flex items-center gap-2 rounded-xl border border-fg/10 bg-ink/80 px-3 py-2 text-xs shadow-xl backdrop-blur">
          <PackageCheck size={14} className="text-emerald-400" /> Order #8841 shipped
        </motion.div>
      </motion.div>
    </TiltCard>
  )
}
