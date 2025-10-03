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
          className='md:hidden relative z-[100] !pointer-events-auto hover:bg-primary/10 transition-colors'
          onClick={() => {
            setOpen(true)
          }}
          style={{
            touchAction: 'manipulation',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          <Menu className='h-6 w-6 text-foreground' strokeWidth={2} />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-[300px] sm:w-[400px] z-[200] fixed inset-y-0 right-0 bg-background/95 backdrop-blur-xl border-l'
      >
        <SheetHeader className='w-full border-b border-border/50 pb-4'>
          <div className='flex items-center justify-between'>
            <SheetTitle className='text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </div>
        </SheetHeader>
        <div className='flex flex-col gap-6 mt-6 pointer-events-auto relative z-[300]'>
          <div className='space-y-4 pointer-events-auto relative z-[400]'>
            <div className='space-y-3'>
              <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground/80'>Settings</p>
              <div className='flex items-center gap-3 bg-gradient-to-br from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/10 p-3 rounded-xl border border-border/50 shadow-sm'>
                <div className='flex-1 border-r border-border/50 pr-3'>
                  <p className='text-xs font-medium text-muted-foreground/90 mb-2'>Currency</p>
                  <LanguageSwitcher />
                </div>
                <div className='flex-1 pl-1'>
                  <p className='text-xs font-medium text-muted-foreground/90 mb-2'>Theme</p>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
          <div className='border-t border-border/50 pt-5 pointer-events-auto relative z-[400]'>
            <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-4'>Account</p>
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
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3 p-3 bg-gradient-to-br from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded-xl border border-border/50 shadow-sm'>
        <div className='flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/15 ring-1 ring-primary/20'>
          <UserCircle className='h-6 w-6 text-primary' strokeWidth={2.5} />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold'>
            Hello, {session ? session.user.name : 'Guest'}
          </span>
          <span className='text-xs text-muted-foreground/80'>Account & Orders</span>
        </div>
      </div>

      {isLoading ? (
        <div className='text-sm text-muted-foreground p-3'>
          Loading...
        </div>
      ) : isAuthenticated ? (
        <div className='flex flex-col gap-1.5'>
          <Button
            variant='ghost'
            className='justify-start h-auto py-2.5 px-3 hover:bg-muted/80 dark:hover:bg-muted/50 transition-colors rounded-lg'
            onClick={() => onNavigate('/account')}
          >
            Your account
          </Button>
          <Button
            variant='ghost'
            className='justify-start h-auto py-2.5 px-3 hover:bg-muted/80 dark:hover:bg-muted/50 transition-colors rounded-lg'
            onClick={() => onNavigate('/account/orders')}
          >
            Your orders
          </Button>
          {session?.user?.role === 'Admin' && (
            <Button
              variant='ghost'
              className='justify-start h-auto py-2.5 px-3 hover:bg-muted/80 dark:hover:bg-muted/50 transition-colors rounded-lg'
              onClick={() => onNavigate('/admin/overview')}
            >
              Admin
            </Button>
          )}
          <div className='border-t border-border/50 mt-2 pt-2'>
            <Button
              variant='ghost'
              className='justify-start h-auto py-2.5 px-3 w-full text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive transition-colors rounded-lg'
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <Button
            variant='default'
            className='justify-start h-auto py-3 px-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-md rounded-lg'
            onClick={() => onNavigate('/sign-in')}
          >
            Sign in
          </Button>
          <Button
            variant='outline'
            className='justify-start h-auto py-3 px-3 border-border/50 hover:bg-muted/50 dark:hover:bg-muted/30 rounded-lg'
            onClick={() => onNavigate('/sign-up')}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  )
}