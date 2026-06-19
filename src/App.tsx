import React, { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useDiaryStore } from './store/diary'
import Sidebar from './components/Sidebar'
import Feed from './views/Feed'
import Stats from './views/Stats'
import Settings from './views/Settings'
import Editor from './views/Editor'
import EntryView from './views/EntryView'

function AppShell() {
  const { loadEntries, loadSettings, viewEntry, editorOpen } = useDiaryStore()

  useEffect(() => {
    loadEntries()
    loadSettings()
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--surface)' }}>
      {!editorOpen && <Sidebar />}

      <main style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {editorOpen ? (
          <Editor />
        ) : (
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        )}
      </main>

      {viewEntry && <EntryView />}
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
