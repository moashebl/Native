import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { LanguageProvider } from '@/components/shared/language-provider'
import { CurrencyProvider } from '@/components/shared/currency-provider'
import ClientProviders from '@/components/shared/client-providers'
import LayoutWrapper from '@/components/shared/layout-wrapper'
import { cookies } from 'next/headers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  // Mock data for now - in a real app, you'd fetch this from your database
  return {
    title: {
      template: `%s | Native House`,
      default: `Native House. Your trusted shopping destination`,
    },
    description: 'Discover quality products at Native House - your trusted shopping destination',
    metadataBase: new URL('https://native-house.com'),
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock setting data for now - in a real app, you'd fetch this from your database
  const setting = {
    common: {
      pageSize: 9,
      isMaintenanceMode: false,
      freeShippingMinPrice: 50,
      defaultTheme: 'light',
      defaultColor: 'gold',
    },
    site: {
      name: 'Native House',
      logo: '/icons/logo.svg',
      slogan: 'Your trusted shopping destination',
      description: 'Discover quality products at Native House',
      keywords: 'shopping, ecommerce, products, native house',
      url: 'https://native-house.com',
              email: 'n8v.store@gmail.com',
      phone: '+1-555-0123',
      author: 'Native House Team',
      copyright: '© 2024 Native House. All rights reserved.',
      address: '123 Main St, City, State 12345',
    },
    availableLanguages: [
      { name: 'English', code: 'en-US' },
      { name: 'العربية', code: 'ar' },
    ],
    carousels: [
      {
        title: 'Welcome to Native House',
        url: '/',
        image: '/images/banner1.jpg',
        buttonCaption: 'Shop Now',
      },
    ],
    defaultLanguage: 'en-US',
    availableCurrencies: [
      { name: 'US Dollar', code: 'USD', convertRate: 1, symbol: '$' },
      { name: 'Euro', code: 'EUR', convertRate: 0.85, symbol: '€' },
      { name: 'Egyptian Pound', code: 'EGP', convertRate: 30.5, symbol: 'EGP' },
    ],
    defaultCurrency: 'USD',
    availablePaymentMethods: [
      { name: 'Credit Card', commission: 2.5 },
      { name: 'PayPal', commission: 3.0 },
      { name: 'Bank Transfer', commission: 1.0 },
    ],
    defaultPaymentMethod: 'Credit Card',
    availableDeliveryDates: [
      { name: 'Standard Delivery', daysToDeliver: 3, shippingPrice: 5.99, freeShippingMinPrice: 50 },
      { name: 'Express Delivery', daysToDeliver: 1, shippingPrice: 15.99, freeShippingMinPrice: 100 },
      { name: 'Free Delivery', daysToDeliver: 5, shippingPrice: 0, freeShippingMinPrice: 0 },
    ],
    defaultDeliveryDate: 'Standard Delivery',
  }
  
  const currencyCookie = (await cookies()).get('currency')
  const currency = currencyCookie ? currencyCookie.value : 'USD'

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <CurrencyProvider>
            <ThemeProvider>
              <ClientProviders setting={{ ...setting, currency }}>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </ClientProviders>
            </ThemeProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
