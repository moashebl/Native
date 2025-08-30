'use server'
import { ISettingInput } from '@/types'
import data from '../data'
import Setting from '../db/models/setting.model'
import { connectToDatabase } from '../db'
import { formatError } from '../utils'
import { cookies } from 'next/headers'

const globalForSettings = global as unknown as {
  cachedSettings: ISettingInput | null
}
export const getNoCachedSetting = async (): Promise<ISettingInput> => {
  try {
    await connectToDatabase()
    const setting = await Setting.findOne()
    if (setting) {
      return JSON.parse(JSON.stringify(setting)) as ISettingInput
    } else {
      // If no settings exist in database, return the default data
      console.log('No settings found in database, using default data')
      return data.settings[0]
    }
  } catch (error) {
    console.error('Error getting settings from database:', error)
    // Fallback to default data if database connection fails
    console.log('Falling back to default settings data')
    return data.settings[0]
  }
}

export const getSetting = async (): Promise<ISettingInput> => {
  if (!globalForSettings.cachedSettings) {
    console.log('hit db')
    await connectToDatabase()
    const setting = await Setting.findOne().lean()
    globalForSettings.cachedSettings = setting
      ? JSON.parse(JSON.stringify(setting))
      : data.settings[0]
  }
  return globalForSettings.cachedSettings as ISettingInput
}

export const updateSetting = async (newSetting: ISettingInput) => {
  try {
    console.log('Connecting to database...')
    await connectToDatabase()
    console.log('Database connected, updating setting...')
    
    const updatedSetting = await Setting.findOneAndUpdate({}, newSetting, {
      upsert: true,
      new: true,
    }).lean()
    
    console.log('Setting updated successfully:', updatedSetting)
    
    globalForSettings.cachedSettings = JSON.parse(
      JSON.stringify(updatedSetting)
    ) // Update the cache
    return {
      success: true,
      message: 'Setting updated successfully',
    }
  } catch (error) {
    console.error('Error updating setting:', error)
    return { success: false, message: formatError(error) }
  }
}

// Server action to update the currency cookie
export const setCurrencyOnServer = async (newCurrency: string) => {
  'use server'
  const cookiesStore = await cookies()
  cookiesStore.set('currency', newCurrency)

  return {
    success: true,
    message: 'Currency updated successfully',
  }
}