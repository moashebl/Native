'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { useCurrency } from '../currency-provider'

export default function LanguageSwitcher() {
  const { currency, setCurrency, currencies, isLoading } = useCurrency()

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency as 'USD' | 'EUR' | 'EGP')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[34px] md:h-[41px]'>
        <div className='flex items-center gap-1'>
          <span className='text-lg'>💱</span>
          Currency
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 z-[500]' sideOffset={6}>
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
