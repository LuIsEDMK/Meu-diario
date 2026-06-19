export type Mood = 'calm' | 'happy' | 'sad' | 'angry' | 'anxious' | 'focused' | 'tired' | 'grateful'

export interface Entry {
  id: string
  title: string
  content: string
  mood?: Mood | null
  tags: string[]
  fontStyle: string
  createdAt: string
  updatedAt: string
}

export interface Settings {
  theme: 'dark'
  fontPanel: 'caligrafia' | 'maquina' | 'minimalista' | 'serifada'
  openEntryIn: 'view' | 'editor'
}

export interface Stats {
  totalEntries: number
  totalWords: number
  longestStreak: number
  currentStreak: number
  moodDistribution: Partial<Record<Mood, number>>
  activityHeatmap: Record<string, number>
}

export const MOOD_META: Record<Mood, { label: string; icon: string }> = {
  calm: { label: 'Calmo', icon: 'Cloud' },
  happy: { label: 'Feliz', icon: 'Sun' },
  sad: { label: 'Triste', icon: 'CloudRain' },
  angry: { label: 'Irritado', icon: 'Flame' },
  anxious: { label: 'Ansioso', icon: 'Wind' },
  focused: { label: 'Focado', icon: 'Target' },
  tired: { label: 'Cansado', icon: 'Moon' },
  grateful: { label: 'Grato', icon: 'Leaf' },
}

export const FONT_PANEL_OPTIONS: Record<string, { label: string; family: string }> = {
  caligrafia: { label: 'Caligrafia', family: "'Playfair Display', Georgia, serif" },
  maquina: { label: 'Máquina de escrever', family: "'Courier New', monospace" },
  minimalista: { label: 'Minimalista', family: "'Inter', system-ui, sans-serif" },
  serifada: { label: 'Serifada clássica', family: "'Playfair Display', Georgia, serif" },
}
