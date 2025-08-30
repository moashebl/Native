'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { ClientSetting } from '@/types'

interface ThemeInitializerProps {
  setting: ClientSetting
  children: React.ReactNode
}

export default function ThemeInitializer({ setting, children }: ThemeInitializerProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme')
    
    console.log('ThemeInitializer: savedTheme =', savedTheme)
    console.log('ThemeInitializer: current theme =', theme)
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      // User has a saved preference, use it
      console.log('ThemeInitializer: using saved theme =', savedTheme)
      setTheme(savedTheme)
    } else {
      // No saved preference, use the default from settings
      const defaultTheme = (setting.common?.defaultTheme || 'light').toLowerCase()
      console.log('ThemeInitializer: using default theme =', defaultTheme)
      setTheme(defaultTheme)
    }
  }, [setting.common?.defaultTheme, setTheme, theme])

  useEffect(() => {
    if (mounted) {
      console.log('ThemeInitializer: mounted, current theme =', theme)
      console.log('ThemeInitializer: HTML class =', document.documentElement.className)
    }
  }, [mounted, theme])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return <>{children}</>
}
