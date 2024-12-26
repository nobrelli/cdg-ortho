import fs from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { app, dialog, ipcMain } from 'electron'
import log from 'electron-log/main'
import { DB } from './database/init'
import { patientsTable } from './database/schema'

const SETTINGS_FILENAME = 'settings.json'
const SETTINGS_FILE = path.join(dirname(app.getPath('exe')), SETTINGS_FILENAME)

async function getSettings(): Promise<AppConfig> {
  try {
    const settings = await fs.readFile(SETTINGS_FILE, { encoding: 'utf-8' })

    return JSON.parse(settings) as AppConfig
  } catch (error) {
    log.warn(
      `${SETTINGS_FILENAME} will be created once the user changed the default settings.`
    )

    // Return defaults
    return {
      patientDataFolder: app.getPath('appData'),
    }
  }
}

export function setListeners() {
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

  ipcMain.handle(
    'create-patient-record',
    async (_, fields: NewPatientFields) => {
      const settings = await getSettings()

      // Add to db
      const patient: typeof patientsTable.$inferInsert = {
        ...fields,
        birthdate: fields.birthdate as Date,
      }

      const result = await DB.insert(patientsTable).values(patient).returning()

      if (!result) return false

      // Create a new folder named with a unique ID
      try {
        await fs.mkdir(
          path.join(settings.patientDataFolder, result[0].id, 'uploads'),
          { recursive: true }
        )

        return true
      } catch (error) {
        log.error(error)
        return false
      }
    }
  )

  ipcMain.handle('get-patients', async () => {
    return await DB.select().from(patientsTable)
  })

  ipcMain.handle('get-settings', getSettings)

  ipcMain.handle('save-settings', async (_, settings: AppConfig) => {
    try {
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), {
        encoding: 'utf8',
      })

      return true
    } catch (error) {
      log.error(error)
      return false
    }
  })
}
