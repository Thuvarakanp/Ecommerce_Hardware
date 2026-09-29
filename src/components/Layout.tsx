import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar, { Logo } from './Navbar'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]"><Outlet /></main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-zinc-500 sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} IronForge. Bike and vehicle parts.</p>
        </div>
      </footer>
      <ScrollRestoration />
    </>
  )
}
