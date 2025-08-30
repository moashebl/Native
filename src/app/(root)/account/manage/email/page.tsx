import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/../auth'
import EmailForm from './email-form'

const PAGE_TITLE = 'Change Email'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

export default async function EmailPage() {
  const session = await auth()
  
  return (
    <div className='mb-24'>
      <SessionProvider session={session}>
        <div className='flex gap-2 '>
          <a href='/account'>Your Account</a>
          <span>›</span>
          <a href='/account/manage'>Login & Security</a>
          <span>›</span>
          <span>{PAGE_TITLE}</span>
        </div>
        <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
        <EmailForm />
      </SessionProvider>
    </div>
  )
}
