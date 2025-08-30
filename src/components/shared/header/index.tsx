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
        // Fallback to some default categories if fetch fails
        setCategories(['T-Shirts', 'Jeans', 'Shoes', 'Watches', 'Electronics', 'Home'])
      }
    }
    
    fetchCategories()
  }, [])
  
  return (
    <header className='bg-background border-b border-border text-foreground'>
      <div className='px-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center header-button m-1'
            >
              <Image
                src='/icons/logo.svg'
                width={64}
                height={64}
                alt='Native House logo'
                className='filter brightness-100 transition-all duration-300'
              />
            </Link>
          </div>
          <div className='hidden md:block flex-1 max-w-xl'>
            <Search />
          </div>
          <nav className='md:flex gap-3 hidden items-center'>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </nav>
          <MobileMenu />
        </div>
        <div className='md:hidden block py-2'>
          <Search />
        </div>
      </div>
      <div className='flex items-center px-3 mb-[1px] bg-muted/50 border-b border-border'>
        <Sidebar categories={categories} />

        <div className='flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]'>
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className='header-button !p-2'
            >
              {menu.name}
            </Link>
          ))}
          {publishedWebPages.map((page: WebPage) => {
            const href = `/page/${page.slug}`
            if (existingHrefs.has(href)) return null
            return (
              <Link href={href} key={href} className='header-button !p-2'>
                {page.title}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}