'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import LanguageSwitcher from './language-switcher'
import ThemeSwitcher from './theme-switcher'
import UserButton from './user-button'

export default function MobileMenu() {
  const siteMenuText = "Site Menu"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <SheetHeader className='w-full'>
          <div className='flex items-center justify-between '>
            <SheetTitle>{siteMenuText}</SheetTitle>
            <SheetDescription></SheetDescription>
          </div>
        </SheetHeader>
        <div className='flex flex-col gap-4 mt-6'>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <UserButton />
        </div>
      </SheetContent>
    </Sheet>
  )
}