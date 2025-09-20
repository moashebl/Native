import { getSetting } from '@/lib/actions/setting.actions'
import React from 'react'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await getSetting()
  return (
    <div className='flex flex-col items-center min-h-screen highlight-link relative z-0'>
      <main className='mx-auto max-w-sm min-w-80 p-4 relative z-0'>{children}</main>
    </div>
  )
}