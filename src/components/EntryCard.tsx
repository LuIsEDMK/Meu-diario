import React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash2, Pencil, Cloud, Sun, CloudRain, Flame, Wind, Target, Moon, Leaf } from 'lucide-react'
import type { Entry, Mood } from '../types'
import { MOOD_META } from '../types'

const MOOD_ICONS: Record<Mood, React.ReactElement> = {
  calm: <Cloud size={12} />,
  happy: <Sun size={12} />,
  sad: <CloudRain size={12} />,
  angry: <Flame size={12} />,
  anxious: <Wind size={12} />,
  focused: <Target size={12} />,
  tired: <Moon size={12} />,
  grateful: <Leaf size={12} />,
}

interface Props {
  entry: Entry
  onView: (entry: Entry) => void
  onEdit: (entry: Entry) => void
  onDelete: (id: string) => void
}

export default function EntryCard({ entry, onView, onEdit, onDelete }: Props) {
  const date = new Date(entry.createdAt)
  const dateStr = format(date, "d 'de' MMM, yyyy", { locale: ptBR })
  const preview = entry.content.replace(/\n/g, ' ').slice(0, 100)

  return (
    <div
      className="entry-card"
      onClick={() => onView(entry)}
      style={{
        padding: '12px 14px',
        background: 'var(--surface-raised)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'var(--transition)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--amber-muted)'
        ;(e.currentTarget as HTMLDivElement).style.background = 'var(--surface-high)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--surface-border)'
        ;(e.currentTarget as HTMLDivElement).style.background = 'var(--surface-raised)'
        const actions = (e.currentTarget as HTMLDivElement).querySelector('.card-actions') as HTMLElement | null
        if (actions) actions.style.opacity = '0'
      }}
      onMouseOver={e => {
        const actions = (e.currentTarget as HTMLDivElement).querySelector('.card-actions') as HTMLElement | null
        if (actions) actions.style.opacity = '1'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 15, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.3 }}>
          {entry.title || 'Sem título'}
        </span>
        <div
          className="card-actions"
          style={{ display: 'flex', gap: 2, opacity: 0, transition: 'var(--transition)', flexShrink: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            title="Editar"
            onClick={() => onEdit(entry)}
            style={{ padding: '3px 5px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', transition: 'var(--transition)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber-soft)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Pencil size={13} />
          </button>
          <button
            title="Excluir"
            onClick={() => onDelete(entry.id)}
            style={{ padding: '3px 5px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', transition: 'var(--transition)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {preview || 'Nenhum conteúdo'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{dateStr}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {entry.mood && MOOD_ICONS[entry.mood] && (
            <span
              title={MOOD_META[entry.mood].label}
              style={{ color: 'var(--amber-muted)', display: 'flex' }}
            >
              {MOOD_ICONS[entry.mood]}
            </span>
          )}
          {entry.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: '1px 6px',
                background: 'var(--surface)',
                border: '1px solid var(--surface-border)',
                borderRadius: 20,
                color: 'var(--text-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
