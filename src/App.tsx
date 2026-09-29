import { motion, useScroll, useSpring } from 'motion/react'
import Navbar from './components/Navbar'
import Accounts from './sections/Accounts'
import Brands from './sections/Brands'
import Categories from './sections/Categories'
import { CTA, Footer } from './sections/CTA'
import Featured from './sections/Featured'
import Hero from './sections/Hero'
import Inventory from './sections/Inventory'
import Reviews from './sections/Reviews'
import Stats from './sections/Stats'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-amber to-ember" />
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Categories />
        <Featured />
        <Stats />
        <Inventory />
        <Accounts />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
