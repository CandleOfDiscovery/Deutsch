import { useState } from 'react'
import { motion } from 'framer-motion'
import ServiceResponseModal from '../components/ServiceResponseModal'
import TutorChat from '../components/TutorChat'
import { callService } from '../lib/api'
import { levelCards } from '../lib/content'

const copy = {
  learn: { service: 'lessons', title: 'Learn with cinematic lessons', text: 'Follow carefully sequenced units full of real-world German, editorial reading, and culture.', image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1800&q=80' },
  practice: { service: 'vocabulary', title: 'Practice until it feels natural', text: 'Build vocabulary, grammar reflexes, and listening confidence with soft daily drills.', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1800&q=80' },
  speak: { service: 'speaking', title: 'Speak with more courage', text: 'Prepare for everyday conversations with guided prompts and pronunciation rituals.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80' },
  profile: { service: 'progress', title: 'Your language profile', text: 'Review goals, streaks, levels, and the next elegant step in your German journey.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80' },
}

export default function SectionPage({ type }) {
  const data = copy[type]
  const [modal, setModal] = useState(null)
  async function act() { const res = await callService(data.service); setModal({ serviceName: data.title, message: res.message }) }
  return <div className="mx-auto max-w-7xl px-6 py-8"><section className="relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-soft md:p-14"><img src={data.image} alt="German learning section" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-navy/50 to-transparent" /><div className="relative max-w-2xl py-16"><p className="font-black uppercase tracking-[.35em] text-amber">{type}</p><h1 className="mt-5 text-5xl font-black md:text-7xl">{data.title}</h1><p className="mt-6 font-serif text-xl leading-9 text-white/85">{data.text}</p><button onClick={act} className="mt-9 rounded-full bg-amber px-8 py-4 font-black text-ink shadow-lg shadow-amber/20">Try this studio</button></div></section><section className="mt-12"><h2 className="text-3xl font-black text-navy dark:text-white">Choose your level</h2><div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-6">{levelCards.map((level) => <motion.button whileHover={{ y: -8 }} onClick={act} key={level} className="rounded-3xl bg-white p-7 shadow-soft dark:bg-zinc-900"><span className="text-4xl font-black text-navy dark:text-amber">{level}</span><p className="mt-2 font-bold text-slate-500">Start pathway</p></motion.button>)}</div></section>{type === 'speak' && <TutorChat />}<ServiceResponseModal response={modal} onClose={() => setModal(null)} /></div>
}
