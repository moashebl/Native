'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const hasVerified = useRef(false)

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      
      if (!token) {
        setVerificationStatus('error')
        setMessage('Invalid verification link')
        return
      }

      // Prevent multiple verification attempts
      if (hasVerified.current) {
        return
      }

      hasVerified.current = true

      try {
        console.log('🔍 Attempting to verify email with token:', token.substring(0, 8) + '...')
        
        const response = await fetch(`/api/verify-email?token=${token}`)
        const result = await response.json()

        console.log('✅ Verification API response:', result)

        if (result.success) {
          console.log('🎉 Verification successful, setting success state')
          setVerificationStatus('success')
          setMessage(result.message)
          toast({
            title: 'Success',
            description: 'Email verified successfully!',
          })
          // Don't change status after success - prevent race condition
          return
        } else {
          console.log('❌ Verification failed:', result.message)
          setVerificationStatus('error')
          setMessage(result.message)
          toast({
            title: 'Error',
            description: result.message,
            variant: 'destructive',
          })
        }
      } catch (error) {
        console.error('💥 Verification error:', error)
        setVerificationStatus('error')
        setMessage('Failed to verify email. Please try again.')
        toast({
          title: 'Error',
          description: 'Failed to verify email. Please try again.',
          variant: 'destructive',
        })
      }
    }

    // Add a small delay to prevent race conditions
    const timer = setTimeout(() => {
      verifyEmail()
    }, 100)

    return () => clearTimeout(timer)
  }, [searchParams])

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  const handleResend = async () => {
    try {
      // Get the email from the URL or use a default
      const email = searchParams.get('email') || 'mohamed.alaashebl10@gmail.com'
      
      console.log('🔍 Attempting to resend verification for email:', email)
      
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const result = await response.json()
      console.log('✅ Resend API response:', result)
      
      if (result.success) {
        console.log('🎉 Resend successful')
        toast({
          title: 'Success',
          description: 'Verification email sent successfully! Please check your inbox.',
        })
        setMessage('New verification email sent. Please check your inbox.')
        // Reset to loading state to show the new verification process
        setVerificationStatus('loading')
        // Reset the verification flag for new attempts
        hasVerified.current = false
      } else {
        // Handle specific error cases
        if (result.message === 'Email is already verified') {
          console.log('✅ User already verified, showing success state')
          toast({
            title: 'Already Verified',
            description: 'Your email is already verified. You can now sign in.',
          })
          setMessage('Email already verified. You can sign in.')
          setVerificationStatus('success')
        } else {
          console.log('❌ Resend failed:', result.message)
          toast({
            title: 'Error',
            description: result.message || 'Failed to resend verification email',
            variant: 'destructive',
          })
        }
      }
    } catch (error) {
      console.error('💥 Resend error:', error)
      toast({
        title: 'Error',
        description: 'Failed to resend verification email. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {verificationStatus === 'loading' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
              <p className="text-green-600 font-medium">{message}</p>
              <p className="text-gray-600 text-sm">
                You can now sign in to your account.
              </p>
              <div className="space-y-2">
                <Button onClick={handleSignIn} className="w-full">
                  Sign In
                </Button>
                <Button 
                  onClick={() => router.push('/sign-in')} 
                  variant="outline" 
                  className="w-full"
                >
                  Go to Sign In Page
                </Button>
              </div>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="text-center space-y-4">
              <XCircle className="h-12 w-12 mx-auto text-red-600" />
              <p className="text-red-600 font-medium">{message}</p>
              <p className="text-gray-600 text-sm">
                The verification link may have expired or is invalid.
              </p>
              <div className="space-y-2">
                <Button onClick={handleSignIn} className="w-full">
                  Go to Sign In
                </Button>
                <Button onClick={handleResend} variant="outline" className="w-full">
                  Resend Verification
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
