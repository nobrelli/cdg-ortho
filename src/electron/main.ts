import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev } from './utils.js'

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        minWidth: 600
    })
    
    if (isDev()) {
        mainWindow.loadURL('http://localhost:7000')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
    }
})