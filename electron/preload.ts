import { contextBridge, ipcRenderer } from 'electron'
import Store from 'electron-store'

const store = new Store({ name: 'meu-diario' })
const ENTRIES_KEY = 'diary_entries'

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, args: any) => ipcRenderer.send(channel, args),
    on: (channel: string, func: (event: any, args: any) => void) => {
      ipcRenderer.on(channel, func)
    },
    invoke: (channel: string, args: any) => ipcRenderer.invoke(channel, args),
  },
  storage: {
    get: (key: string, defaultValue?: any) => {
      const entries = store.get(key, defaultValue)
      return entries
    },
    set: (key: string, value: any) => {
      store.set(key, value)
    },
    delete: (key: string) => {
      store.delete(key)
    },
  },
})
