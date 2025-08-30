import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'
import { OrderItem, ShippingAddress, DeliveryDate } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function round2(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export function formatDate(dateString: Date | string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(dateString: Date) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  const dateOnly = date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })

  const timeOnly = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  if (diffInDays === 0) {
    return {
      dateTime: 'Today',
      relative: 'Today',
      dateOnly,
      timeOnly,
    }
  } else if (diffInDays === 1) {
    return {
      dateTime: 'Yesterday',
      relative: 'Yesterday',
      dateOnly,
      timeOnly,
    }
  } else if (diffInDays < 7) {
    return {
      dateTime: `${diffInDays} days ago`,
      relative: `${diffInDays} days ago`,
      dateOnly,
      timeOnly,
    }
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return {
      dateTime: `${weeks} week${weeks > 1 ? 's' : ''} ago`,
      relative: `${weeks} week${weeks > 1 ? 's' : ''} ago`,
      dateOnly,
      timeOnly,
    }
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return {
      dateTime: `${months} month${months > 1 ? 's' : ''} ago`,
      relative: `${months} month${months > 1 ? 's' : ''} ago`,
      dateOnly,
      timeOnly,
    }
  } else {
    const years = Math.floor(diffInDays / 365)
    return {
      dateTime: `${years} year${years > 1 ? 's' : ''} ago`,
      relative: `${years} year${years > 1 ? 's' : ''} ago`,
      dateOnly,
      timeOnly,
    }
  }
}

export function formatFullDateTime(dateString: Date) {
  const date = new Date(dateString)
  
  const fullDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  
  const fullTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })
  
  return {
    fullDateTime: `${fullDate} at ${fullTime}`,
    fullDate,
    fullTime,
    dateOnly: date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    }),
    timeOnly: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  }
}

export function getMonthName(monthNumber: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return months[parseInt(monthNumber) - 1] || monthNumber
}

export function formatId(id: string) {
  return id.slice(-6).toUpperCase()
}

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string
  key: string
  value: string | null
}) {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const generateId = () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join('')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
  if (error.name === 'ZodError') {
    const fieldErrors = error.issues.map((issue: { path: string[]; message: string }) => {
      const fieldPath = issue.path.join('.')
      return `${fieldPath}: ${issue.message}`
    })
    return fieldErrors.join('. ')
  } else if (error.name === 'ValidationError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return errorMessage
    })
    return fieldErrors.join('. ')
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0]
    return `${duplicateField} already exists`
  } else {
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}

export function calculateFutureDate(days: number) {
  const currentDate = new Date()
  console.log('calculateFutureDate called with days:', days)
  console.log('Current date before calculation:', currentDate.toISOString())
  
  // Use a more reliable method to add days
  const futureDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000))
  
  console.log('Future date after calculation:', futureDate.toISOString())
  console.log('Time difference in milliseconds:', futureDate.getTime() - currentDate.getTime())
  console.log('Time difference in days:', (futureDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000))
  
  return futureDate
}

export function calculatePastDate(days: number) {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - days)
  return currentDate
}

export function timeUntilMidnight(): { hours: number; minutes: number } {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)

  const diff = midnight.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return { hours, minutes }
}

export const calcDeliveryDateAndPrice = ({
  items,
  shippingAddress,
  deliveryDateIndex,
  availableDeliveryDates,
}: {
  deliveryDateIndex?: number
  items: OrderItem[]
  shippingAddress?: ShippingAddress
  availableDeliveryDates: DeliveryDate[]
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )

  const deliveryDate =
    availableDeliveryDates[
      deliveryDateIndex === undefined
        ? availableDeliveryDates.length - 1
        : deliveryDateIndex
    ]
  
  console.log('Selected delivery date index:', deliveryDateIndex)
  console.log('Available delivery dates:', availableDeliveryDates)
  console.log('Selected delivery date:', deliveryDate)
  console.log('Days to deliver:', deliveryDate?.daysToDeliver)

  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
      ? 0  // Free shipping only for this specific delivery option
      : deliveryDate.shippingPrice

  console.log('Items price:', itemsPrice)
  console.log('Delivery option:', deliveryDate?.name)
  console.log('Free shipping threshold:', deliveryDate?.freeShippingMinPrice)
  console.log('Shipping price calculated:', shippingPrice)

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.15)

  const totalPrice = round2(
    itemsPrice +
      (shippingPrice ? round2(shippingPrice) : 0) +
      (taxPrice ? round2(taxPrice) : 0)
  )
  
  return {
    availableDeliveryDates,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? availableDeliveryDates.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    expectedDeliveryDate: deliveryDate ? calculateFutureDate(deliveryDate.daysToDeliver) : undefined,
  }
}

export const getFilterUrl = ({
  params,
  category,
  tag,
  sort,
  price,
  rating,
  page,
}: {
  params: {
    q?: string
    category?: string
    tag?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }
  tag?: string
  category?: string
  sort?: string
  price?: string
  rating?: string
  page?: string
}) => {
  const newParams = { ...params }
  if (category) newParams.category = category
  if (tag) newParams.tag = toSlug(tag)
  if (price) newParams.price = price
  if (rating) newParams.rating = rating
  if (page) newParams.page = page
  if (sort) newParams.sort = sort
  return `/search?${new URLSearchParams(newParams).toString()}`
}