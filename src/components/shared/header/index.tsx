'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MobileMenu from './menu'
import Sidebar from './sidebar'
import data from '@/lib/data'
import Search from './search'
import LanguageSwitcher from './language-switcher'
import ThemeSwitcher from './theme-switcher'
import UserButton from './user-button'
import CartButton from './cart-button'
import { getAllCategories } from '@/lib/actions/product.actions'

interface WebPage {
  slug: string
  title: string
}

export default function Header() {
  const [categories, setCategories] = useState<string[]>([])
  const publishedWebPages: WebPage[] = [
    { slug: 'about-us', title: 'About Us' },
    { slug: 'help', title: 'Help' },
    { slug: 'contact', title: 'Contact' },
  ]
  const existingHrefs = new Set(data.headerMenus.map((m) => m.href))

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Set empty array if fetch fails - only show actual categories
        setCategories([])
      }
    }
    
    fetchCategories()
  }, [])
  
  return (
    <header className='bg-background border-b border-border text-foreground shadow-sm'>
      <div className='px-4 py-0'>
        <div className='flex items-center justify-between relative z-10'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center m-0 p-0 -my-2'
            >
              <Image
                src='/icons/logo.svg'
                width={90}
                height={90}
                alt='Native House logo'
                className='filter brightness-100 transition-all duration-300'
              />
            </Link>
          </div>
          <div className='hidden md:block flex-1 max-w-xl'>
            <Search categories={categories} />
          </div>
          <nav className='md:flex gap-3 hidden items-center'>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </nav>
          <MobileMenu />
        </div>
        <div className='md:hidden block py-3'>
          <Search categories={categories} />
        </div>
      </div>
      <div className='flex items-center px-4 py-2 bg-muted/30 border-t border-border/50 relative z-30'>
        <div className='relative z-40 flex items-center'>
          <Sidebar categories={categories} />
        </div>

        <div className='flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide'>
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className='header-button !py-1 !px-2 md:!py-1.5 md:!px-3 text-sm font-medium hover:bg-background/80 rounded-md transition-colors whitespace-nowrap flex-shrink-0'
            >
              {menu.name}
            </Link>
          ))}
          {publishedWebPages.map((page: WebPage) => {
            const href = `/page/${page.slug}`
            if (existingHrefs.has(href)) return null
            return (
              <Link href={href} key={href} className='header-button !py-1 !px-2 md:!py-1.5 md:!px-3 text-sm font-medium hover:bg-background/80 rounded-md transition-colors whitespace-nowrap flex-shrink-0'>
                {page.title}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}