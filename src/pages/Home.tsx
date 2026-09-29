import Categories from '../sections/Categories'
import { CTA } from '../sections/CTA'
import Featured from '../sections/Featured'
import Hero from '../sections/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <CTA />
    </>
  )
}
