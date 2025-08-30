'use client'

import React from 'react'
import Link from 'next/link'

import { ChevronUp } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useCurrency } from './currency-provider'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import HydrationWrapper from './hydration-wrapper'

// Client-side footer content
function ClientFooterContent() {
  const {
    currency,
    setCurrency,
    currencies,
    isLoading
  } = useCurrency()

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto'>
        <div>
          <h3 className='font-bold mb-2'>Get to Know Us</h3>
          <ul className='space-y-2'>
            <li>
              <Link href='/page/careers'>Careers</Link>
            </li>
            <li>
              <Link href='/page/blog'>Blog</Link>
            </li>
            <li>
              <Link href='/page/about-us'>
                About Native House
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2'>Make Money with Us</h3>
          <ul className='space-y-2'>
            <li>
              <Link href='/page/sell'>
                Sell products on Native House
              </Link>
            </li>
            <li>
              <Link href='/page/become-affiliate'>
                Become an Affiliate
              </Link>
            </li>
            <li>
              <Link href='/page/advertise'>
                Advertise Your Products
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold mb-2'>Let Us Help You</h3>
          <ul className='space-y-2'>
            <li>
              <Link href='/page/shipping'>
                Shipping Rates & Policies
              </Link>
            </li>
            <li>
              <Link href='/page/returns-policy'>
                Returns & Replacements
              </Link>
            </li>
            <li>
              <Link href='/page/help'>Help</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='border-t border-border'>
        <div className='max-w-7xl mx-auto py-8 px-4 flex flex-col items-center space-y-4'>
          <div className='flex items-center space-x-4 flex-wrap md:flex-nowrap'>
            <Image
              src='/icons/logo.svg'
              alt='Native House logo'
              width={48}
              height={48}
              className='w-14'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />{' '}
            <Select
              value={currency}
              onValueChange={(value) => {
                setCurrency(value as 'USD' | 'EUR' | 'EGP')
                window.scrollTo(0, 0)
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? 'Loading...' : 'Select a currency'} />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currencyInfo) => (
                  <SelectItem key={currencyInfo.code} value={currencyInfo.code}>
                    {currencyInfo.flag} {currencyInfo.name} ({currencyInfo.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='p-4'>
        <div className='flex justify-center gap-3 text-sm'>
          <Link href='/page/conditions-of-use'>
            Conditions of Use
          </Link>
          <Link href='/page/privacy-policy'>Privacy Notice</Link>
          <Link href='/page/help'>Help</Link>
        </div>
        <div className='flex justify-center text-sm'>
          <p> © Native House</p>
        </div>
        <div className='mt-8 flex justify-center text-sm text-muted-foreground'>
          Native House | +123-456-7890
        </div>
      </div>
    </>
  )
}

export default function Footer() {
  // Simple fallback footer for SSR
  const fallbackFooter = (
    <div className='p-4 text-center'>
      <div className='flex justify-center gap-3 text-sm mb-4'>
        <Link href='/page/conditions-of-use'>Conditions of Use</Link>
        <Link href='/page/privacy-policy'>Privacy Notice</Link>
        <Link href='/page/help'>Help</Link>
      </div>
      <p className='text-sm'>© 2024 Native House</p>
    </div>
  )

  return (
    <footer className='bg-background border-t border-border text-foreground'>
      <div className='w-full'>
        <Button
          variant='ghost'
          className='bg-muted/50 w-full rounded-none hover:bg-muted'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className='mr-2 h-4 w-4' />
          Back to top
        </Button>
      </div>
      <HydrationWrapper fallback={fallbackFooter}>
        <ClientFooterContent />
      </HydrationWrapper>
    </footer>
  )
}