import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, BarChart3, Boxes, Check, ScanBarcode } from 'lucide-react'
import { useEffect, useState } from 'react'
import Reveal from '../components/fx/Reveal'
import SplitText from '../components/fx/SplitText'

type Row = { sku: string; name: string; qty: number; max: number }
const initial: Row[] = [
  { sku: 'VLT-2041', name: 'BrushlessPro 20V Drill', qty: 42, max: 60 },
  { sku: 'BLN-0917', name: 'Cross-Line Laser Level', qty: 9, max: 50 },
  { sku: 'TRQ-1142', name: 'Socket Set 142pc', qty: 67, max: 80 },
  { sku: 'ANV-0316', name: 'Forged Claw Hammer', qty: 118, max: 150 },
  { sku: 'STL-5520', name: 'M8 Hex Bolts (500)', qty: 23, max: 200 },
]
const bars = [38, 52, 44, 68, 59, 81, 74, 92, 66, 88, 97, 84]

const features = [
  { icon: ScanBarcode, t: 'Barcode receiving', d: 'Scan-in deliveries and auto-update counts.' },
  { icon: AlertTriangle, t: 'Low-stock alerts', d: 'Reorder points that notify before you run out.' },
  { icon: Boxes, t: 'Multi-warehouse', d: 'One view across every branch and van.' },
  { icon: BarChart3, t: 'Demand insights', d: 'See what moves, what sits, what to buy.' },
]

export default function Inventory() {
  const [rows, setRows] = useState(initial)
  // Simulated live sales so the dashboard feels alive.
  useEffect(() => {
    const id = setInterval(() => {
      setRows((r) => r.map((x, i) => (Math.random() < 0.35 && x.qty > 1 ? { ...x, qty: x.qty - (i === 4 ? 2 : 1) } : x)))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inventory" className="mx-auto max-w-6xl px-5 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <p className="mb-3 font-mono text-sm text-amber-ink">/ 03 — INVENTORY</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl"><SplitText text="Know your stock. Down to the bolt." /></h2>
            <p className="mt-5 text-lg text-zinc-400">The same system that powers the storefront runs your warehouse — so what customers see is always what's on the shelf.</p>
          </Reveal>
          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <li className="list-none">
                  <f.icon size={20} className="mb-2 text-amber-ink" />
                  <p className="font-display font-semibold">{f.t}</p>
                  <p className="mt-1 text-sm text-zinc-400">{f.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-line bg-panel p-5 shadow-2xl shadow-shade">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-red-500/70" /><i className="h-3 w-3 rounded-full bg-amber/70" /><i className="h-3 w-3 rounded-full bg-emerald-500/70" /></div>
              <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />LIVE</span>
            </div>
            <p className="text-xs text-zinc-500">Weekly sales</p>
            <div className="mt-3 flex h-28 items-end gap-2">
              {bars.map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-amber/20 to-amber" />
              ))}
            </div>
            <div className="mt-6 divide-y divide-line rounded-xl border border-line text-sm">
              {rows.map((r) => {
                const pct = (r.qty / r.max) * 100
                const low = pct < 25
                return (
                  <div key={r.sku} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[6.5rem_1fr_9rem_3.5rem]">
                    <span className="hidden font-mono text-xs text-zinc-500 sm:block">{r.sku}</span>
                    <span className="truncate">{r.name}</span>
                    <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-fg/10 sm:col-span-1">
                      <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className={`h-full rounded-full ${low ? 'bg-ember' : 'bg-emerald-400'}`} />
                    </div>
                    <AnimatePresence mode="popLayout">
                      <motion.span key={r.qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} className={`text-right font-mono ${low ? 'text-ember' : ''}`}>{r.qty}</motion.span>
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
            <button onClick={() => setRows(initial)} className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-fg"><Check size={14} /> Reset demo data</button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
