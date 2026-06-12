import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authApi, tokenStore } from '../lib/api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(tokenStore.get()))

  async function refreshUser() {
    const { data } = await authApi.get('/me/')
    setUser(data)
    return data
  }

  useEffect(() => {
    if (!tokenStore.get()) return
    refreshUser().catch(() => tokenStore.clear()).finally(() => setLoading(false))
  }, [])

  async function signup(payload) {
    const { data } = await authApi.post('/signup/', payload)
    tokenStore.set(data.access)
    setUser(data.user)
    return data
  }

  async function login(payload) {
    const { data } = await authApi.post('/login/', payload)
    tokenStore.set(data.access)
    setUser(data.user)
    return data
  }

  function logout() {
    tokenStore.clear()
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, signup, login, logout, refreshUser, isAuthed: Boolean(tokenStore.get()) }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  if (auth.loading) return <div className="grid min-h-screen place-items-center bg-parchment font-black text-navy dark:bg-ink dark:text-white">Loading your path…</div>
  if (!auth.isAuthed) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}
