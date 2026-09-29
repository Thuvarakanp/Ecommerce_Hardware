import { Drill, Hammer, Wrench, Zap, Ruler, PaintBucket, HardHat, Cable, type LucideIcon } from 'lucide-react'

export type Product = { id: string; name: string; brand: string; price: number; was?: number; rating: number; stock: number; icon: LucideIcon; tag?: string }
export type Category = { name: string; count: number; icon: LucideIcon; blurb: string }

export const categories: Category[] = [
  { name: 'Power Tools', count: 482, icon: Drill, blurb: 'Drills, saws, grinders & sanders' },
  { name: 'Hand Tools', count: 1260, icon: Hammer, blurb: 'Hammers, pliers, chisels & more' },
  { name: 'Fasteners', count: 3400, icon: Wrench, blurb: 'Bolts, screws, anchors, nails' },
  { name: 'Electrical', count: 915, icon: Zap, blurb: 'Wiring, breakers, lighting' },
  { name: 'Measuring', count: 210, icon: Ruler, blurb: 'Lasers, levels, tapes' },
  { name: 'Paint & Finish', count: 640, icon: PaintBucket, blurb: 'Coatings, sealants, brushes' },
  { name: 'Safety Gear', count: 375, icon: HardHat, blurb: 'PPE for every job site' },
  { name: 'Cable & Fittings', count: 730, icon: Cable, blurb: 'Conduit, clamps, connectors' },
]

export const products: Product[] = [
  { id: 'p1', name: 'BrushlessPro 20V Hammer Drill', brand: 'Voltra', price: 189, was: 229, rating: 4.9, stock: 42, icon: Drill, tag: 'Best seller' },
  { id: 'p2', name: 'Forged Claw Hammer 16oz', brand: 'Anvil&Co', price: 34, rating: 4.8, stock: 118, icon: Hammer },
  { id: 'p3', name: 'Cross-Line Laser Level 50m', brand: 'Beamline', price: 129, was: 159, rating: 4.7, stock: 9, icon: Ruler, tag: 'Low stock' },
  { id: 'p4', name: 'Chrome-Vanadium Socket Set 142pc', brand: 'Torque', price: 96, rating: 4.9, stock: 67, icon: Wrench, tag: 'New' },
]
