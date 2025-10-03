'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const links = [
  {
    title: 'Overview',
    href: '/admin/overview',
  },
  {
    title: 'Products',
    href: '/admin/products',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
  {
    title: 'Pages',
    href: '/admin/web-pages',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
  },
]
export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        'flex items-center gap-1 md:gap-2',
        className
      )}
      {...props}
    >
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
            pathname.includes(item.href)
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}