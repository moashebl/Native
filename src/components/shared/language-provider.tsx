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
  const [locale, setLocaleState] = useState('en-US')

  useEffect(() => {
    // Get saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') || 'en-US'
    setLocaleState(savedLocale)
    
    // Set document direction
    if (savedLocale === 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
    }
  }, [])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Update document direction
    if (newLocale === 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
    }
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr'

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
