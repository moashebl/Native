'use client'
import React from 'react'
import { useCartSidebarVisibility } from '@/hooks/use-cart-sidebar'
import CartSidebar from './cart-sidebar'
import { Toaster } from 'sonner'
import AppInitializer from './app-initializer'
import ThemeInitializer from './theme-initializer'
import { ClientSetting } from '@/types'
import { SessionProvider } from 'next-auth/react'

export default function ClientProviders({
  children,
  setting,
}: {
  children: React.ReactNode
  setting: ClientSetting
}) {
  const visible = useCartSidebarVisibility()

  return (
    <SessionProvider>
      <AppInitializer setting={setting}>
        <ThemeInitializer setting={setting}>
          {visible ? (
            <div className='flex min-h-screen'>
              <div className='flex-1 overflow-hidden'>{children}</div>
              <CartSidebar />
            </div>
          ) : (
            <div>{children}</div>
          )}
          <Toaster />
        </ThemeInitializer>
      </AppInitializer>
    </SessionProvider>
  )
}