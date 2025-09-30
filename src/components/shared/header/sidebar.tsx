'use client'

import * as React from 'react'
import Link from 'next/link'
import { X, ChevronRight, UserCircle, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function Sidebar({
  categories,
}: {
  categories: string[]
}) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  
  // Enhanced debug logging
  React.useEffect(() => {
    console.log('Sidebar open state:', open)
    
    // Add event listener to debug click events on mobile
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      console.log('Document clicked:', target.tagName, target.className)
    }
    
    document.addEventListener('click', handleDocumentClick)
    
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [open])
  
  const navigateAndClose = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Navigating to:', href)
    setOpen(false)
    // Navigate after closing; slight delay ensures drawer starts closing animation
    setTimeout(() => {
      router.push(href)
      router.refresh()
    }, 100)
  }

  const handleSignOut = async () => {
    try {
      // Close the drawer immediately on tap
      setOpen(false)

      await signOut({ 
        redirect: false,
        callbackUrl: '/'
      })
      
      toast({
        title: 'Success',
        description: 'Signed out successfully',
      })
      
      // Refresh and redirect after sign-out
      router.refresh()
      router.push('/')
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <button 
        className='sidebar-button z-50 touch-manipulation'
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log('Sidebar trigger clicked')
          setOpen(true)
        }}
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
      >
        <MenuIcon className='h-6 w-6 mr-1' />
        All
      </button>
      
      <Sheet open={open} onOpenChange={(value) => {
        console.log('Sheet onOpenChange called with value:', value)
        setOpen(value)
      }} modal={true}>
      <SheetContent side='left' className='w-[300px] sm:w-[400px] z-[100] fixed inset-y-0 left-0'>
        <div className='flex flex-col h-full'>
          {/* User Sign In Section */}
          <div className='dark bg-gray-800 text-foreground flex items-center justify-between'>
            <SheetHeader>
              <SheetTitle className='flex items-center'>
                <UserCircle className='h-6 w-6 mr-2' />
                {isLoading ? (
                  <span className='text-lg font-semibold'>
                    Loading...
                  </span>
                ) : isAuthenticated ? (
                  <Link href='/account' onClick={navigateAndClose('/account')}>
                    <span className='text-lg font-semibold'>
                      Hello, {session?.user?.name || 'User'}
                    </span>
                  </Link>
                ) : (
                  <Link href='/sign-in' onClick={navigateAndClose('/sign-in')}>
                    <span className='text-lg font-semibold'>
                      Hello, sign in
                    </span>
                  </Link>
                )}
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Button 
              variant='ghost' 
              size='icon' 
              className='mr-2'
              onClick={() => setOpen(false)}
            >
              <X className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>

          {/* Shop By Category */}
          <div className='flex-1 overflow-y-auto'>
            <div className='p-4 border-b'>
              <h2 className='text-lg font-semibold'>
                Shop By Department
              </h2>
            </div>
            <nav className='flex flex-col'>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/search?category=${category}`}
                  className={`flex items-center justify-between item-button`}
                  onClick={navigateAndClose(`/search?category=${encodeURIComponent(category)}`)}
                >
                    <span>{category}</span>
                    <ChevronRight className='h-4 w-4' />
                </Link>
              ))}
            </nav>
          </div>

          {/* Setting and Help */}
          <div className='border-t flex flex-col '>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>
                Help & Settings
              </h2>
            </div>
            <Link href='/account' className='item-button' onClick={navigateAndClose('/account')}>
                Your account
              </Link>
            {' '}
            <Link href='/page/customer-service' className='item-button' onClick={navigateAndClose('/page/customer-service')}>
                Customer Service
              </Link>
            {isLoading ? (
              <div className='item-button text-base text-muted-foreground'>
                Loading...
              </div>
            ) : isAuthenticated ? (
              <Button
                className='w-full justify-start item-button text-base'
                variant='ghost'
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Link href='/sign-in' className='item-button' onClick={navigateAndClose('/sign-in')}>
                  Sign in
                </Link>
                <Link href='/sign-up' className='item-button' onClick={navigateAndClose('/sign-up')}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </>
  )
}