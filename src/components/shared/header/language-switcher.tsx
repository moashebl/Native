'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { useLanguage } from '../language-provider'
import { useCurrency } from '../currency-provider'

const languages = [
  { code: 'en-US', name: 'English', icon: '🇺🇸' },
  { code: 'ar', name: 'العربية', icon: '🇸🇦' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const { currency, setCurrency, currencies, isLoading } = useCurrency()

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale)
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency as 'USD' | 'EUR' | 'EGP')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[41px]'>
        <div className='flex items-center gap-1'>
          <span className='text-xl'>
            {languages.find((l) => l.code === locale)?.icon}
          </span>
          {locale === 'ar' ? 'العربية' : 'English'}
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale} onValueChange={handleLanguageChange}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              <div className='flex items-center gap-2'>
                <span className='text-lg'>{lang.icon}</span>
                <span>{lang.name}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={currency} onValueChange={handleCurrencyChange}>
          {currencies.map((currencyInfo) => (
            <DropdownMenuRadioItem key={currencyInfo.code} value={currencyInfo.code}>
              <div className='flex items-center gap-2'>
                <span className='text-lg'>{currencyInfo.flag}</span>
                <span>{currencyInfo.name} ({currencyInfo.code})</span>
                {isLoading && (
                  <span className='text-xs text-gray-500'>Loading...</span>
                )}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
