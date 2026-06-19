import React, { useEffect, useState } from 'react'
import { Download, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useDiaryStore } from '../store/diary'
import FontPanel from '../components/FontPanel'
import type { Settings as SettingsType } from '../types'

export default function Settings() {
  const { settings, loadSettings, updateSettings } = useDiaryStore()
  const [exportMsg, setExportMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => { loadSettings() }, [])

  async function handleExport() {
    const result = await window.diary.exportEntries()
    if (result.canceled) return
    if (result.error) {
      setExportMsg({ ok: false, text: `Erro: ${result.error}` })
    } else {
      setExportMsg({ ok: true, text: `${result.count} ${result.count === 1 ? 'página exportada' : 'páginas exportadas'}` })
    }
    setTimeout(() => setExportMsg(null), 3000)
  }

  async function handleImport() {
    const result = await window.diary.importEntries()
    if (result.canceled) return
    if (result.error) {
      setImportMsg({ ok: false, text: `Erro: ${result.error}` })
    } else {
      setImportMsg({ ok: true, text: `${result.entries?.length ?? 0} páginas importadas` })
      const store = useDiaryStore.getState()
      await store.loadEntries()
    }
    setTimeout(() => setImportMsg(null), 3000)
  }

  return (
    <div style={{ padding: '20px', overflowY: 'auto', height: '100%', maxWidth: 480 }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 24 }}>
        Configurações
      </h2>

      {/* Font panel */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
          Fonte padrão
        </h3>
        <FontPanel
          value={settings.fontPanel}
          onChange={v => updateSettings({ fontPanel: v as SettingsType['fontPanel'] })}
        />
      </section>

      {/* Open entry in */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
          Abrir página em
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { value: 'view', label: 'Visualização' },
            { value: 'editor', label: 'Editor' },
          ].map(opt => {
            const active = settings.openEntryIn === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => updateSettings({ openEntryIn: opt.value as 'view' | 'editor' })}
                style={{
                  padding: '7px 14px',
                  background: active ? 'var(--amber-dim)' : 'transparent',
                  border: `1px solid ${active ? 'var(--amber-glow)' : 'var(--surface-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: active ? 'var(--amber-soft)' : 'var(--text-secondary)',
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Export */}
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
          Dados
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                background: 'var(--surface-raised)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: 13,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--amber-muted)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--surface-border)')}
            >
              <Download size={14} /> Exportar páginas (JSON)
            </button>
            {exportMsg && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: exportMsg.ok ? 'var(--success)' : 'var(--danger)' }}>
                {exportMsg.ok ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                {exportMsg.text}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleImport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                background: 'var(--surface-raised)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: 13,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--amber-muted)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--surface-border)')}
            >
              <Upload size={14} /> Importar páginas (JSON)
            </button>
            {importMsg && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: importMsg.ok ? 'var(--success)' : 'var(--danger)' }}>
                {importMsg.ok ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                {importMsg.text}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

