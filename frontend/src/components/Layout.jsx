import { Moon, Sparkles, Sun } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mobileTabs, navItems } from '../lib/content'

export function Header({ dark, setDark }) {
  const navigate = useNavigate()
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-3">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/40 px-4 py-3 shadow-soft dark:border-white/10">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 font-black text-navy dark:text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-amber"><Sparkles size={20} /></span>
          <span>DeutschMeister</span>
        </button>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-200 md:flex">
          {navItems.map((item) => <NavLink key={item.to} className={({ isActive }) => isActive ? 'text-navy dark:text-amber' : 'hover:text-navy dark:hover:text-amber'} to={item.to}>{item.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="rounded-full border border-slate-200 p-3 text-navy dark:border-white/10 dark:text-amber">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => navigate('/signup')} className="hidden rounded-full bg-amber px-5 py-3 text-sm font-extrabold text-ink shadow-lg shadow-amber/20 transition hover:scale-105 sm:block">Get Started</button>
        </div>
      </div>
    </header>
  )
}

export function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-3xl border border-white/40 bg-white/90 p-2 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-ink/90 md:hidden">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon
        return <NavLink key={tab.to} to={tab.to} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-bold ${isActive ? 'bg-navy text-white dark:bg-amber dark:text-ink' : 'text-slate-500 dark:text-slate-300'}`}><Icon size={18} />{tab.label}</NavLink>
      })}
    </nav>
  )
}

export function PageShell({ children }) {
  return <main className="min-h-screen pb-28 pt-24 dark:bg-ink md:pb-10">{children}</main>
}

export function Reveal({ children, delay = 0 }) {
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .65, delay }}>{children}</motion.div>
}
