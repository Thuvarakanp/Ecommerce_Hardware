import { animate, useInView, useMotionValue, useTransform, motion } from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = { to: number; suffix?: string; prefix?: string; decimals?: number; duration?: number }

export default function CountUp({ to, suffix = '', prefix = '', decimals = 0, duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => prefix + v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix)

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, to, duration, value])

  return <motion.span ref={ref}>{text}</motion.span>
}
