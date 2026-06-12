import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '../components/AuthContext'

function AuthShell({ title, subtitle, children }) {
  return <section className="grid min-h-[calc(100vh-6rem)] overflow-hidden rounded-none bg-white dark:bg-zinc-950 lg:grid-cols-2"><div className="relative hidden lg:block"><img src="https://images.unsplash.com/photo-1527866512907-a35a62a0f6c5?auto=format&fit=crop&w=1400&q=80" alt="Cozy German cafe" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-navy/45" /><div className="absolute bottom-12 left-12 max-w-md text-white"><p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-bold backdrop-blur"><ShieldCheck size={18} /> Secure prototype auth</p><h2 className="text-5xl font-black">Your German ritual starts here.</h2></div></div><div className="grid place-items-center px-6 py-16"><div className="w-full max-w-md"><h1 className="text-4xl font-black text-navy dark:text-white">{title}</h1><p className="mt-3 font-serif text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>{children}</div></div></section>
}

function Field({ label, ...props }) { return <label className="block"><span className="mb-2 block text-sm font-black text-slate-600 dark:text-slate-200">{label}</span><input {...props} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/15 dark:border-white/10 dark:bg-white/5" /></label> }

export function Signup() {
  const auth = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  async function submit(e) { e.preventDefault(); setError('')
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    setLoading(true)
    try { await auth.signup({ name: form.name, email: form.email, password: form.password }); navigate('/dashboard') }
    catch (err) { setError(err.response?.data?.detail || Object.values(err.response?.data || {})?.flat?.()?.[0] || 'Sign up failed.') }
    finally { setLoading(false) }
  }
  return <AuthShell title="Create your account" subtitle="Start with a beautiful dashboard and a real JWT-backed auth flow."><form onSubmit={submit} className="mt-8 space-y-5"><Field label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><Field label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><Field label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><Field label="Confirm password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />{error && <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-full bg-navy px-6 py-4 font-black text-white shadow-soft transition hover:scale-[1.02] disabled:opacity-60">{loading ? 'Creating…' : 'Start learning'} <ArrowRight className="ml-2 inline" size={18} /></button><p className="text-center text-sm text-slate-500">Already have an account? <Link className="font-black text-navy dark:text-amber" to="/login">Sign in</Link></p></form></AuthShell>
}

export function Login() {
  const auth = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'demo@deutschmeister.dev', password: 'DemoPass123!' })
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  async function submit(e) { e.preventDefault(); setError(''); setLoading(true)
    try { await auth.login(form); navigate('/dashboard') }
    catch (err) { setError(err.response?.data?.detail || 'Invalid email or password.') }
    finally { setLoading(false) }
  }
  return <AuthShell title="Welcome back" subtitle="Use the seeded demo account or sign in with your own credentials."><form onSubmit={submit} className="mt-8 space-y-5"><Field label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><Field label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-slate-500"><input type="checkbox" defaultChecked /> Remember me</label><Link to="/signup" className="font-black text-navy dark:text-amber">Need an account?</Link></div>{error && <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-full bg-navy px-6 py-4 font-black text-white shadow-soft transition hover:scale-[1.02] disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'} <ArrowRight className="ml-2 inline" size={18} /></button></form></AuthShell>
}
