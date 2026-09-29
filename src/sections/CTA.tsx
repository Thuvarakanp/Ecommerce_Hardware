import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Magnetic from '../components/fx/Magnetic'
import Reveal from '../components/fx/Reveal'

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="rounded-[2rem] border border-line bg-panel px-6 py-16 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Find the part you need</h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">Search by name, brand or SKU. Stock counts are live, so what you see is what we have.</p>
        <div className="mt-8">
          <Magnetic>
            <Link to="/shop" className="group inline-flex items-center gap-2 rounded-xl bg-fg px-7 py-4 font-semibold text-ink">
              Browse all parts <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
