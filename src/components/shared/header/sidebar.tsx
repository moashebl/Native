'use client'

import * as React from 'react'
import Link from 'next/link'
import { X, ChevronRight, UserCircle, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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
      
      // Force router refresh to update all components
      router.refresh()
      
      // Optional: Redirect to home page
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
    <Drawer direction='left'>
      <DrawerTrigger className='header-button flex items-center !p-2  '>
        <MenuIcon className='h-5 w-5 mr-1' />
        All
      </DrawerTrigger>
      <DrawerContent className='w-[350px] mt-0 top-0'>
        <div className='flex flex-col h-full'>
          {/* User Sign In Section */}
          <div className='dark bg-gray-800 text-foreground flex items-center justify-between  '>
            <DrawerHeader>
              <DrawerTitle className='flex items-center'>
                <UserCircle className='h-6 w-6 mr-2' />
                {isLoading ? (
                  <span className='text-lg font-semibold'>
                    Loading...
                  </span>
                ) : isAuthenticated ? (
                  <DrawerClose asChild>
                    <Link href='/account'>
                      <span className='text-lg font-semibold'>
                        Hello, {session?.user?.name || 'User'}
                      </span>
                    </Link>
                  </DrawerClose>
                ) : (
                  <DrawerClose asChild>
                    <Link href='/sign-in'>
                      <span className='text-lg font-semibold'>
                        Hello, sign in
                      </span>
                    </Link>
                  </DrawerClose>
                )}
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='mr-2'>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close</span>
              </Button>
            </DrawerClose>
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
                <DrawerClose asChild key={category}>
                  <Link
                    href={`/search?category=${category}`}
                    className={`flex items-center justify-between item-button`}
                  >
                    <span>{category}</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </DrawerClose>
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
            <DrawerClose asChild>
              <Link href='/account' className='item-button'>
                Your account
              </Link>
            </DrawerClose>{' '}
            <DrawerClose asChild>
              <Link href='/page/customer-service' className='item-button'>
                Customer Service
              </Link>
            </DrawerClose>
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
              <Link href='/sign-in' className='item-button'>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}