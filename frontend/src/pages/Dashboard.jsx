import { useState } from 'react'
import { Flame, Goal, LogOut, Play, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import ServiceResponseModal from '../components/ServiceResponseModal'
import { useAuth } from '../components/AuthContext'
import { Reveal } from '../components/Layout'
import { callService } from '../lib/api'
import { features } from '../lib/content'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [modal, setModal] = useState(null)
  async function trigger(feature) {
    const data = await callService(feature.service)
    setModal({ serviceName: feature.title, message: data.message })
  }
  return <div className="mx-auto max-w-7xl px-6 py-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-black uppercase tracking-[.3em] text-amber">Dashboard</p><h1 className="mt-3 text-4xl font-black text-navy dark:text-white md:text-6xl">Willkommen, {user?.name || 'Learner'}.</h1></div><button onClick={logout} className="rounded-full border border-slate-200 px-5 py-3 font-bold text-slate-600 dark:border-white/10 dark:text-slate-200"><LogOut className="mr-2 inline" size={18} />Log out</button></div>
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><Reveal><div className="relative overflow-hidden rounded-[2.5rem] bg-navy p-8 text-white shadow-soft"><img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=80" alt="German old town" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="relative"><p className="inline-flex rounded-full bg-white/15 px-4 py-2 font-bold backdrop-blur">Continue Learning</p><h2 className="mt-10 max-w-xl text-4xl font-black">B1: Ordering with confidence in a Berlin café</h2><button onClick={() => trigger(features[0])} className="mt-8 rounded-full bg-amber px-6 py-4 font-black text-ink"><Play className="mr-2 inline" size={18} />Resume lesson</button></div></div></Reveal><Reveal><div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"><Metric icon={Goal} label="Daily goal" value="72%" /><Metric icon={Flame} label="Streak" value="14 days" /><Metric icon={Trophy} label="Level" value="B1" /></div></Reveal></div>
    <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <motion.button whileHover={{ y: -8 }} key={feature.service} onClick={() => trigger(feature)} className="rounded-[2rem] border border-slate-200 bg-white p-7 text-left shadow-sm dark:border-white/10 dark:bg-zinc-900"><feature.icon className="text-amber" size={34} /><h3 className="mt-8 text-2xl font-black text-navy dark:text-white">{feature.title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p></motion.button>)}</section><ServiceResponseModal response={modal} onClose={() => setModal(null)} /></div>
}
function Metric({ icon: Icon, label, value }) { return <div className="rounded-[2rem] bg-white p-6 shadow-soft dark:bg-zinc-900"><Icon className="text-amber" /><p className="mt-5 text-sm font-black uppercase tracking-widest text-slate-400">{label}</p><p className="mt-2 text-3xl font-black text-navy dark:text-white">{value}</p></div> }
