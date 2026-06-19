import React, { useEffect } from 'react'
import { BookOpen, Type, Flame, TrendingUp, Cloud, Sun, CloudRain, Wind, Target, Moon, Leaf } from 'lucide-react'
import { useDiaryStore } from '../store/diary'
import type { Mood } from '../types'
import { MOOD_META } from '../types'

const MOOD_ICONS: Record<Mood, React.ReactElement> = {
  calm: <Cloud size={13} />,
  happy: <Sun size={13} />,
  sad: <CloudRain size={13} />,
  angry: <Flame size={13} />,
  anxious: <Wind size={13} />,
  focused: <Target size={13} />,
  tired: <Moon size={13} />,
  grateful: <Leaf size={13} />,
}

function heatmapColor(count: number): string {
  if (!count) return 'var(--surface-border)'
  if (count === 1) return 'rgba(201,124,42,0.3)'
  if (count === 2) return 'rgba(201,124,42,0.6)'
  return 'var(--amber-glow)'
}

function getLast12Months(): string[] {
  const result: string[] = []
  const now = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() - (364 - i))
    result.push(d.toISOString().split('T')[0])
  }
  return result
}

export default function Stats() {
  const { stats, loadStats } = useDiaryStore()

  useEffect(() => { loadStats() }, [])

  if (!stats) {
    return <div style={{ padding: 40, color: 'var(--text-muted)', textAlign: 'center' }}>Carregando...</div>
  }

  const cards = [
    { icon: <BookOpen size={18} />, value: stats.totalEntries, label: 'Páginas' },
    { icon: <Type size={18} />, value: stats.totalWords, label: 'Palavras' },
    { icon: <TrendingUp size={18} />, value: stats.currentStreak, label: 'Sequência atual' },
    { icon: <Flame size={18} />, value: stats.longestStreak, label: 'Maior sequência' },
  ]

  const days = getLast12Months()
  const totalMoods = Object.values(stats.moodDistribution).reduce((a, b) => a + (b ?? 0), 0)
  const moods: Mood[] = ['happy', 'calm', 'focused', 'grateful', 'tired', 'anxious', 'sad', 'angry']

  return (
    <div style={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 20 }}>
        Estatísticas
      </h2>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginBottom: 28 }}>
        {cards.map(card => (
          <div
            key={card.label}
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
            }}
          >
            <div style={{ color: 'var(--amber-muted)', marginBottom: 8 }}>{card.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Atividade (últimos 12 meses)
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {days.map(day => (
            <div
              key={day}
              title={`${day}: ${stats.activityHeatmap[day] ?? 0} página(s)`}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: heatmapColor(stats.activityHeatmap[day] ?? 0),
                transition: 'var(--transition)',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Menos</span>
          {[0, 1, 2, 3].map(n => (
            <div key={n} style={{ width: 10, height: 10, borderRadius: 2, background: heatmapColor(n) }} />
          ))}
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Mais</span>
        </div>
      </div>

      {/* Mood distribution */}
      {totalMoods > 0 && (
        <div>
          <h3 style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Distribuição de humores
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {moods.filter(m => stats.moodDistribution[m]).map(m => {
              const count = stats.moodDistribution[m] ?? 0
              const pct = Math.round((count / totalMoods) * 100)
              return (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: 100, flexShrink: 0 }}>
                    <span style={{ color: 'var(--amber-muted)' }}>{MOOD_ICONS[m]}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{MOOD_META[m].label}</span>
                  </div>
                  <div style={{ flex: 1, height: 6, background: 'var(--surface-border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'var(--amber-glow)', borderRadius: 3, transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 30, textAlign: 'right' }}>{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
