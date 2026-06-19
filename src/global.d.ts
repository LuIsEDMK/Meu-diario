import type { Entry, Settings, Stats } from './types'

interface DiaryAPI {
  getEntries: () => Promise<Entry[]>
  getEntry: (id: string) => Promise<Entry | null>
  saveEntry: (entry: Partial<Entry>) => Promise<Entry>
  deleteEntry: (id: string) => Promise<boolean>
  getStats: () => Promise<Stats>
  getSettings: () => Promise<Settings>
  saveSettings: (settings: Partial<Settings>) => Promise<Settings>
  exportEntries: () => Promise<{ canceled: boolean; count?: number; error?: string }>
  importEntries: () => Promise<{ canceled: boolean; entries?: Entry[]; error?: string }>
}

declare global {
  interface Window {
    diary: DiaryAPI
  }
}

export {}
