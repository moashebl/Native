'use client'

import { create } from 'zustand'
import { usePathname } from 'next/navigation'
import useCartStore from './use-cart-store'
import useDeviceType from './use-device-type'

interface CartSidebarState {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useCartSidebar = create<CartSidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export function useCartSidebarVisibility() {
  const pathname = usePathname()
  const deviceType = useDeviceType()
  const { cart } = useCartStore()
  
  // Don't show cart sidebar on these pages
  const excludedPages = ['/cart', '/checkout', '/sign-in', '/sign-up', '/admin']
  const isExcludedPage = excludedPages.some(page => pathname.startsWith(page))
  
  // Only show on desktop and when not on excluded pages
  return cart.items.length > 0 && deviceType === 'desktop' && !isExcludedPage
}

export default useCartSidebar