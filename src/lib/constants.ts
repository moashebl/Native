export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Native';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'n8v.store@gmail.com'
export const SENDER_NAME = process.env.SENDER_NAME || APP_NAME
export const APP_SLUGAN = process.env.NEXT_PUBLIC_APP_SLUGAN || 'Spend less, save more, high quality';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'The best local brand store in Egypt';
export const APP_KEYWORDS = process.env.NEXT_PUBLIC_APP_KEYWORDS || 'T-shirts, hoodies, Egypt, online shopping';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://native-house.com';
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)
export const FREE_SHIPPING_MIN_PRICE = Number(
    process.env.FREE_SHIPPING_MIN_PRICE || 35
  )
  export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${APP_NAME}. All rights reserved.`
  
  export const AVAILABLE_PAYMENT_METHODS = [
    {
      name: 'Cash On Delivery',
      commission: 0,
      isDefault: true,
    },
  ]
  export const DEFAULT_PAYMENT_METHOD =
    process.env.DEFAULT_PAYMENT_METHOD || 'Cash On Delivery'
  
  export const DEFAULT_DELIVERY_DATE = 'Standard Delivery'
  
  export const AVAILABLE_DELIVERY_DATES = [
    {
      name: 'Express Delivery',
      daysToDeliver: 2,
      shippingPrice: 25,
      freeShippingMinPrice: 200,
    },
    {
      name: 'Standard Delivery',
      daysToDeliver: 3,
      shippingPrice: 15,
      freeShippingMinPrice: 150,
    },
    {
      name: 'Economy Delivery',
      daysToDeliver: 7,
      shippingPrice: 8,
      freeShippingMinPrice: 100,
    },
  ]
  export const USER_ROLES = ['Admin', 'User']
  export const MAIN_ADMIN_EMAIL = 'mohamed.alaashebl5@gmail.com'

export const COLORS = ['Gold', 'Violet', 'Red']
export const THEMES = ['Light', 'Dark', 'System']