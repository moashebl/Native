'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { currencies, getAllCurrenciesWithRates, type CurrencyInfo } from '@/lib/currency-api'

type CurrencyCode = keyof typeof currencies

type CurrencyContextType = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  convertPrice: (priceUSD: number) => number
  formatPrice: (priceUSD: number) => string
  getCurrentCurrency: () => CurrencyInfo | null
  currencies: CurrencyInfo[]
  isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD')
  const [currenciesList, setCurrenciesList] = useState<CurrencyInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get saved currency from localStorage
    const savedCurrency = localStorage.getItem('currency') || 'USD'
    if (savedCurrency in currencies) {
      setCurrencyState(savedCurrency as CurrencyCode)
    }

    // Fetch initial exchange rates
    const fetchRates = async () => {
      try {
        setIsLoading(true)
        const currenciesWithRates = await getAllCurrenciesWithRates()
        setCurrenciesList(currenciesWithRates)
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error)
        // Set fallback currencies
        setCurrenciesList([
          { ...currencies.USD, rate: 1 },
          { ...currencies.EUR, rate: 0.85 },
          { ...currencies.EGP, rate: 48.0 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRates()

    // Refresh rates every hour
    const interval = setInterval(fetchRates, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  const convertPrice = (priceUSD: number): number => {
    const currentCurrency = currenciesList.find(c => c.code === currency)
    if (!currentCurrency) return priceUSD
    return priceUSD * currentCurrency.rate
  }

  const formatPrice = (priceUSD: number): string => {
    const convertedPrice = convertPrice(priceUSD)
    const currentCurrency = currenciesList.find(c => c.code === currency)
    
    if (!currentCurrency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      }).format(priceUSD)
    }
    
    // Use custom formatting to avoid browser's automatic symbol conversion
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice)
    
    // Add the custom symbol
    return `${currentCurrency.symbol}${formattedNumber}`
  }

  const getCurrentCurrency = (): CurrencyInfo | null => {
    return currenciesList.find(c => c.code === currency) || null
  }

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      convertPrice, 
      formatPrice, 
      getCurrentCurrency,
      currencies: currenciesList,
      isLoading
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
