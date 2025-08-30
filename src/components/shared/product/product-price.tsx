'use client'

import { useCurrency } from '../currency-provider'
import { cn } from '@/lib/utils'

interface ProductPriceProps {
  price: number
  originalPrice?: number
  discountPercentage?: number
  plain?: boolean
  className?: string
  forListing?: boolean
  isDeal?: boolean
  listPrice?: number
}

export default function ProductPrice({
  price,
  originalPrice,
  discountPercentage,
  plain = false,
  className,
  forListing = true,
  isDeal = false,
  listPrice = 0,
}: ProductPriceProps) {
  const { formatPrice } = useCurrency()

  // Handle plain text display (used in tables, summaries, etc.)
  if (plain) {
    return <span>{formatPrice(price)}</span>
  }

  // Handle deal pricing
  if (isDeal && listPrice > 0) {
    const discountPercent = Math.round(100 - (price / listPrice) * 100)
    return (
      <div className='space-y-2'>
        <div className='flex justify-center items-center gap-2'>
          <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
            {discountPercent}% Off
          </span>
          <span className='text-red-700 text-xs font-bold'>
            Limited time deal
          </span>
        </div>
        <div className={`flex ${forListing ? 'justify-center' : ''} items-center gap-2`}>
          <div className={cn('text-3xl', className)}>
            {formatPrice(price)}
          </div>
          <div className='text-muted-foreground text-xs py-2'>
            Was: <span className='line-through'>{formatPrice(listPrice)}</span>
          </div>
        </div>
      </div>
    )
  }

  // Handle regular pricing with discount
  if (originalPrice && originalPrice > price) {
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <span className={cn('text-3xl font-bold', className)}>{formatPrice(price)}</span>
          {discountPercentage && (
            <span className='bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold'>
              {discountPercentage}% Off
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-gray-500 line-through'>
            Was: {formatPrice(originalPrice)}
          </span>
          {discountPercentage && (
            <span className='text-sm text-gray-600'>Limited time deal</span>
          )}
        </div>
      </div>
    )
  }

  // Default simple price display
  return (
    <div className={cn('text-3xl', className)}>
      {formatPrice(price)}
    </div>
  )
}