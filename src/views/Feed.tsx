import React, { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { useDiaryStore } from '../store/diary'
import EntryCard from '../components/EntryCard'

export default function Feed() {
  const { entries, loading, openEditor, openView, deleteEntry } = useDiaryStore()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return entries
    const q = query.toLowerCase()
    return entries.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.content.toLowerCase().includes(q) ||
      e.tags.some(t => t.includes(q))
    )
  }, [entries, query])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 14 }}>
          Suas páginas
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 12px',
            background: 'var(--surface-raised)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 16,
          }}
        >
          <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar páginas..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--text-primary)',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)', display: 'flex' }}>
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
        {loading ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>Carregando...</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
            {query ? 'Nenhum resultado encontrado.' : 'Nenhuma página ainda. Clique em "Nova página" para começar.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(entry => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onView={openView}
                onEdit={openEditor}
                onDelete={deleteEntry}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
