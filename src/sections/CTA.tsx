import { ArrowRight } from 'lucide-react'
import Aurora from '../components/fx/Aurora'
import Magnetic from '../components/fx/Magnetic'
import Reveal from '../components/fx/Reveal'
import SplitText from '../components/fx/SplitText'
import { Logo } from '../components/Navbar'

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28">
      <div className="noise relative isolate overflow-hidden rounded-[2rem] border border-line bg-panel px-6 py-20 text-center">
        <Aurora className="absolute inset-0 -z-10 opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-transparent to-ink/60" />
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl"><SplitText text="Ready to gear up?" /></h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-lg text-lg text-zinc-300">Open a free trade account and get 10% off your first order.</p>
          <div className="mt-9"><Magnetic><a href="#accounts" className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-black">Create free account <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></a></Magnetic></div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-zinc-500 sm:flex-row">
        <Logo />
        <p>© {new Date().getFullYear()} IronForge Hardware. All rights reserved.</p>
      </div>
    </footer>
  )
}
