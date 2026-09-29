import { useState } from 'react'
import { iconFor } from '../lib/categories'
import type { Product } from '../lib/api'

/** Product photo from /images/products/<sku>.jpg, falling back to a category icon. */
export default function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false)
  const Icon = iconFor(product.category)
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 ${className}`}>
      {failed ? (
        <Icon size={64} strokeWidth={1.2} className="text-zinc-500" aria-hidden />
      ) : (
        <img
          src={`/images/products/${product.sku}.jpg`}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
