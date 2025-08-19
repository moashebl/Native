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
      console.log('Store state changed:', state)
      setStoreState(state)
    })
    return unsubscribe
  }, [])
  
  React.useEffect(() => {
    if (theme && color) {
      console.log('ColorProvider: Theme changed to:', theme)
      console.log('ColorProvider: Color changed to:', color.name)
      console.log('ColorProvider: Store state:', storeState)
      updateCssVariables(theme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, color, storeState])

  return <>{children}</>
}