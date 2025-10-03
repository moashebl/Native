'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPassword(token, newPassword)

      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        })
        setTimeout(() => {
          router.push('/sign-in')
        }, 1500)
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

  if (!token) {
    return (
      <Card className='w-full max-w-md mx-auto mt-10'>
        <CardHeader>
          <CardTitle>Invalid Reset Link</CardTitle>
          <CardDescription>
            The password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href='/forgot-password'>
            <Button className='w-full'>Request New Reset Link</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='w-full max-w-md mx-auto mt-10'>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='newPassword' className='block text-sm font-medium mb-2'>
              New Password
            </label>
            <Input
              id='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='Enter new password'
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium mb-2'>
              Confirm Password
            </label>
            <Input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm new password'
              required
              minLength={6}
            />
          </div>
          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? 'Resetting...' : 'Reset Password'}
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
