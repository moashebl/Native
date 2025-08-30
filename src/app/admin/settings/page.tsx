import { getNoCachedSetting } from '@/lib/actions/setting.actions'
import SettingForm from './setting-form'
import SettingNav from './setting-nav'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setting',
}

const SettingPage = async () => {
  console.log('Settings page loading...')
  
  try {
    console.log('Attempting to get settings...')
    const setting = await getNoCachedSetting()
    console.log('Settings loaded successfully:', setting)
    
    return (
      <div className='grid md:grid-cols-5 max-w-6xl mx-auto gap-4'>
        <SettingNav />
        <main className='col-span-4 '>
          <div className='my-8'>
            <SettingForm setting={setting} />
          </div>
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error loading settings page:', error)
    return (
      <div className='max-w-6xl mx-auto p-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>Error Loading Settings</h1>
          <p className='text-gray-600 mb-4'>
            There was an error loading the settings page. This might be due to:
          </p>
          <ul className='text-left text-gray-600 mb-6 max-w-md mx-auto'>
            <li>• Database connection issues</li>
            <li>• Missing environment variables</li>
            <li>• Network connectivity problems</li>
          </ul>
          <p className='text-sm text-gray-500'>
            Check the browser console for more details.
          </p>
          <pre className='mt-4 p-4 bg-gray-100 rounded text-left text-xs overflow-auto'>
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    )
  }
}

export default SettingPage