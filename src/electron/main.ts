import path from 'node:path'
import { BrowserWindow, app, dialog, ipcMain } from 'electron'
import { isDev } from './utils.js'

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    minWidth: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), '/dist-electron/preload.mjs'),
      nodeIntegrationInWorker: true,
    },
  })

  if (isDev()) {
    mainWindow.loadURL('http://localhost:7000')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }

  ipcMain.handle('open-folder-selector-dialog', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Select data folder location',
      properties: ['openDirectory'],
    })

    if (result.canceled) {
      return null
    }

    return result.filePaths[0]
  })
})
