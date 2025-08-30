import { NextRequest, NextResponse } from 'next/server'
import { verifyEmail } from '@/lib/actions/user.actions'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/db/models/user.model'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    console.log('🔍 Verification API called with token:', token ? `${token.substring(0, 8)}...` : 'none')

    if (!token) {
      console.log('❌ No token provided')
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      )
    }

    // First check if token is still valid
    await connectToDatabase()
    const existingUser = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() }
    })

    if (!existingUser) {
      console.log('❌ Token not found or expired before verification')
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    console.log('✅ Token found, proceeding with verification')

    const result = await verifyEmail(token)
    console.log('✅ Verification result:', result)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('💥 Email verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
