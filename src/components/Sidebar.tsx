import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen, BarChart2, Settings, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react'
import { useDiaryStore } from '../store/diary'

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, openEditor } = useDiaryStore()
  const w = sidebarCollapsed ? 48 : 220

  const navItems = [
    { to: '/', icon: <BookOpen size={16} />, label: 'Páginas', exact: true },
    { to: '/stats', icon: <BarChart2 size={16} />, label: 'Estatísticas', exact: false },
    { to: '/settings', icon: <Settings size={16} />, label: 'Configurações', exact: false },
  ]

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: sidebarCollapsed ? 0 : 10,
    padding: sidebarCollapsed ? '10px 0' : '9px 14px',
    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
    borderRadius: 'var(--radius-sm)',
    fontSize: 13,
    color: isActive ? 'var(--amber-soft)' : 'var(--text-secondary)',
    background: isActive ? 'var(--amber-dim)' : 'transparent',
    transition: 'var(--transition)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  })

  return (
    <aside
      style={{
        width: w,
        minWidth: w,
        maxWidth: w,
        height: '100%',
        background: 'var(--surface-raised)',
        borderRight: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.25s ease, min-width 0.25s ease, max-width 0.25s ease',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: sidebarCollapsed ? '16px 0' : '16px 14px',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          gap: 8,
          flexShrink: 0,
        }}
      >
        {!sidebarCollapsed && (
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--amber-soft)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Meu Diário
          </span>
        )}
        <button
          title={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          onClick={toggleSidebar}
          style={{ color: 'var(--text-muted)', padding: 4, display: 'flex', borderRadius: 'var(--radius-sm)', transition: 'var(--transition)', flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Nova página */}
      <div style={{ padding: sidebarCollapsed ? '10px 4px' : '10px 10px', borderBottom: '1px solid var(--surface-border)', flexShrink: 0 }}>
        <button
          onClick={() => openEditor()}
          title="Nova página"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            gap: 8,
            padding: sidebarCollapsed ? '8px 0' : '8px 12px',
            background: 'var(--amber-dim)',
            border: '1px solid var(--amber-muted)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--amber-soft)',
            fontSize: 13,
            fontWeight: 500,
            transition: 'var(--transition)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,124,42,0.25)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--amber-dim)' }}
        >
          <Plus size={15} />
          {!sidebarCollapsed && 'Nova página'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: sidebarCollapsed ? '8px 4px' : '8px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            title={sidebarCollapsed ? item.label : undefined}
            style={({ isActive }) => linkStyle(isActive)}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              if (el.style.background === 'transparent' || !el.style.background) {
                el.style.background = 'var(--surface-hover)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              if (el.style.background === 'var(--surface-hover)') {
                el.style.background = 'transparent'
              }
            }}
          >
            {item.icon}
            {!sidebarCollapsed && item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
