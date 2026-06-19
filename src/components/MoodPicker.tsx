import React from 'react'
import { Cloud, Sun, CloudRain, Flame, Wind, Target, Moon, Leaf } from 'lucide-react'
import type { Mood } from '../types'
import { MOOD_META } from '../types'

const MOOD_ICONS: Record<Mood, React.ReactElement> = {
  calm: <Cloud />,
  happy: <Sun />,
  sad: <CloudRain />,
  angry: <Flame />,
  anxious: <Wind />,
  focused: <Target />,
  tired: <Moon />,
  grateful: <Leaf />,
}

const MOODS: Mood[] = ['calm', 'happy', 'sad', 'angry', 'anxious', 'focused', 'tired', 'grateful']

interface Props {
  value?: Mood | null
  onChange: (mood: Mood | null) => void
  size?: 'sm' | 'md'
}

export default function MoodPicker({ value, onChange, size = 'md' }: Props) {
  const btnSize = size === 'sm' ? 30 : 36
  const iconSize = size === 'sm' ? 14 : 16

  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {MOODS.map(mood => {
        const active = value === mood
        return (
          <button
            key={mood}
            title={MOOD_META[mood].label}
            onClick={() => onChange(active ? null : mood)}
            style={{
              width: btnSize,
              height: btnSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              border: `1.5px solid ${active ? 'var(--amber-glow)' : 'var(--surface-border)'}`,
              background: active ? 'var(--amber-dim)' : 'transparent',
              color: active ? 'var(--amber-soft)' : 'var(--text-muted)',
              transition: 'var(--transition)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {React.cloneElement(MOOD_ICONS[mood], { size: iconSize })}
          </button>
        )
      })}
    </div>
  )
}
