import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Compass, GraduationCap, Languages, PlayCircle, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceResponseModal from '../components/ServiceResponseModal'
import { Reveal } from '../components/Layout'
import { features, levelCards } from '../lib/content'

const heroImage = 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=2200&q=80'

export default function Landing() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const steps = [
    { icon: Compass, title: 'Determine your needs', text: 'Choose travel, work, exam, or culture goals so lessons feel instantly relevant.' },
    { icon: BarChart3, title: 'Evaluate your level', text: 'A graceful placement flow maps you from A1 to C2 without pressure.' },
    { icon: Languages, title: 'Follow your path', text: 'Daily lessons, speaking prompts, and reviews adapt to your rhythm.' },
  ]
  return (
    <>
      <section className="relative -mt-24 grid min-h-[92vh] place-items-center overflow-hidden">
        <img src={heroImage} alt="Berlin architecture at sunset" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="relative mx-auto max-w-7xl px-6 pt-28 text-white">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur"><Sparkles size={16} /> Immersive German from A1 to C2</p>
          <h1 className="max-w-4xl text-balance text-6xl font-black tracking-tight md:text-8xl">Master German. Your Way.</h1>
          <p className="mt-7 max-w-2xl font-serif text-xl leading-9 text-white/88 md:text-2xl">A polished prototype for elegant lessons, confident speaking, exam readiness, and vocabulary that finally sticks.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button onClick={() => navigate('/signup')} className="rounded-full bg-amber px-8 py-4 font-black text-ink shadow-2xl shadow-amber/25 transition hover:scale-105">Start Learning <ArrowRight className="ml-2 inline" size={18} /></button>
            <button onClick={() => setModal({ serviceName: 'Level Test', message: 'Your adaptive CEFR placement experience is coming soon!' })} className="rounded-full border border-white/40 bg-white/10 px-8 py-4 font-black backdrop-blur transition hover:bg-white/20"><PlayCircle className="mr-2 inline" size={18} /> Test Your Level</button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal><p className="font-black uppercase tracking-[.35em] text-amber">How it works</p><h2 className="mt-4 max-w-3xl text-4xl font-black text-navy dark:text-white md:text-6xl">A calm route into a complex language.</h2></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => <Reveal key={step.title} delay={i * .08}><div className="card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900"><step.icon className="mb-8 text-amber" size={36} /><span className="text-sm font-black text-slate-400">0{i + 1}</span><h3 className="mt-3 text-2xl font-black text-navy dark:text-white">{step.title}</h3><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{step.text}</p></div></Reveal>)}
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><h2 className="text-4xl font-black text-navy dark:text-white md:text-5xl">Everything you need to feel fluent.</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.slice(0, 4).map((feature) => <Reveal key={feature.title}><div className="card-lift rounded-[2rem] bg-parchment p-7 dark:bg-white/5"><feature.icon className="text-amber" size={34} /><h3 className="mt-8 text-xl font-black text-navy dark:text-white">{feature.title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <Reveal><div><p className="font-black uppercase tracking-[.35em] text-amber">CEFR pathway</p><h2 className="mt-4 text-4xl font-black text-navy dark:text-white md:text-5xl">From first sentence to nuanced debate.</h2></div></Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">{levelCards.map((level) => <motion.div whileHover={{ y: -8, rotate: -1 }} key={level} className="rounded-3xl bg-white p-6 text-center shadow-soft dark:bg-zinc-900"><span className="text-3xl font-black text-navy dark:text-amber">{level}</span><p className="mt-2 text-xs font-bold text-slate-500">Level</p></motion.div>)}</div>
        </div>
      </section>

      <section className="mx-6 mb-12 rounded-[2.5rem] bg-navy px-6 py-16 text-white shadow-soft md:mx-auto md:max-w-7xl">
        <div className="grid gap-8 text-center md:grid-cols-3"><div><p className="text-5xl font-black text-amber">50k+</p><p className="mt-2 font-bold">learners</p></div><div><p className="text-5xl font-black text-amber">98</p><p className="mt-2 font-bold">prototype lessons</p></div><div><p className="text-5xl font-black text-amber">7</p><p className="mt-2 font-bold">skill studios</p></div></div>
      </section>
      <Footer />
      <ServiceResponseModal response={modal} onClose={() => setModal(null)} />
    </>
  )
}

function Footer() {
  return <footer className="border-t border-slate-200 px-6 py-12 dark:border-white/10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-slate-500 md:flex-row"><p className="font-black text-navy dark:text-white">DeutschMeister</p><p>Language: Deutsch / English · Instagram · X · LinkedIn</p></div></footer>
}
