import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'

export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(sy, [0, 1], [8, -8])
  const rotateY = useTransform(sx, [0, 1], [-8, 8])
  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width)
        y.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => { x.set(0.5); y.set(0.5) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
