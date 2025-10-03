'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestPasswordReset } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await requestPasswordReset(email)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: 'Success',
          description: result.message,
        })
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className='w-full max-w-md mx-auto mt-10'>
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            If an account exists with the email {email}, you will receive a password reset link shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href='/sign-in'>
            <Button className='w-full'>Back to Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='w-full max-w-md mx-auto mt-10'>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email Address
            </label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />
          </div>
          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <div className='text-center'>
            <Link href='/sign-in' className='text-sm text-primary hover:underline'>
              Back to Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
