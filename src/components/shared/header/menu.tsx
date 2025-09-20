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
import * as React from 'react'
import { usePathname } from 'next/navigation'

export default function MobileMenu() {
  const siteMenuText = "Site Menu"
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // Close the sheet whenever route changes
  React.useEffect(() => {
    if (open) setOpen(false)
  }, [pathname, open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant='ghost' 
          size='icon' 
          className='md:hidden relative z-50' 
          onClick={() => setOpen(true)}
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-[300px] sm:w-[400px] z-[70]'
        onClick={(e) => {
          const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
          if (anchor && (anchor.href.includes('/sign-in') || anchor.href.includes('/sign-up') || anchor.href.includes('/account'))) {
            setOpen(false)
          }
        }}
      >
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