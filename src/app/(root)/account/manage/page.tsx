import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/../auth'
import { isGoogleUser } from '@/lib/actions/user.actions'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PAGE_TITLE = 'Login & Security'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}
export default async function ProfilePage() {
  const session = await auth()
  const isGoogle = await isGoogleUser()
  
  return (
    <div className='mb-24'>
      <SessionProvider session={session}>
        <div className='flex gap-2 '>
          <Link href='/account'>Your Account</Link>
          <span>›</span>
          <span>{PAGE_TITLE}</span>
        </div>
        <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
        <Card className='max-w-2xl '>
          <CardContent className='p-4 flex justify-between flex-wrap'>
            <div>
              <h3 className='font-bold'>Name</h3>
              <p>{session?.user.name}</p>
            </div>
            <div>
              <Link href='/account/manage/name'>
                <Button className='rounded-full w-32' variant='outline'>
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
          <Separator />
          <CardContent className='p-4 flex justify-between flex-wrap'>
            <div>
              <h3 className='font-bold'>Email</h3>
              <p>{session?.user.email}</p>
              {isGoogle ? (
                <div className='flex items-center gap-2 mt-1'>
                  <Badge variant='secondary' className='text-xs'>
                    Signed in with Google
                  </Badge>
                  <span className='text-sm text-muted-foreground'>
                    Email cannot be changed for Google accounts
                  </span>
                </div>
              ) : (
                <p className='text-sm text-muted-foreground mt-1'>
                  You can change your email address
                </p>
              )}
            </div>
            <div>
              {isGoogle ? (
                <Button disabled className='rounded-full w-32' variant='outline'>
                  Cannot Change
                </Button>
              ) : (
                <Link href='/account/manage/email'>
                  <Button className='rounded-full w-32' variant='outline'>
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
          <Separator />
          <CardContent className='p-4 flex justify-between flex-wrap'>
            <div>
              <h3 className='font-bold'>Password</h3>
              <p>************</p>
              {isGoogle ? (
                <div className='flex items-center gap-2 mt-1'>
                  <Badge variant='secondary' className='text-xs'>
                    Signed in with Google
                  </Badge>
                  <span className='text-sm text-muted-foreground'>
                    Password cannot be changed for Google accounts
                  </span>
                </div>
              ) : (
                <p className='text-sm text-muted-foreground mt-1'>
                  You can change your password
                </p>
              )}
            </div>
            <div>
              {isGoogle ? (
                <Button disabled className='rounded-full w-32' variant='outline'>
                  Cannot Change
                </Button>
              ) : (
                <Link href='/account/manage/password'>
                  <Button className='rounded-full w-32' variant='outline'>
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  )
}