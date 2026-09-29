import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { money, type Product } from '../lib/api'
import { useCart } from '../lib/cart'
import ProductImage from './ProductImage'

export function StockLabel({ stock }: { stock: number }) {
  if (stock === 0) return <span className="font-mono text-xs text-ember">Out of stock</span>
  if (stock < 15) return <span className="font-mono text-xs text-ember">Only {stock} left</span>
  return <span className="font-mono text-xs text-emerald-600">In stock</span>
}

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart()
  return (
    <div className="group flex flex-col rounded-2xl border border-line bg-panel p-3 transition-shadow hover:shadow-lg hover:shadow-shade">
      <Link to={`/product/${p.id}`} className="block">
        <ProductImage product={p} className="aspect-square rounded-xl" />
        <p className="mt-3 text-xs uppercase tracking-wider text-zinc-500">{p.brand}</p>
        <h3 className="mt-1 min-h-[2.75rem] font-display font-semibold leading-snug group-hover:text-amber-ink">{p.name}</h3>
      </Link>
      <div className="mt-auto flex items-end justify-between pt-3">
        <div>
          <p className="font-display text-xl font-bold">{money(p.price_cents)}</p>
          <StockLabel stock={p.stock} />
        </div>
        <button
          disabled={p.stock === 0}
          onClick={() => add(p)}
          aria-label={`Add ${p.name} to cart`}
          className="grid h-10 w-10 place-items-center rounded-xl bg-fg text-ink transition-colors hover:bg-amber hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}
