'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore, { colorStore } from '@/hooks/use-color-store'

export function ColorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const { color, updateCssVariables } = useColorStore(theme)
  const [storeState, setStoreState] = React.useState(colorStore.getState())
  
  React.useEffect(() => {
    const unsubscribe = colorStore.subscribe((state) => {
      setStoreState(state)
    })
    return unsubscribe
  }, [])
  
  React.useEffect(() => {
    if (theme && color) {
      console.log('ColorProvider: theme =', theme, 'color =', color.name)
      updateCssVariables(theme as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, color, storeState])

  return <>{children}</>
}