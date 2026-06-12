import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, ProtectedRoute } from './components/AuthContext'
import { Header, MobileNav, PageShell } from './components/Layout'
import Landing from './pages/Landing'
import { Login, Signup } from './pages/AuthPages'
import Dashboard from './pages/Dashboard'
import SectionPage from './pages/SectionPage'

export default function App() {
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  return <AuthProvider><Header dark={dark} setDark={setDark} /><PageShell><Routes><Route path="/" element={<Landing />} /><Route path="/signup" element={<Signup />} /><Route path="/login" element={<Login />} /><Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /><Route path="/learn" element={<SectionPage type="learn" />} /><Route path="/practice" element={<SectionPage type="practice" />} /><Route path="/speak" element={<SectionPage type="speak" />} /><Route path="/profile" element={<ProtectedRoute><SectionPage type="profile" /></ProtectedRoute>} /></Routes></PageShell><MobileNav /></AuthProvider>
}
