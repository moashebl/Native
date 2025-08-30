'use client'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log error details for debugging
    console.error('Error caught by error boundary:', error)
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <div className='p-6 rounded-lg shadow-md w-1/3 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Error</h1>
        <p className='text-destructive'>{error.message}</p>
        <details className='mt-4 text-left'>
          <summary className='cursor-pointer text-sm text-gray-600'>Error Details</summary>
          <pre className='mt-2 text-xs text-gray-500 whitespace-pre-wrap'>
            {error.stack}
          </pre>
        </details>
        <Button variant='outline' className='mt-4' onClick={() => reset()}>
          Try again
        </Button>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>
      </div>
    </div>
  )
}