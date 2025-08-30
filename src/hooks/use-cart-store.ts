import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Cart, OrderItem, ShippingAddress } from '@/types'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'
import { getSetting } from '@/lib/actions/setting.actions'

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,
}

interface CartState {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string>
  updateItem: (item: OrderItem, quantity: number) => Promise<void>
  removeItem: (item: OrderItem) => Promise<void>
  clearCart: () => void
  setShippingAddress: (shippingAddress: ShippingAddress) => Promise<void>
  setPaymentMethod: (paymentMethod: string) => void
  setDeliveryDateIndex: (index: number) => Promise<void>
  init: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,

      addItem: async (item: OrderItem, quantity: number) => {
        const { items } = get().cart
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )

        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Not enough items in stock')
          }
        } else {
          if (item.countInStock < quantity) {
            throw new Error('Not enough items in stock')
          }
        }

        const updatedCartItems = existItem
          ? items.map((x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x
            )
          : [...items, { ...item, quantity }]

        const { availableDeliveryDates } = await getSetting()
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress: get().cart.shippingAddress,
              deliveryDateIndex: get().cart.deliveryDateIndex,
              availableDeliveryDates,
            })),
          },
        })
        const foundItem = updatedCartItems.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
          )
          if (!foundItem) {
            throw new Error('Item not found in cart')
          }
          return foundItem.clientId
      },

      updateItem: async (item: OrderItem, quantity: number) => {
        const { items } = get().cart
        const exist = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )
        if (!exist) return
        const updatedCartItems = items.map((x) =>
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...exist, quantity: quantity }
            : x
        )
        const { availableDeliveryDates } = await getSetting()
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress: get().cart.shippingAddress,
              deliveryDateIndex: get().cart.deliveryDateIndex,
              availableDeliveryDates,
            })),
          },
        })
      },
      
      removeItem: async (item: OrderItem) => {
        const { items } = get().cart
        const updatedCartItems = items.filter(
          (x) =>
            x.product !== item.product ||
            x.color !== item.color ||
            x.size !== item.size
        )
        const { availableDeliveryDates } = await getSetting()
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress: get().cart.shippingAddress,
              deliveryDateIndex: get().cart.deliveryDateIndex,
              availableDeliveryDates,
            })),
          },
        })
      },

      clearCart: () => {
        set({ cart: initialState })
      },

      setShippingAddress: async (shippingAddress: ShippingAddress) => {
        const { availableDeliveryDates } = await getSetting()
        set({
          cart: {
            ...get().cart,
            shippingAddress,
            ...(await calcDeliveryDateAndPrice({
              items: get().cart.items,
              shippingAddress,
              deliveryDateIndex: get().cart.deliveryDateIndex,
              availableDeliveryDates,
            })),
          },
        })
      },

      setPaymentMethod: (paymentMethod: string) => {
        set({
          cart: {
            ...get().cart,
            paymentMethod,
          },
        })
      },

      setDeliveryDateIndex: async (index: number) => {
        const { availableDeliveryDates } = await getSetting()
        set({
          cart: {
            ...get().cart,
            ...(await calcDeliveryDateAndPrice({
              items: get().cart.items,
              shippingAddress: get().cart.shippingAddress,
              deliveryDateIndex: index,
              availableDeliveryDates,
            })),
          },
        })
      },

      init: () => set({ cart: initialState }),
    }),
    {
      name: 'cart-store',
    }
  )
)
export default useCartStore