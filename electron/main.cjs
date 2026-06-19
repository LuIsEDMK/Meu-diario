'use strict'
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

let db = null
let mainWindow = null

app.disableHardwareAcceleration()

if (process.platform === 'win32') {
  app.setAppUserModelId('com.meudiario.app')
}

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function registerIpcHandlers() {
  ipcMain.handle('diary:getEntries', () => db.getEntries())
  ipcMain.handle('diary:getEntry', (_, id) => db.getEntry(id))
  ipcMain.handle('diary:saveEntry', (_, entry) => db.saveEntry(entry))
  ipcMain.handle('diary:deleteEntry', (_, id) => { db.deleteEntry(id); return true })
  ipcMain.handle('diary:getStats', () => db.getStats())
  ipcMain.handle('diary:getSettings', () => db.getSettings())
  ipcMain.handle('diary:saveSettings', (_, settings) => db.saveSettings(settings))
  ipcMain.handle('diary:exportEntries', async () => {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: `diario-backup-${new Date().toISOString().split('T')[0]}.json`,
      filters: [{ name: 'JSON', extensions: ['json'] }],
    })
    if (result.canceled || !result.filePath) return { canceled: true }
    const entries = db.exportAllEntries()
    fs.writeFileSync(result.filePath, JSON.stringify(entries, null, 2), 'utf-8')
    return { canceled: false, count: entries.length }
  })
  ipcMain.handle('diary:importEntries', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile'],
    })
    if (result.canceled || !result.filePaths.length) return { canceled: true }
    try {
      const raw = fs.readFileSync(result.filePaths[0], 'utf-8')
      const entries = JSON.parse(raw)
      if (!Array.isArray(entries)) return { error: 'Arquivo inválido' }
      const imported = db.importEntries(entries)
      return { canceled: false, entries: imported }
    } catch (e) {
      return { error: e.message }
    }
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 860,
    minHeight: 600,
    title: 'Meu Diário',
    backgroundColor: '#1c1510',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      spellcheck: true,
    },
    icon: path.join(__dirname, '../assets/icon.ico'),
  })

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist/index.html'))
  } else {
    const devDist = path.join(__dirname, '../dist/index.html')
    if (fs.existsSync(devDist)) {
      mainWindow.loadFile(devDist)
    } else {
      mainWindow.loadURL('http://localhost:5173')
    }
  }

  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', () => {
  db = require('./db.cjs')
  db.initDatabase(app.getPath('userData'))
  registerIpcHandlers()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
