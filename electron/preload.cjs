'use strict'
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('diary', {
  getEntries: () => ipcRenderer.invoke('diary:getEntries'),
  getEntry: (id) => ipcRenderer.invoke('diary:getEntry', id),
  saveEntry: (entry) => ipcRenderer.invoke('diary:saveEntry', entry),
  deleteEntry: (id) => ipcRenderer.invoke('diary:deleteEntry', id),
  getStats: () => ipcRenderer.invoke('diary:getStats'),
  getSettings: () => ipcRenderer.invoke('diary:getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('diary:saveSettings', settings),
  exportEntries: () => ipcRenderer.invoke('diary:exportEntries'),
  importEntries: () => ipcRenderer.invoke('diary:importEntries'),
})
