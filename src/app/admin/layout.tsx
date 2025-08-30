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
      <div className='flex flex-col'>
        <div className='bg-black text-white'>
          <div className='flex h-16 items-center px-2'>
            <Link href='/'>
              <Image
                src='/icons/logo.svg'
                width={48}
                height={48}
                alt={`${siteName} logo`}
                className='filter brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-300'
              />
            </Link>
            <AdminNav className='mx-6 hidden md:flex' />
            <div className='ml-auto flex items-center space-x-4'>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <UserButton />
            </div>
            <MobileMenu />
          </div>
          <div>
            <AdminNav className='flex md:hidden px-4 pb-2' />
          </div>
        </div>
        <div className='flex-1 p-4'>{children}</div>
      </div>
    </>
  )
}