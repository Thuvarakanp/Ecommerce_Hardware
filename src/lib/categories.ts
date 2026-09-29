import { BatteryCharging, CircleDot, Disc3, HardHat, Lightbulb, Link2, Fuel, Wrench, type LucideIcon } from 'lucide-react'

export const categoryMeta: Record<string, { icon: LucideIcon; blurb: string }> = {
  'Brakes': { icon: Disc3, blurb: 'Pads, rotors, cables and fluid' },
  'Chains & Drivetrain': { icon: Link2, blurb: 'Chains, cassettes and lube' },
  'Tyres & Tubes': { icon: CircleDot, blurb: 'Tyres and inner tubes' },
  'Lighting': { icon: Lightbulb, blurb: 'Bike lights and vehicle bulbs' },
  'Engine & Oil': { icon: Fuel, blurb: 'Oil, filters and spark plugs' },
  'Batteries & Electrical': { icon: BatteryCharging, blurb: 'Batteries, chargers and fuses' },
  'Helmets & Safety': { icon: HardHat, blurb: 'Helmets and high-vis gear' },
  'Tools & Accessories': { icon: Wrench, blurb: 'Multi-tools and pumps' },
}
export const iconFor = (category: string) => categoryMeta[category]?.icon ?? Wrench
