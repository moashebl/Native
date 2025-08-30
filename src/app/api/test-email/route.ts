import { NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'

export async function POST() {
  try {
    console.log('Testing email connection...')
    
    // Test the email connection
    const connectionTest = await emailService.testConnection()
    console.log('Email connection test result:', connectionTest)
    
    if (!connectionTest) {
      return NextResponse.json(
        { success: false, message: 'Email connection failed' },
        { status: 500 }
      )
    }

    // Test email template rendering
    try {
      console.log('Testing email template rendering...')
      const { render } = await import('@react-email/render')
      const { default: VerificationEmail } = await import('@/emails/verification-email')
      
      const emailHtml = await render(
        VerificationEmail({
          userName: 'Test User',
          verificationToken: 'test-token-123',
          siteName: 'Native House',
        })
      )
      
      console.log('Email template rendered successfully, length:', emailHtml.length)
      
      return NextResponse.json({
        success: true,
        message: 'Email test completed successfully',
        connectionTest: true,
        templateRender: true,
        emailLength: emailHtml.length
      })
    } catch (templateError) {
      console.error('Email template rendering failed:', templateError)
      return NextResponse.json({
        success: false,
        message: 'Email template rendering failed',
        connectionTest: true,
        templateRender: false,
        error: templateError instanceof Error ? templateError.message : 'Unknown error'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json(
      { success: false, message: 'Email test failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
