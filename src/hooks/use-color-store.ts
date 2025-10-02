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
      "--background": "hsl(222, 84%, 4.9%)",
      "--foreground": "hsl(210, 40%, 98%)",
      "--card": "hsl(222, 84%, 6.5%)",
      "--card-foreground": "hsl(210, 40%, 98%)",
      "--popover": "hsl(222, 84%, 6.5%)",
      "--popover-foreground": "hsl(210, 40%, 98%)",
      "--primary": "hsl(47, 96%, 53%)",
      "--primary-foreground": "hsl(222, 84%, 4.9%)",
      "--secondary": "hsl(217, 32%, 17%)",
      "--secondary-foreground": "hsl(210, 40%, 98%)",
      "--muted": "hsl(217, 32%, 17%)",
      "--muted-foreground": "hsl(215, 20%, 65%)",
      "--accent": "hsl(217, 32%, 17%)",
      "--accent-foreground": "hsl(210, 40%, 98%)",
      "--destructive": "hsl(0, 84%, 60%)",
      "--destructive-foreground": "hsl(210, 40%, 98%)",
      "--border": "hsl(217, 32%, 17%)",
      "--input": "hsl(217, 32%, 17%)",
      "--ring": "hsl(47, 96%, 53%)",
      "--chart-1": "hsl(220, 70%, 50%)",
      "--chart-2": "hsl(160, 60%, 45%)",
      "--chart-3": "hsl(30, 80%, 55%)",
      "--chart-4": "hsl(280, 65%, 60%)",
      "--chart-5": "hsl(340, 75%, 55%)",
      "--sidebar": "hsl(222, 84%, 4.9%)",
      "--sidebar-foreground": "hsl(210, 40%, 98%)",
      "--sidebar-primary": "hsl(47, 96%, 53%)",
      "--sidebar-primary-foreground": "hsl(222, 84%, 4.9%)",
      "--sidebar-accent": "hsl(217, 32%, 17%)",
      "--sidebar-accent-foreground": "hsl(210, 40%, 98%)",
      "--sidebar-border": "hsl(217, 32%, 17%)",
      "--sidebar-ring": "hsl(47, 96%, 53%)",
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
      "--background": "hsl(240, 10%, 3.9%)",
      "--foreground": "hsl(0, 0%, 98%)",
      "--card": "hsl(240, 10%, 6%)",
      "--card-foreground": "hsl(0, 0%, 98%)",
      "--popover": "hsl(240, 10%, 6%)",
      "--popover-foreground": "hsl(0, 0%, 98%)",
      "--primary": "hsl(263, 70%, 50%)",
      "--primary-foreground": "hsl(0, 0%, 98%)",
      "--secondary": "hsl(240, 4%, 16%)",
      "--secondary-foreground": "hsl(0, 0%, 98%)",
      "--muted": "hsl(240, 4%, 16%)",
      "--muted-foreground": "hsl(240, 5%, 65%)",
      "--accent": "hsl(240, 4%, 16%)",
      "--accent-foreground": "hsl(0, 0%, 98%)",
      "--destructive": "hsl(0, 63%, 31%)",
      "--destructive-foreground": "hsl(0, 0%, 98%)",
      "--border": "hsl(240, 4%, 16%)",
      "--input": "hsl(240, 4%, 16%)",
      "--ring": "hsl(263, 70%, 50%)",
      "--chart-1": "hsl(220, 70%, 50%)",
      "--chart-2": "hsl(160, 60%, 45%)",
      "--chart-3": "hsl(30, 80%, 55%)",
      "--chart-4": "hsl(280, 65%, 60%)",
      "--chart-5": "hsl(340, 75%, 55%)",
      "--sidebar": "hsl(240, 10%, 3.9%)",
      "--sidebar-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-primary": "hsl(263, 70%, 50%)",
      "--sidebar-primary-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-accent": "hsl(240, 4%, 16%)",
      "--sidebar-accent-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-border": "hsl(240, 4%, 16%)",
      "--sidebar-ring": "hsl(263, 70%, 50%)",
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
      "--background": "hsl(20, 14%, 4%)",
      "--foreground": "hsl(0, 0%, 95%)",
      "--card": "hsl(20, 14%, 6%)",
      "--card-foreground": "hsl(0, 0%, 95%)",
      "--popover": "hsl(20, 14%, 6%)",
      "--popover-foreground": "hsl(0, 0%, 95%)",
      "--primary": "hsl(0, 72%, 51%)",
      "--primary-foreground": "hsl(0, 0%, 98%)",
      "--secondary": "hsl(12, 6%, 15%)",
      "--secondary-foreground": "hsl(0, 0%, 98%)",
      "--muted": "hsl(12, 6%, 15%)",
      "--muted-foreground": "hsl(24, 5%, 64%)",
      "--accent": "hsl(12, 6%, 15%)",
      "--accent-foreground": "hsl(0, 0%, 98%)",
      "--destructive": "hsl(0, 63%, 31%)",
      "--destructive-foreground": "hsl(0, 0%, 98%)",
      "--border": "hsl(12, 6%, 15%)",
      "--input": "hsl(12, 6%, 15%)",
      "--ring": "hsl(0, 72%, 51%)",
      "--chart-1": "hsl(220, 70%, 50%)",
      "--chart-2": "hsl(160, 60%, 45%)",
      "--chart-3": "hsl(30, 80%, 55%)",
      "--chart-4": "hsl(280, 65%, 60%)",
      "--chart-5": "hsl(340, 75%, 55%)",
      "--sidebar": "hsl(20, 14%, 4%)",
      "--sidebar-foreground": "hsl(0, 0%, 95%)",
      "--sidebar-primary": "hsl(0, 72%, 51%)",
      "--sidebar-primary-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-accent": "hsl(12, 6%, 15%)",
      "--sidebar-accent-foreground": "hsl(0, 0%, 98%)",
      "--sidebar-border": "hsl(12, 6%, 15%)",
      "--sidebar-ring": "hsl(0, 72%, 51%)",
    }
  },
  {
    name: 'Slate',
    root: {
      "--radius": "0.65rem",
      "--background": "hsl(0, 0%, 100%)",
      "--foreground": "hsl(222, 84%, 4.9%)",
      "--card": "hsl(0, 0%, 100%)",
      "--card-foreground": "hsl(222, 84%, 4.9%)",
      "--popover": "hsl(0, 0%, 100%)",
      "--popover-foreground": "hsl(222, 84%, 4.9%)",
      "--primary": "hsl(222, 47%, 11%)",
      "--primary-foreground": "hsl(210, 40%, 98%)",
      "--secondary": "hsl(210, 40%, 96%)",
      "--secondary-foreground": "hsl(222, 84%, 4.9%)",
      "--muted": "hsl(210, 40%, 96%)",
      "--muted-foreground": "hsl(215, 16%, 47%)",
      "--accent": "hsl(210, 40%, 96%)",
      "--accent-foreground": "hsl(222, 84%, 4.9%)",
      "--destructive": "hsl(0, 84%, 60%)",
      "--border": "hsl(214, 32%, 91%)",
      "--input": "hsl(214, 32%, 91%)",
      "--ring": "hsl(222, 47%, 11%)",
      "--chart-1": "hsl(12, 76%, 61%)",
      "--chart-2": "hsl(173, 58%, 39%)",
      "--chart-3": "hsl(197, 37%, 24%)",
      "--chart-4": "hsl(43, 74%, 66%)",
      "--chart-5": "hsl(27, 87%, 67%)",
      "--sidebar": "hsl(0, 0%, 98%)",
      "--sidebar-foreground": "hsl(222, 84%, 4.9%)",
      "--sidebar-primary": "hsl(222, 47%, 11%)",
      "--sidebar-primary-foreground": "hsl(210, 40%, 98%)",
      "--sidebar-accent": "hsl(210, 40%, 96%)",
      "--sidebar-accent-foreground": "hsl(222, 84%, 4.9%)",
      "--sidebar-border": "hsl(214, 32%, 91%)",
      "--sidebar-ring": "hsl(222, 47%, 11%)",
    },
    dark: {
      "--background": "hsl(222, 84%, 4.9%)",
      "--foreground": "hsl(210, 40%, 98%)",
      "--card": "hsl(222, 84%, 6.5%)",
      "--card-foreground": "hsl(210, 40%, 98%)",
      "--popover": "hsl(222, 84%, 6.5%)",
      "--popover-foreground": "hsl(210, 40%, 98%)",
      "--primary": "hsl(210, 40%, 98%)",
      "--primary-foreground": "hsl(222, 47%, 11%)",
      "--secondary": "hsl(217, 32%, 17%)",
      "--secondary-foreground": "hsl(210, 40%, 98%)",
      "--muted": "hsl(217, 32%, 17%)",
      "--muted-foreground": "hsl(215, 20%, 65%)",
      "--accent": "hsl(217, 32%, 17%)",
      "--accent-foreground": "hsl(210, 40%, 98%)",
      "--destructive": "hsl(0, 63%, 31%)",
      "--destructive-foreground": "hsl(210, 40%, 98%)",
      "--border": "hsl(217, 32%, 17%)",
      "--input": "hsl(217, 32%, 17%)",
      "--ring": "hsl(212, 72%, 59%)",
      "--chart-1": "hsl(220, 70%, 50%)",
      "--chart-2": "hsl(160, 60%, 45%)",
      "--chart-3": "hsl(30, 80%, 55%)",
      "--chart-4": "hsl(280, 65%, 60%)",
      "--chart-5": "hsl(340, 75%, 55%)",
      "--sidebar": "hsl(222, 84%, 4.9%)",
      "--sidebar-foreground": "hsl(210, 40%, 98%)",
      "--sidebar-primary": "hsl(210, 40%, 98%)",
      "--sidebar-primary-foreground": "hsl(222, 47%, 11%)",
      "--sidebar-accent": "hsl(217, 32%, 17%)",
      "--sidebar-accent-foreground": "hsl(210, 40%, 98%)",
      "--sidebar-border": "hsl(217, 32%, 17%)",
      "--sidebar-ring": "hsl(212, 72%, 59%)",
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
    const userColor = availableColors.find(
      (t) => t.name === colorState.userColor
    )
    if (userColor) {
      return userColor
    }
    
    const defaultColor = availableColors.find(
      (t) => t.name === colorState.defaultColor
    )
    if (defaultColor) {
      return defaultColor
    }

    return availableColors[0]
  }

  const color = getColor()
  const cssColors: { [key: string]: string } =
    theme === 'dark' ? color.dark : color.root
  return {
    availableColors,
    cssColors,
    color,
    getColor,
    setColor: (name: string, isUserColor?: boolean) => {
      colorStore.setState(
        isUserColor ? { userColor: name } : { defaultColor: name }
      )
    },
    updateCssVariables: (currentTheme?: string) => {
      const color = getColor()
      const themeToUse = currentTheme || theme
      
      // Get the appropriate color set based on theme
      const colorVars = themeToUse === 'dark' ? color.dark : color.root
      
      // Update all CSS variables from the color scheme
      for (const [key, value] of Object.entries(colorVars)) {
        document.documentElement.style.setProperty(key, value as string)
      }
      
      console.log('ColorProvider: Applied color variant:', color.name, 'for theme:', themeToUse)
    },
  }
}