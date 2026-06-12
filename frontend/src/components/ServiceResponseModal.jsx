import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'

export default function ServiceResponseModal({ response, onClose }) {
  useEffect(() => {
    if (!response) return undefined
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [response, onClose])

  return (
    <AnimatePresence>
      {response && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ opacity: 0, scale: .86, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 10 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="relative max-w-md overflow-hidden rounded-[2rem] bg-white p-8 text-center shadow-soft dark:bg-zinc-900">
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"><X size={18} /></button>
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={42} />
            </div>
            <p className="mb-2 text-sm font-black uppercase tracking-[.3em] text-amber">✨ Feature coming soon</p>
            <h2 className="text-2xl font-black text-navy dark:text-white">{response.serviceName} responded successfully.</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-slate-600 dark:text-slate-300">{response.message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
