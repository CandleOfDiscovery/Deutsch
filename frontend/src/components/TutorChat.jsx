import { useState } from 'react'
import { Bot, Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { callTutor } from '../lib/api'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const focuses = ['speaking confidence', 'grammar repair', 'travel German', 'exam prep', 'vocabulary building']

export default function TutorChat() {
  const [message, setMessage] = useState('Ich möchte im Café natürlicher bestellen. Kannst du mit mir üben?')
  const [level, setLevel] = useState('A2')
  const [focus, setFocus] = useState('speaking confidence')
  const [reply, setReply] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await callTutor({ message, level, focus })
      setReply(data)
    } catch (err) {
      setError(err.response?.data?.message || 'The AI tutor service could not be reached.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-zinc-900 md:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber text-ink"><Bot size={28} /></div>
        <div>
          <p className="font-black uppercase tracking-[.3em] text-amber">AI Tutor</p>
          <h2 className="mt-2 text-3xl font-black text-navy dark:text-white">Practice with DeutschMeister Tutor</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Ask for corrections, mini dialogues, CEFR-level explanations, or a quick German speaking drill.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-black text-slate-600 dark:text-slate-200">Level
            <select value={level} onChange={(event) => setLevel(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
              {levels.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm font-black text-slate-600 dark:text-slate-200">Focus
            <select value={focus} onChange={(event) => setFocus(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
              {focuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <label className="block text-sm font-black text-slate-600 dark:text-slate-200">Message
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="4" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 leading-7 outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/15 dark:border-white/10 dark:bg-white/5" />
        </label>
        {error && <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}
        <button disabled={loading} className="inline-flex w-fit items-center rounded-full bg-navy px-6 py-4 font-black text-white shadow-soft transition hover:scale-[1.02] disabled:opacity-60 dark:bg-amber dark:text-ink">
          {loading ? <Loader2 className="mr-2 animate-spin" size={18} /> : <Send className="mr-2" size={18} />}
          {loading ? 'Thinking…' : 'Ask the tutor'}
        </button>
      </form>

      {reply && (
        <div className="mt-8 rounded-[1.5rem] bg-parchment p-6 dark:bg-white/5">
          <p className="text-xs font-black uppercase tracking-[.25em] text-slate-400">{reply.source} · {reply.model} · {reply.level}</p>
          <p className="mt-4 whitespace-pre-wrap font-serif text-lg leading-9 text-slate-700 dark:text-slate-200">{reply.reply}</p>
        </div>
      )}
    </motion.section>
  )
}
