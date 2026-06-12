import { BookOpen, Brain, GraduationCap, MessageCircle, Mic, PenLine, Sparkles, Trophy, UserRound, Volume2 } from 'lucide-react'

export const navItems = [
  { label: 'Learn', to: '/learn' },
  { label: 'Practice', to: '/practice' },
  { label: 'Speak', to: '/speak' },
  { label: 'Profile', to: '/profile' },
]

export const features = [
  { service: 'lessons', title: 'Lessons', icon: BookOpen, description: 'Editorial lessons with culture notes, audio, and bite-sized practice.' },
  { service: 'vocabulary', title: 'Vocabulary', icon: Sparkles, description: 'Spaced repetition word decks tuned to your level and interests.' },
  { service: 'grammar', title: 'Grammar', icon: Brain, description: 'Clear grammar explainers with gentle, contextual drills.' },
  { service: 'exam', title: 'Exams', icon: GraduationCap, description: 'Goethe and telc-style prep flows for every CEFR milestone.' },
  { service: 'speaking', title: 'Speaking', icon: Mic, description: 'Conversational prompts and pronunciation coaching.' },
  { service: 'writing', title: 'Writing', icon: PenLine, description: 'Guided letters, emails, and essays with rubric feedback.' },
]

export const mobileTabs = [
  { label: 'Dashboard', to: '/dashboard', icon: Trophy },
  { label: 'Learn', to: '/learn', icon: BookOpen },
  { label: 'Practice', to: '/practice', icon: Volume2 },
  { label: 'Speak', to: '/speak', icon: MessageCircle },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

export const levelCards = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
