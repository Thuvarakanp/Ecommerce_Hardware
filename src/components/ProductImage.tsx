import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

type Props = { src: string; alt: string; Icon: LucideIcon }

/** Shows the product photo; if the file is missing, shows the icon illustration. */
export default function ProductImage({ src, alt, Icon }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed)
    return <Icon size={72} strokeWidth={1.2} className="relative text-zinc-300 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-amber-ink" />
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  )
}
