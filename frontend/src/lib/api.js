import axios from 'axios'

const env = import.meta.env
const urls = {
  auth: env.VITE_AUTH_API_URL || 'http://localhost:8001',
  lessons: env.VITE_LESSONS_API_URL || 'http://localhost:8002',
  vocabulary: env.VITE_VOCABULARY_API_URL || 'http://localhost:8003',
  grammar: env.VITE_GRAMMAR_API_URL || 'http://localhost:8004',
  exam: env.VITE_EXAM_API_URL || 'http://localhost:8005',
  speaking: env.VITE_SPEAKING_API_URL || 'http://localhost:8006',
  writing: env.VITE_WRITING_API_URL || 'http://localhost:8007',
  progress: env.VITE_PROGRESS_API_URL || 'http://localhost:8008',
  tutor: env.VITE_TUTOR_API_URL || 'http://localhost:8009',
}

export const tokenStore = {
  get: () => localStorage.getItem('dm_token'),
  set: (token) => localStorage.setItem('dm_token', token),
  clear: () => localStorage.removeItem('dm_token'),
}

export const authApi = axios.create({ baseURL: `${urls.auth}/api/auth` })
authApi.interceptors.request.use((config) => {
  const token = tokenStore.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const servicePaths = {
  lessons: '/api/lessons/',
  vocabulary: '/api/vocabulary/',
  grammar: '/api/grammar/',
  exam: '/api/exam/',
  speaking: '/api/speaking/',
  writing: '/api/writing/',
  progress: '/api/progress/',
  tutor: '/api/tutor/chat/',
}

export async function callService(service, payload = {}) {
  const client = axios.create({ baseURL: urls[service] })
  const { data } = await client.post(servicePaths[service] || '/', payload)
  return data
}

export async function callTutor({ message, level = 'A2', focus = 'speaking confidence' }) {
  const client = axios.create({ baseURL: urls.tutor })
  const { data } = await client.post('/api/tutor/chat/', { message, level, focus })
  return data
}
