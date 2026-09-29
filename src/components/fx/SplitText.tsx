import { motion, type Variants } from 'motion/react'

type Props = { text: string; className?: string; charClassName?: string; delay?: number; stagger?: number }

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
})
const char: Variants = {
  hidden: { y: '110%', rotate: 8, opacity: 0 },
  show: { y: 0, rotate: 0, opacity: 1, transition: { type: 'spring', damping: 22, stiffness: 180 } },
}

/** Per-character masked reveal, split by word so lines wrap naturally. */
export default function SplitText({ text, className, charClassName = '', delay = 0, stagger = 0.03 }: Props) {
  return (
    <motion.span
      className={`block ${className ?? ''}`}
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top" aria-hidden>
          {word.split('').map((c, j) => (
            <motion.span key={j} variants={char} className={`inline-block will-change-transform ${charClassName}`}>
              {c}
            </motion.span>
          ))}
          {' '}
        </span>
      ))}
    </motion.span>
  )
}
