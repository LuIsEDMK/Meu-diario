import React from 'react'
import { FONT_PANEL_OPTIONS } from '../types'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function FontPanel({ value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {Object.entries(FONT_PANEL_OPTIONS).map(([key, opt]) => {
        const active = value === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: active ? 'var(--amber-dim)' : 'transparent',
              border: `1px solid ${active ? 'var(--amber-glow)' : 'var(--surface-border)'}`,
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            <span style={{ fontSize: 12, color: active ? 'var(--amber-soft)' : 'var(--text-secondary)' }}>
              {opt.label}
            </span>
            <span
              style={{
                fontFamily: opt.family,
                fontSize: 14,
                color: active ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
            >
              Aa
            </span>
          </button>
        )
      })}
    </div>
  )
}
