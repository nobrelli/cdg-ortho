import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  openFolderSelectorDialog: async () => {
    return await ipcRenderer.invoke('open-folder-selector-dialog')
  },
})
