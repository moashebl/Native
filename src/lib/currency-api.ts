// Free currency API endpoints
const CURRENCY_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'
const BACKUP_API_URL = 'https://open.er-api.com/v6/latest/USD'

export interface CurrencyRates {
  USD: number
  EUR: number
  EGP: number
  [key: string]: number
}

export interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  flag: string
  rate: number
}

export const currencies: Record<string, Omit<CurrencyInfo, 'rate'>> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
  },
  EGP: {
    code: 'EGP',
    symbol: 'EGP',
    name: 'Egyptian Pound',
    flag: '🇪🇬',
  },
}

// Cache for exchange rates (refresh every hour)
let ratesCache: CurrencyRates | null = null
let lastFetch: number = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export async function fetchExchangeRates(): Promise<CurrencyRates> {
  const now = Date.now()
  
  // Return cached rates if still valid
  if (ratesCache && (now - lastFetch) < CACHE_DURATION) {
    return ratesCache
  }

  try {
    // Try primary API first
    const response = await fetch(CURRENCY_API_URL)
    if (response.ok) {
      const data = await response.json()
      const rates: CurrencyRates = {
        USD: 1,
        EUR: data.rates.EUR || 0.85,
        EGP: data.rates.EGP || 48.0,
      }
      
      // Update cache
      ratesCache = rates
      lastFetch = now
      return rates
    }
  } catch (error) {
    console.warn('Primary currency API failed, trying backup:', error)
  }

  try {
    // Try backup API
    const response = await fetch(BACKUP_API_URL)
    if (response.ok) {
      const data = await response.json()
      const rates: CurrencyRates = {
        USD: 1,
        EUR: data.rates.EUR || 0.85,
        EGP: data.rates.EGP || 48.0,
      }
      
      // Update cache
      ratesCache = rates
      lastFetch = now
      return rates
    }
  } catch (error) {
    console.warn('Backup currency API failed, using fallback rates:', error)
  }

  // Fallback to default rates if both APIs fail
  const fallbackRates: CurrencyRates = {
    USD: 1,
    EUR: 0.85,
    EGP: 48.0,
  }
  
  // Update cache with fallback
  ratesCache = fallbackRates
  lastFetch = now
  return fallbackRates
}

export async function getCurrencyWithRate(code: string): Promise<CurrencyInfo | null> {
  if (!currencies[code]) return null
  
  const rates = await fetchExchangeRates()
  const rate = rates[code] || 1
  
  return {
    ...currencies[code],
    rate,
  }
}

export async function getAllCurrenciesWithRates(): Promise<CurrencyInfo[]> {
  const rates = await fetchExchangeRates()
  
  return Object.keys(currencies).map(code => ({
    ...currencies[code],
    rate: rates[code] || 1,
  }))
}

export async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
  const rates = await fetchExchangeRates()
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / rates[fromCurrency]
  return usdAmount * rates[toCurrency]
}
