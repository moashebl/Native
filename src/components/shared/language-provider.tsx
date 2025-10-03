'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type TranslationKey } from '@/lib/translations'

type LanguageContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  direction: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale] = useState('en-US')

  useEffect(() => {
    // Always force English and LTR
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
    // Clear any old Arabic setting
    localStorage.removeItem('locale')
  }, [])

  const setLocale = () => {
    // Disabled - English only
  }

  const direction = 'ltr' as const

  // Translation function that uses the translations file
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const translation = translations[locale as keyof typeof translations]?.[key] || 
                      translations['en-US'][key] || 
                      key
    
    if (params) {
      return Object.entries(params).reduce((text, [param, value]) => {
        return text.replace(`{${param}}`, String(value))
      }, translation)
    }
    
    return translation
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, direction }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
