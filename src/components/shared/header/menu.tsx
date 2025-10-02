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
import { Menu, UserCircle } from 'lucide-react'
import LanguageSwitcher from './language-switcher'
import ThemeSwitcher from './theme-switcher'
import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'

export default function MobileMenu() {
  const siteMenuText = "Site Menu"
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const prevPathnameRef = React.useRef(pathname)

  // Force close menu and clean up any overlay issues
  const forceCloseMenu = React.useCallback(() => {
    setOpen(false)
    // Clean up any lingering overlay effects
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto'
      document.body.style.overflow = 'auto'
    }, 100)
  }, [])

  // Close the sheet whenever route changes
  React.useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      forceCloseMenu()
    }
    prevPathnameRef.current = pathname
  }, [pathname, forceCloseMenu])

  // Handle navigation with proper cleanup
  const handleNavigation = React.useCallback((href: string) => {
    forceCloseMenu()
    setTimeout(() => {
      router.push(href)
      router.refresh()
    }, 150)
  }, [router, forceCloseMenu])


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant='ghost' 
          size='icon' 
          className='md:hidden relative z-[100] !pointer-events-auto' 
          onClick={() => {
            setOpen(true)
          }}
          style={{ 
            touchAction: 'manipulation',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-[300px] sm:w-[400px] z-[200] fixed inset-y-0 right-0'
      >
        <SheetHeader className='w-full'>
          <div className='flex items-center justify-between '>
            <SheetTitle>{siteMenuText}</SheetTitle>
            <SheetDescription></SheetDescription>
          </div>
        </SheetHeader>
        <div className='flex flex-col gap-4 mt-6 pointer-events-auto relative z-[300]'>
          <div className='pointer-events-auto relative z-[400]'>
            <LanguageSwitcher />
          </div>
          <div className='pointer-events-auto relative z-[400]'>
            <ThemeSwitcher />
          </div>
          <div className='pointer-events-auto relative z-[400]'>
            <MobileUserButton onNavigate={handleNavigation} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Mobile-specific UserButton component with proper navigation handling
function MobileUserButton({ onNavigate }: { onNavigate: (href: string) => void }) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: '/'
      })
      
      toast({
        title: 'Success',
        description: 'Signed out successfully',
      })
      
      onNavigate('/')
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2 p-2 border rounded-md'>
        <UserCircle className='h-5 w-5' />
        <div className='flex flex-col'>
          <span className='text-sm'>
            Hello,{' '}
            {session ? session.user.name : 'sign in'}
          </span>
          <span className='text-xs font-bold'>Account & Orders</span>
        </div>
      </div>
      
      {isLoading ? (
        <div className='text-sm text-muted-foreground p-2'>
          Loading...
        </div>
      ) : isAuthenticated ? (
        <div className='flex flex-col gap-1'>
          <Button
            variant='ghost'
            className='justify-start h-auto p-2'
            onClick={() => onNavigate('/account')}
          >
            Your account
          </Button>
          <Button
            variant='ghost'
            className='justify-start h-auto p-2'
            onClick={() => onNavigate('/account/orders')}
          >
            Your orders
          </Button>
          {session?.user?.role === 'Admin' && (
            <Button
              variant='ghost'
              className='justify-start h-auto p-2'
              onClick={() => onNavigate('/admin/overview')}
            >
              Admin
            </Button>
          )}
          <Button
            variant='ghost'
            className='justify-start h-auto p-2'
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-1'>
          <Button
            variant='default'
            className='justify-start h-auto p-2'
            onClick={() => onNavigate('/sign-in')}
          >
            Sign in
          </Button>
          <Button
            variant='outline'
            className='justify-start h-auto p-2'
            onClick={() => onNavigate('/sign-up')}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  )
}