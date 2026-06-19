import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Save, ChevronDown, ChevronUp } from 'lucide-react'
import { useDiaryStore } from '../store/diary'
import MoodPicker from '../components/MoodPicker'
import TagInput from '../components/TagInput'
import type { Mood } from '../types'
import { FONT_PANEL_OPTIONS } from '../types'

export default function Editor() {
  const { editorEntry, closeEditor, saveEntry, saving, settings } = useDiaryStore()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState<Mood | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [fontStyle, setFontStyle] = useState(settings.fontPanel || 'minimalista')
  const [showMeta, setShowMeta] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editorEntry) {
      setTitle(editorEntry.title || '')
      setContent(editorEntry.content || '')
      setMood((editorEntry.mood as Mood) || null)
      setTags(editorEntry.tags || [])
      setFontStyle(editorEntry.fontStyle || settings.fontPanel || 'minimalista')
    } else {
      setTitle('')
      setContent('')
      setMood(null)
      setTags([])
      setFontStyle(settings.fontPanel || 'minimalista')
    }
    setTimeout(() => textareaRef.current?.focus(), 80)
  }, [editorEntry, settings.fontPanel])

  async function handleSave() {
    if (!content.trim() && !title.trim()) return
    await saveEntry({
      id: editorEntry?.id,
      title: title.trim(),
      content: content.trim(),
      mood,
      tags,
      fontStyle,
      createdAt: editorEntry?.createdAt,
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      handleSave()
    }
  }

  const fontFamily = FONT_PANEL_OPTIONS[fontStyle]?.family ?? 'var(--font-body)'
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const isEditing = Boolean(editorEntry?.id)
  const canSave = !saving && (content.trim().length > 0 || title.trim().length > 0)

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--surface)',
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 20px',
          borderBottom: '1px solid var(--surface-border)',
          flexShrink: 0,
        }}
      >
        <button
          onClick={closeEditor}
          title="Voltar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--surface-border)',
            color: 'var(--text-secondary)',
            fontSize: 13,
            transition: 'var(--transition)',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--amber-muted)'
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--surface-border)'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          <ArrowLeft size={15} />
          Voltar
        </button>

        {/* Title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={isEditing ? 'Título da página...' : 'Título da nova página...'}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 18,
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            minWidth: 0,
          }}
        />

        {/* Meta toggle */}
        <button
          onClick={() => setShowMeta(!showMeta)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--surface-border)',
            color: 'var(--text-muted)',
            fontSize: 12,
            transition: 'var(--transition)',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Detalhes {showMeta ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!canSave}
          title="Salvar (Ctrl+S)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 16px',
            background: canSave ? 'var(--amber-glow)' : 'var(--surface-border)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            color: canSave ? '#1c1510' : 'var(--text-muted)',
            fontSize: 13,
            fontWeight: 600,
            cursor: canSave ? 'pointer' : 'not-allowed',
            transition: 'var(--transition)',
            flexShrink: 0,
          }}
          onMouseEnter={e => { if (canSave) (e.currentTarget as HTMLButtonElement).style.background = 'var(--amber-soft)' }}
          onMouseLeave={e => { if (canSave) (e.currentTarget as HTMLButtonElement).style.background = 'var(--amber-glow)' }}
        >
          <Save size={14} />
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {/* Metadata panel */}
      {showMeta && (
        <div
          style={{
            display: 'flex',
            gap: 24,
            padding: '12px 20px',
            borderBottom: '1px solid var(--surface-border)',
            background: 'var(--surface-raised)',
            flexShrink: 0,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          {/* Mood */}
          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
              Humor
            </label>
            <MoodPicker value={mood} onChange={m => setMood(m as Mood | null)} size="sm" />
          </div>

          {/* Tags */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
              Tags
            </label>
            <TagInput tags={tags} onChange={setTags} />
          </div>

          {/* Font */}
          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
              Fonte
            </label>
            <div style={{ display: 'flex', gap: 4 }}>
              {Object.entries(FONT_PANEL_OPTIONS).map(([key, opt]) => (
                <button
                  key={key}
                  onClick={() => setFontStyle(key)}
                  title={opt.label}
                  style={{
                    padding: '4px 10px',
                    background: fontStyle === key ? 'var(--amber-dim)' : 'transparent',
                    border: `1px solid ${fontStyle === key ? 'var(--amber-glow)' : 'var(--surface-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: opt.family,
                    fontSize: 12,
                    color: fontStyle === key ? 'var(--amber-soft)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  Aa
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Textarea area */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Escreva aqui o que está na sua mente..."
          style={{
            width: '100%',
            maxWidth: 720,
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 16,
            lineHeight: 1.85,
            fontFamily: fontFamily,
            color: 'var(--text-primary)',
            padding: '28px 0',
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '8px 24px',
          borderTop: '1px solid var(--surface-border)',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'} · Ctrl+S para salvar
        </span>
      </div>
    </div>
  )
}
