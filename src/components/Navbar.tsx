import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { useState } from 'react'
import Magnetic from './fx/Magnetic'

const links = ['Shop', 'Inventory', 'Accounts', 'Reviews']

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber text-black">
        <svg viewBox="0 0 32 32" className="h-5 w-5"><path d="M8 9h16v4H13v3h9v4h-9v3H8z" fill="currentColor" /></svg>
      </span>
      IRONFORGE
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 ${
          scrolled ? 'border-line bg-ink/70 backdrop-blur-xl shadow-2xl shadow-black/40' : 'border-transparent'
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button aria-label="Search" className="hidden rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white sm:block"><Search size={18} /></button>
          <button aria-label="Cart" className="relative rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white">
            <ShoppingCart size={18} />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-amber text-[10px] font-bold text-black">3</span>
          </button>
          <div className="hidden sm:block">
            <Magnetic strength={0.2}>
              <a href="#accounts" className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105">
                <User size={16} /> Sign in
              </a>
            </Magnetic>
          </div>
          <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 text-zinc-300 md:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute inset-x-4 top-20 rounded-2xl border border-line bg-panel/95 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <li key={l}><a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="block rounded-lg px-3 py-3 text-zinc-300 hover:bg-white/5">{l}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
