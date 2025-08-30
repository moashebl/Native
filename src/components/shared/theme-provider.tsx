'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ColorProvider } from './color-provider'

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & {
  defaultTheme?: string
}) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ColorProvider>{children}</ColorProvider>
    </NextThemesProvider>
  )
}