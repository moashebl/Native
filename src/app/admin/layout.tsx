import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenu from '@/components/shared/header/menu'
import { AdminNav } from './admin-nav'
import { getSetting } from '@/lib/actions/setting.actions'
import LanguageSwitcher from '@/components/shared/header/language-switcher'
import ThemeSwitcher from '@/components/shared/header/theme-switcher'
import UserButton from '@/components/shared/header/user-button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let siteName = 'Native House' // Default fallback
  
  try {
    const { site } = await getSetting()
    siteName = site.name
  } catch (error) {
    console.error('Error loading admin layout settings:', error)
    // Use default values if settings fail to load
  }
  
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div className='bg-black text-white border-b border-gray-800'>
          <div className='flex h-16 items-center px-4 md:px-6'>
            <Link href='/' className='flex-shrink-0'>
              <Image
                src='/icons/logo.svg'
                width={48}
                height={48}
                alt={`${siteName} logo`}
                className=''
              />
            </Link>
            <AdminNav className='mx-6 hidden md:flex' />
            <div className='ml-auto flex items-center gap-2 md:gap-4'>
              <div className='hidden sm:flex items-center gap-2 md:gap-4'>
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              <UserButton />
            </div>
            <div className='md:hidden ml-2'>
              <MobileMenu />
            </div>
          </div>
          <div className='border-t border-gray-800 md:hidden'>
            <AdminNav className='flex px-4 py-3 overflow-x-auto scrollbar-hide' />
          </div>
        </div>
        <div className='flex-1 p-4 md:p-6 bg-background'>{children}</div>
      </div>
    </>
  )
}