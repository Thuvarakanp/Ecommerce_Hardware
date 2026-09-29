import { useRef, type ReactNode, type MouseEvent } from 'react'

/** Card with a cursor-following radial spotlight + glowing border. */
export default function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-panel ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--x) var(--y), rgb(255 176 32 / .16), transparent 60%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background: 'radial-gradient(240px circle at var(--x) var(--y), rgb(255 176 32 / .7), transparent 60%)',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
