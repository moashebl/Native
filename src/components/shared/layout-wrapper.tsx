'use client'

import { usePathname } from 'next/navigation'
import Header from './header'
import Footer from './footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  )
}
