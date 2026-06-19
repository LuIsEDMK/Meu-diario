import { contextBridge } from 'electron'
import Store from 'electron-store'

const store = new Store({ name: 'meu-diario' })

contextBridge.exposeInMainWorld('storage', {
  get: (key, defaultValue) => store.get(key, defaultValue),
  set: (key, value) => store.set(key, value),
  delete: (key) => store.delete(key),
})
