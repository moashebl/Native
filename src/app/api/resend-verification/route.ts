import { NextRequest, NextResponse } from 'next/server'
import { resendVerificationEmail } from '@/lib/actions/user.actions'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    console.log('🔍 Resend verification requested for email:', email)

    if (!email) {
      console.log('❌ No email provided')
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    const result = await resendVerificationEmail(email)
    console.log('✅ Resend verification result:', result)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('💥 Resend verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
