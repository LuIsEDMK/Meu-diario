'use strict'
const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

let dbPath = null
let data = { entries: [], settings: {}, _seeded: false }

function initDatabase(userDataPath) {
  dbPath = path.join(userDataPath, 'diary.json')
  load()
  if (data.entries.length === 0 && !data._seeded) {
    seedEntries()
    data._seeded = true
    save()
  }
}

function load() {
  if (dbPath && fs.existsSync(dbPath)) {
    try {
      const raw = fs.readFileSync(dbPath, 'utf-8')
      data = JSON.parse(raw)
      if (!data.entries) data.entries = []
      if (!data.settings) data.settings = {}
    } catch { /* use defaults */ }
  }
}

function save() {
  if (!dbPath) return
  const tmp = dbPath + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8')
  fs.renameSync(tmp, dbPath)
}

function subtractDays(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

function seedEntries() {
  const seeds = [
    {
      id: randomUUID(),
      title: 'Primeiro dia com meu diário',
      content: 'Hoje decidi começar a escrever um diário. Sempre quis ter um lugar para colocar meus pensamentos em ordem, um espaço só meu para refletir sobre o dia a dia.\n\nNão sei ao certo o que esperar dessa experiência, mas estou animado para descobrir. Dizem que escrever ajuda a clarear a mente e a entender melhor nossas emoções.',
      mood: 'happy',
      tags: ['início', 'reflexão'],
      fontStyle: 'minimalista',
      createdAt: subtractDays(30) + 'T10:00:00.000Z',
      updatedAt: subtractDays(30) + 'T10:00:00.000Z',
    },
    {
      id: randomUUID(),
      title: 'Uma tarde de chuva',
      content: 'A chuva caiu a tarde toda. Fiquei na janela observando as gotas escorregarem pelo vidro, cada uma traçando um caminho diferente até o fim.\n\nNos dias assim, me sinto mais introspectivo. O barulho da chuva tem algo de reconfortante, como um ruído branco natural que acalma os pensamentos.',
      mood: 'calm',
      tags: ['natureza', 'contemplação'],
      fontStyle: 'minimalista',
      createdAt: subtractDays(21) + 'T15:30:00.000Z',
      updatedAt: subtractDays(21) + 'T15:30:00.000Z',
    },
    {
      id: randomUUID(),
      title: 'Gratidão pelas pequenas coisas',
      content: 'Hoje me peguei sorrindo por nada. Ou melhor, por tudo — o café da manhã quentinho, a música que tocou no momento certo, a ligação inesperada de um amigo.\n\nÀs vezes a vida nos surpreende com pequenas gentilezas que esquecemos de notar. Quero começar a prestar mais atenção nessas coisas.',
      mood: 'grateful',
      tags: ['gratidão', 'felicidade'],
      fontStyle: 'minimalista',
      createdAt: subtractDays(14) + 'T09:15:00.000Z',
      updatedAt: subtractDays(14) + 'T09:15:00.000Z',
    },
    {
      id: randomUUID(),
      title: 'Foco total',
      content: 'Consegui trabalhar por quatro horas seguidas sem distrações. Sensação rara e boa.\n\nDesativei as notificações, deixei o telefone do outro lado do cômodo e simplesmente trabalhei. O resultado foi impressionante. Preciso criar esse ritual mais vezes na semana.',
      mood: 'focused',
      tags: ['produtividade', 'trabalho'],
      fontStyle: 'minimalista',
      createdAt: subtractDays(7) + 'T14:00:00.000Z',
      updatedAt: subtractDays(7) + 'T14:00:00.000Z',
    },
    {
      id: randomUUID(),
      title: 'Noite de leitura',
      content: 'Terminei o livro que estava lendo há semanas. Aquela sensação de fechar a última página e ficar parado por um momento, digerindo tudo — não tem preço.\n\nAs histórias que mais gosto são as que mudam algo em mim, que me fazem enxergar o mundo de um jeito ligeiramente diferente depois de ler.',
      mood: 'tired',
      tags: ['leitura', 'literatura'],
      fontStyle: 'minimalista',
      createdAt: subtractDays(2) + 'T22:00:00.000Z',
      updatedAt: subtractDays(2) + 'T22:00:00.000Z',
    },
  ]
  data.entries = seeds
}

function getEntries() {
  load()
  return [...data.entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

function getEntry(id) {
  load()
  return data.entries.find(e => e.id === id) || null
}

function saveEntry(entry) {
  load()
  const now = new Date().toISOString()
  if (entry.id) {
    const idx = data.entries.findIndex(e => e.id === entry.id)
    if (idx !== -1) {
      data.entries[idx] = {
        ...data.entries[idx],
        title: entry.title ?? data.entries[idx].title,
        content: entry.content ?? data.entries[idx].content,
        mood: entry.mood !== undefined ? entry.mood : data.entries[idx].mood,
        tags: entry.tags ?? data.entries[idx].tags,
        fontStyle: entry.fontStyle ?? data.entries[idx].fontStyle,
        updatedAt: now,
      }
      save()
      return data.entries[idx]
    }
  }
  const newEntry = {
    id: entry.id || randomUUID(),
    title: entry.title || '',
    content: entry.content || '',
    mood: entry.mood || null,
    tags: entry.tags || [],
    fontStyle: entry.fontStyle || 'minimalista',
    createdAt: entry.createdAt || now,
    updatedAt: now,
  }
  data.entries.push(newEntry)
  save()
  return newEntry
}

function deleteEntry(id) {
  load()
  data.entries = data.entries.filter(e => e.id !== id)
  save()
}

function getStats() {
  const entries = getEntries()
  const totalWords = entries.reduce((sum, e) => {
    return sum + e.content.split(/\s+/).filter(w => w.length > 0).length
  }, 0)
  const moodDistribution = {}
  for (const e of entries) {
    if (e.mood) moodDistribution[e.mood] = (moodDistribution[e.mood] || 0) + 1
  }
  const activityHeatmap = {}
  for (const e of entries) {
    const d = e.createdAt.split('T')[0]
    activityHeatmap[d] = (activityHeatmap[d] || 0) + 1
  }
  const allDates = [...new Set(entries.map(e => e.createdAt.split('T')[0]))].sort()
  let longestStreak = 0
  let currentStreak = 0
  if (allDates.length > 0) {
    let streak = 1
    longestStreak = 1
    for (let i = 1; i < allDates.length; i++) {
      const diff = (new Date(allDates[i]) - new Date(allDates[i - 1])) / 86400000
      if (diff === 1) { streak++; longestStreak = Math.max(longestStreak, streak) }
      else streak = 1
    }
    const last = new Date(allDates[allDates.length - 1])
    const today = new Date(); today.setHours(0, 0, 0, 0)
    last.setHours(0, 0, 0, 0)
    const diff = (today - last) / 86400000
    if (diff <= 1) currentStreak = streak
  }
  return { totalEntries: entries.length, totalWords, longestStreak, currentStreak, moodDistribution, activityHeatmap }
}

function getSettings() {
  load()
  return Object.assign({ theme: 'dark', fontPanel: 'minimalista', openEntryIn: 'view' }, data.settings)
}

function saveSettings(settings) {
  load()
  data.settings = Object.assign(data.settings || {}, settings)
  save()
  return getSettings()
}

function exportAllEntries() {
  return getEntries()
}

function importEntries(entries) {
  load()
  for (const e of entries) {
    const idx = data.entries.findIndex(x => x.id === e.id)
    if (idx !== -1) data.entries[idx] = e
    else data.entries.push(e)
  }
  save()
  return getEntries()
}

module.exports = {
  initDatabase,
  getEntries,
  getEntry,
  saveEntry,
  deleteEntry,
  getStats,
  getSettings,
  saveSettings,
  exportAllEntries,
  importEntries,
}
