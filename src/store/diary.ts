import { create } from 'zustand'
import type { Entry, Settings, Stats } from '../types'

interface DiaryStore {
  entries: Entry[]
  settings: Settings
  stats: Stats | null
  loading: boolean
  saving: boolean

  sidebarCollapsed: boolean
  editorOpen: boolean
  editorEntry: Partial<Entry> | null
  viewEntry: Entry | null

  loadEntries: () => Promise<void>
  loadStats: () => Promise<void>
  loadSettings: () => Promise<void>

  openEditor: (entry?: Partial<Entry>) => void
  closeEditor: () => void

  openView: (entry: Entry) => void
  closeView: () => void

  saveEntry: (entry: Partial<Entry>) => Promise<void>
  deleteEntry: (id: string) => Promise<void>

  updateSettings: (s: Partial<Settings>) => Promise<void>

  toggleSidebar: () => void
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  fontPanel: 'minimalista',
  openEntryIn: 'view',
}

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  entries: [],
  settings: DEFAULT_SETTINGS,
  stats: null,
  loading: false,
  saving: false,

  sidebarCollapsed: false,
  editorOpen: false,
  editorEntry: null,
  viewEntry: null,

  loadEntries: async () => {
    set({ loading: true })
    try {
      const entries = await window.diary.getEntries()
      set({ entries, loading: false })
    } catch {
      set({ loading: false })
    }
  },

  loadStats: async () => {
    const stats = await window.diary.getStats()
    set({ stats })
  },

  loadSettings: async () => {
    const settings = await window.diary.getSettings() as Settings
    set({ settings })
  },

  openEditor: (entry) => {
    set({ editorOpen: true, editorEntry: entry ?? {} })
  },

  closeEditor: () => {
    set({ editorOpen: false, editorEntry: null })
  },

  openView: (entry) => {
    set({ viewEntry: entry })
  },

  closeView: () => {
    set({ viewEntry: null })
  },

  saveEntry: async (entry) => {
    set({ saving: true })
    try {
      await window.diary.saveEntry(entry)
      const entries = await window.diary.getEntries()
      set({ entries, saving: false, editorOpen: false, editorEntry: null })
    } catch {
      set({ saving: false })
    }
  },

  deleteEntry: async (id) => {
    await window.diary.deleteEntry(id)
    const entries = await window.diary.getEntries()
    const { viewEntry } = get()
    set({
      entries,
      viewEntry: viewEntry?.id === id ? null : viewEntry,
    })
  },

  updateSettings: async (s) => {
    const settings = await window.diary.saveSettings(s) as Settings
    set({ settings })
  },

  toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))
