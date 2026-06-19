import React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X, Pencil, Trash2, Cloud, Sun, CloudRain, Flame, Wind, Target, Moon, Leaf } from 'lucide-react'
import { useDiaryStore } from '../store/diary'
import type { Mood } from '../types'
import { MOOD_META, FONT_PANEL_OPTIONS } from '../types'

const MOOD_ICONS: Record<Mood, React.ReactElement> = {
  calm: <Cloud size={14} />,
  happy: <Sun size={14} />,
  sad: <CloudRain size={14} />,
  angry: <Flame size={14} />,
  anxious: <Wind size={14} />,
  focused: <Target size={14} />,
  tired: <Moon size={14} />,
  grateful: <Leaf size={14} />,
}

export default function EntryView() {
  const { viewEntry, closeView, openEditor, deleteEntry } = useDiaryStore()
  if (!viewEntry) return null

  const date = format(new Date(viewEntry.createdAt), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const fontFamily = FONT_PANEL_OPTIONS[viewEntry.fontStyle]?.family ?? 'var(--font-body)'

  function handleDelete() {
    if (confirm('Excluir esta página?')) {
      deleteEntry(viewEntry!.id)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 8, 6, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 24,
      }}
      onClick={e => { if (e.target === e.currentTarget) closeView() }}
    >
      <div
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: 640,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 4 }}>
              {viewEntry.title || 'Sem título'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{date}</span>
              {viewEntry.mood && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--amber-muted)' }}>
                  {MOOD_ICONS[viewEntry.mood]}
                  {MOOD_META[viewEntry.mood].label}
                </span>
              )}
              {viewEntry.tags.map(tag => (
                <span
                  key={tag}
                  style={{ fontSize: 11, padding: '1px 7px', background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: 20, color: 'var(--text-muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <button
              title="Editar"
              onClick={() => { closeView(); openEditor(viewEntry) }}
              style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', border: '1px solid var(--surface-border)', transition: 'var(--transition)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber-soft)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Pencil size={14} />
            </button>
            <button
              title="Excluir"
              onClick={handleDelete}
              style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', border: '1px solid var(--surface-border)', transition: 'var(--transition)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Trash2 size={14} />
            </button>
            <button
              title="Fechar"
              onClick={closeView}
              style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', border: '1px solid var(--surface-border)', transition: 'var(--transition)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <p
            style={{
              fontFamily,
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              userSelect: 'text',
            }}
          >
            {viewEntry.content}
          </p>
        </div>
      </div>
    </div>
  )
}
