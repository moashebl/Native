/* eslint-disable @typescript-eslint/no-empty-object-type */
// first copy theme color from https://ui.shadcn.com/themes
// then in chatgpt:
// PROMPT: convert this css to js object. don't convert css variable to cameCase

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ColorState = {
  availableColors: {
    name: string
    root: {}
    dark: {}
  }[]
  defaultColor: string
  userColor?: string
}
const availableColors = [
  {
    name: 'Gold',
    root: {
      "--radius": "0.65rem",
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.141 0.005 285.823)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.141 0.005 285.823)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.141 0.005 285.823)",
      "--primary": "oklch(0.705 0.213 47.604)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--secondary": "oklch(0.967 0.001 286.375)",
      "--secondary-foreground": "oklch(0.21 0.006 285.885)",
      "--muted": "oklch(0.967 0.001 286.375)",
      "--muted-foreground": "oklch(0.552 0.016 285.938)",
      "--accent": "oklch(0.967 0.001 286.375)",
      "--accent-foreground": "oklch(0.21 0.006 285.885)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--border": "oklch(0.92 0.004 286.32)",
      "--input": "oklch(0.92 0.004 286.32)",
      "--ring": "oklch(0.705 0.213 47.604)",
      "--chart-1": "oklch(0.646 0.222 41.116)",
      "--chart-2": "oklch(0.6 0.118 184.704)",
      "--chart-3": "oklch(0.398 0.07 227.392)",
      "--chart-4": "oklch(0.828 0.189 84.429)",
      "--chart-5": "oklch(0.769 0.188 70.08)",
      "--sidebar": "oklch(0.985 0 0)",
      "--sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "--sidebar-primary": "oklch(0.705 0.213 47.604)",
      "--sidebar-primary-foreground": "oklch(0.98 0.016 73.684)",
      "--sidebar-accent": "oklch(0.967 0.001 286.375)",
      "--sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "--sidebar-border": "oklch(0.92 0.004 286.32)",
      "--sidebar-ring": "oklch(0.705 0.213 47.604)",
    },
    dark: {
      "--background": "oklch(0.141 0.005 285.823)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.21 0.006 285.885)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.21 0.006 285.885)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.646 0.222 41.116)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--secondary": "oklch(0.274 0.006 286.033)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.274 0.006 286.033)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.274 0.006 286.033)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.704 0.191 22.216)",
      "--border": "oklch(1 0 0 / 10%)",
      "--input": "oklch(1 0 0 / 15%)",
      "--ring": "oklch(0.646 0.222 41.116)",
      "--chart-1": "oklch(0.488 0.243 264.376)",
      "--chart-2": "oklch(0.696 0.17 162.48)",
      "--chart-3": "oklch(0.769 0.188 70.08)",
      "--chart-4": "oklch(0.627 0.265 303.9)",
      "--chart-5": "oklch(0.645 0.246 16.439)",
      "--sidebar": "oklch(0.21 0.006 285.885)",
      "--sidebar-foreground": "oklch(0.985 0 0)",
      "--sidebar-primary": "oklch(0.646 0.222 41.116)",
      "--sidebar-primary-foreground": "oklch(0.98 0.016 73.684)",
      "--sidebar-accent": "oklch(0.274 0.006 286.033)",
      "--sidebar-accent-foreground": "oklch(0.985 0 0)",
      "--sidebar-border": "oklch(1 0 0 / 10%)",
      "--sidebar-ring": "oklch(0.646 0.222 41.116)",
    },
  },
  {
    name: 'Violet',
    root: {
      "--radius": "0.65rem",
      "--background": "hsl(0, 0%, 100%)",
      "--foreground": "hsl(224, 71.4%, 4.1%)",
      "--card": "hsl(0, 0%, 100%)",
      "--card-foreground": "hsl(224, 71.4%, 4.1%)",
      "--popover": "hsl(0, 0%, 100%)",
      "--popover-foreground": "hsl(224, 71.4%, 4.1%)",
      "--primary": "hsl(262.1, 83.3%, 57.8%)",
      "--primary-foreground": "hsl(210, 20%, 98%)",
      "--secondary": "hsl(220, 14.3%, 95.9%)",
      "--secondary-foreground": "hsl(220.9, 39.3%, 11%)",
      "--muted": "hsl(220, 14.3%, 95.9%)",
      "--muted-foreground": "hsl(220, 8.9%, 46.1%)",
      "--accent": "hsl(220, 14.3%, 95.9%)",
      "--accent-foreground": "hsl(220.9, 39.3%, 11%)",
      "--destructive": "hsl(0, 84.2%, 60.2%)",
      "--border": "hsl(220, 13%, 91%)",
      "--input": "hsl(220, 13%, 91%)",
      "--ring": "hsl(262.1, 83.3%, 57.8%)",
      "--chart-1": "hsl(12, 76%, 61%)",
      "--chart-2": "hsl(173, 58%, 39%)",
      "--chart-3": "hsl(197, 37%, 24%)",
      "--chart-4": "hsl(43, 74%, 66%)",
      "--chart-5": "hsl(27, 87%, 67%)",
      "--sidebar": "hsl(0, 0%, 98%)",
      "--sidebar-foreground": "hsl(224, 71.4%, 4.1%)",
      "--sidebar-primary": "hsl(262.1, 83.3%, 57.8%)",
      "--sidebar-primary-foreground": "hsl(210, 20%, 98%)",
      "--sidebar-accent": "hsl(220, 14.3%, 95.9%)",
      "--sidebar-accent-foreground": "hsl(220.9, 39.3%, 11%)",
      "--sidebar-border": "hsl(220, 13%, 91%)",
      "--sidebar-ring": "hsl(262.1, 83.3%, 57.8%)",
    },
    dark: {
      "--background": "hsl(224, 71.4%, 4.1%)",
      "--foreground": "hsl(210, 20%, 98%)",
      "--card": "hsl(224, 71.4%, 4.1%)",
      "--card-foreground": "hsl(210, 20%, 98%)",
      "--popover": "hsl(224, 71.4%, 4.1%)",
      "--popover-foreground": "hsl(210, 20%, 98%)",
      "--primary": "hsl(263.4, 70%, 50.4%)",
      "--primary-foreground": "hsl(210, 20%, 98%)",
      "--secondary": "hsl(215, 27.9%, 16.9%)",
      "--secondary-foreground": "hsl(210, 20%, 98%)",
      "--muted": "hsl(215, 27.9%, 16.9%)",
      "--muted-foreground": "hsl(217.9, 10.6%, 64.9%)",
      "--accent": "hsl(215, 27.9%, 16.9%)",
      "--accent-foreground": "hsl(210, 20%, 98%)",
      "--destructive": "hsl(0, 62.8%, 30.6%)",
      "--border": "hsl(215, 27.9%, 16.9%)",
      "--input": "hsl(215, 27.9%, 16.9%)",
      "--ring": "hsl(263.4, 70%, 50.4%)",
      "--chart-1": "hsl(220, 70%, 50%)",
      "--chart-2": "hsl(160, 60%, 45%)",
      "--chart-3": "hsl(30, 80%, 55%)",
      "--chart-4": "hsl(280, 65%, 60%)",
      "--chart-5": "hsl(340, 75%, 55%)",
      "--sidebar": "hsl(224, 71.4%, 4.1%)",
      "--sidebar-foreground": "hsl(210, 20%, 98%)",
      "--sidebar-primary": "hsl(263.4, 70%, 50.4%)",
      "--sidebar-primary-foreground": "hsl(210, 20%, 98%)",
      "--sidebar-accent": "hsl(215, 27.9%, 16.9%)",
      "--sidebar-accent-foreground": "hsl(210, 20%, 98%)",
      "--sidebar-border": "hsl(215, 27.9%, 16.9%)",
      "--sidebar-ring": "hsl(263.4, 70%, 50.4%)",
    },
  },
  {
    name: 'Red',
    root: {
      "--radius": "0.65rem",
      "--background": "hsl(0, 0%, 100%)",
      "--foreground": "hsl(0, 0%, 3.9%)",
      "--card": "hsl(0, 0%, 100%)",
      "--card-foreground": "hsl(0, 0%, 3.9%)",
      "--popover": "hsl(0, 0%, 100%)",
      "--popover-foreground": "hsl(0, 0%, 3.9%)",
      "--primary": "hsl(0, 72.2%, 50.6%)",
      "--primary-foreground": "hsl(0, 85.7%, 97.3%)",
      "--secondary": "hsl(0, 0%, 96.1%)",
      "--secondary-foreground": "hsl(0, 0%, 9%)",
      "--muted": "hsl(0, 0%, 96.1%)",
      "--muted-foreground": "hsl(0, 0%, 45.1%)",
      "--accent": "hsl(0, 0%, 96.1%)",
      "--accent-foreground": "hsl(0, 0%, 9%)",
      "--destructive": "hsl(0, 84.2%, 60.2%)",
      "--border": "hsl(0, 0%, 89.8%)",
      "--input": "hsl(0, 0%, 89.8%)",
      "--ring": "hsl(0, 72.2%, 50.6%)",
      "--chart-1": "hsl(12, 76%, 61%)",
      "--chart-2": "hsl(173, 58%, 39%)",
      "--chart-3": "hsl(197, 37%, 24%)",
      "--chart-4": "hsl(43, 74%, 66%)",
      "--chart-5": "hsl(27, 87%, 67%)",
      "--sidebar": "hsl(0, 0%, 98%)",
      "--sidebar-foreground": "hsl(0, 0%, 3.9%)",
      "--sidebar-primary": "hsl(0, 72.2%, 50.6%)",
      "--sidebar-primary-foreground": "hsl(0, 85.7%, 97.3%)",
      "--sidebar-accent": "hsl(0, 0%, 96.1%)",
      "--sidebar-accent-foreground": "hsl(0, 0%, 9%)",
      "--sidebar-border": "hsl(0, 0%, 89.8%)",
      "--sidebar-ring": "hsl(0, 72.2%, 50.6%)",
    },
    dark: {
      "--background": "hsl(0, 0%, 3.9%)",
      "--foreground": "hsl(0, 0%, 98%)",
      "--card": "hsl(0, 0%, 3.9%)",
      "--card-foreground": "hsl(0, 0%, 98%)",
      "--popover": "hsl(0, 0%, 3.9%)",
      "--popover-foreground": "hsl(0, 0%, 98%)",
      "--primary": "hsl(0, 72.2%, 50.6%)",
      "--primary-foreground": "hsl(0, 85.7%, 97.3%)",
      "--secondary": "hsl(0, 0%, 14.9%)",
      "--secondary-foreground": "hsl(0, 0%, 98%)",
      "--muted": "hsl(0, 0%, 14.9%)",
      "--muted-foreground": "hsl(0, 0%, 63.9%)",
      "--accent": "hsl(0, 0%, 14.9%)",
      "--accent-foreground": "hsl(0, 0%, 98%)",
      "--destructive": "hsl(0, 62.8%, 30.6%)",
      "--border": "hsl(0, 0%, 14.9%)",
      "--input": "hsl(0, 0%, 14.9%)",
      "--ring": "hsl(0, 72.2%, 50.6%)",
      "--chart-1": "hsl(220, 70%, 50%)",
      "--chart-2": "hsl(160, 60%, 45%)",
      "--chart-3": "hsl(30, 80%, 55%)",
      "--chart-4": "hsl(280, 65%, 60%)",
      "--chart-5": "hsl(340, 75%, 55%)",
      "--sidebar": "hsl(0, 0%, 3.9%)",
      "--sidebar-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-primary": "hsl(0, 72.2%, 50.6%)",
      "--sidebar-primary-foreground": "hsl(0, 85.7%, 97.3%)",
      "--sidebar-accent": "hsl(0, 0%, 14.9%)",
      "--sidebar-accent-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-border": "hsl(0, 0%, 14.9%)",
      "--sidebar-ring": "hsl(0, 72.2%, 50.6%)",
    }
  },
]
const initialState: ColorState = {
  availableColors,
  defaultColor: availableColors[0].name,
  userColor: undefined,
}
export const colorStore = create<ColorState>()(
  persist(() => initialState, {
    name: 'colorStore',
  })
)

export default function useColorStore(theme: string = 'light') {
  const colorState = colorStore()
  
  // Use the static availableColors array instead of the one from state
  const getColor = () => {
    console.log('getColor called with state:', {
      userColor: colorState.userColor,
      defaultColor: colorState.defaultColor,
      availableColors: colorState.availableColors.map(c => c.name)
    })
    
    const userColor = availableColors.find(
      (t) => t.name === colorState.userColor
    )
    console.log('Searching for userColor:', colorState.userColor, 'in colors:', availableColors.map(c => `"${c.name}"`))
    if (userColor) {
      console.log('Found userColor:', userColor.name)
      return userColor
    } else if (colorState.userColor) {
      console.log('Could not find userColor:', colorState.userColor)
    }
    
    const defaultColor = availableColors.find(
      (t) => t.name === colorState.defaultColor
    )
    if (defaultColor) {
      console.log('Found defaultColor:', defaultColor.name)
      return defaultColor
    }

    console.log('Falling back to first color:', availableColors[0]?.name)
    return availableColors[0]
  }

  const color = getColor()
  const cssColors: { [key: string]: string } =
    theme === 'light' ? color.root : color.dark
  return {
    availableColors,
    cssColors,
    color,
    getColor,
    setColor: (name: string, isUserColor?: boolean) => {
      console.log('Setting color to:', name, 'isUserColor:', isUserColor)
      console.log('Available colors:', availableColors.map(c => c.name))
      console.log('Current state before update:', colorStore.getState())
      
      colorStore.setState(
        isUserColor ? { userColor: name } : { defaultColor: name }
      )
      
      console.log('Current state after update:', colorStore.getState())
    },
    updateCssVariables: (currentTheme?: string) => {
      const color = getColor()
      const themeToUse = currentTheme || theme
      const colors: { [key: string]: string } =
        themeToUse === 'dark' ? color.dark : color.root
      
      console.log('updateCssVariables called with:', {
        currentTheme,
        theme,
        themeToUse,
        colorName: color.name,
        colorsToApply: Object.keys(colors).length
      })
      
      for (const key in colors) {
        document.documentElement.style.setProperty(key, colors[key])
        console.log(`Setting CSS variable ${key} to ${colors[key]}`)
      }
    },
  }
}