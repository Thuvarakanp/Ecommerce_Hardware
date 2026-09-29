import { motion } from 'motion/react'
import { Building2, ClipboardList, KeyRound, Users } from 'lucide-react'
import Reveal from '../components/fx/Reveal'
import SpotlightCard from '../components/fx/SpotlightCard'
import SplitText from '../components/fx/SplitText'

const roles = [
  { role: 'Owner', name: 'Dana Whitfield', perm: 'Full access · billing', color: 'bg-amber' },
  { role: 'Manager', name: 'Marcus Lee', perm: 'Approve orders · $5k limit', color: 'bg-emerald-400' },
  { role: 'Buyer', name: 'Priya Nair', perm: 'Place orders · trade pricing', color: 'bg-sky-400' },
  { role: 'Viewer', name: 'Tom Ruiz', perm: 'Read-only', color: 'bg-zinc-400' },
]
const perks = [
  { icon: Users, t: 'Team accounts', d: 'Invite your crew with role-based permissions.' },
  { icon: KeyRound, t: 'Spending limits', d: 'Per-user caps and approval workflows.' },
  { icon: Building2, t: 'Trade pricing', d: 'Volume tiers applied automatically at checkout.' },
  { icon: ClipboardList, t: 'Order history', d: 'Reorder past jobs in a single tap.' },
]

export default function Accounts() {
  return (
    <section id="accounts" className="relative bg-panel/30 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <SpotlightCard className="order-2 p-6 lg:order-1">
          <p className="mb-5 flex items-center justify-between font-display font-semibold">Team · Northgate Builders <span className="rounded-full bg-fg/10 px-2.5 py-1 text-xs font-normal text-zinc-400">4 members</span></p>
          <ul className="space-y-3">
            {roles.map((r, i) => (
              <motion.li key={r.name} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 rounded-xl border border-line bg-ink/60 p-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 font-display font-bold">{r.name.split(' ').map((n) => n[0]).join('')}</span>
                <div className="min-w-0 flex-1"><p className="truncate font-medium">{r.name}</p><p className="truncate text-xs text-zinc-500">{r.perm}</p></div>
                <span className="flex items-center gap-1.5 rounded-full bg-fg/5 px-3 py-1 text-xs"><i className={`h-1.5 w-1.5 rounded-full ${r.color}`} />{r.role}</span>
              </motion.li>
            ))}
          </ul>
        </SpotlightCard>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="mb-3 font-mono text-sm text-amber-ink">/ 04 — ACCOUNTS</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl"><SplitText text="One account. The whole crew." /></h2>
            <p className="mt-5 text-lg text-zinc-400">Give every person the right access — from site foremen to the accounts team — without sharing a single password.</p>
          </Reveal>
          <ul className="mt-9 grid gap-6 sm:grid-cols-2">
            {perks.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}><li className="list-none"><p.icon size={20} className="mb-2 text-amber-ink" /><p className="font-display font-semibold">{p.t}</p><p className="mt-1 text-sm text-zinc-400">{p.d}</p></li></Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
