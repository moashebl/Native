import { NextRequest, NextResponse } from 'next/server'
import { GoogleOAuthSetup } from '@/lib/google-oauth-setup'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (!action) {
      return NextResponse.json({
        success: false,
        message: 'Action parameter is required. Use ?action=setup or ?action=token'
      }, { status: 400 })
    }
    
    if (action === 'setup') {
      // Generate OAuth2 authorization URL
      const clientId = process.env.GOOGLE_CLIENT_ID
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET
      
      if (!clientId || !clientSecret) {
        return NextResponse.json({
          success: false,
          message: 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are required',
          instructions: [
            '1. Add GOOGLE_CLIENT_ID to your .env.local file',
            '2. Add GOOGLE_CLIENT_SECRET to your .env.local file',
            '3. Restart your development server'
          ]
        }, { status: 400 })
      }
      
      const authUrl = GoogleOAuthSetup.generateAuthUrl(clientId, clientSecret)
      
      return NextResponse.json({
        success: true,
        message: 'OAuth2 authorization URL generated',
        authUrl,
        instructions: [
          '1. Visit the authorization URL above',
          '2. Sign in with your Google account',
          '3. Authorize the application',
          '4. Copy the authorization code',
          '5. Use ?action=token&code=YOUR_CODE to exchange for tokens'
        ]
      })
    }
    
    if (action === 'token') {
      // Exchange authorization code for tokens
      const code = searchParams.get('code')
      
      if (!code) {
        return NextResponse.json({
          success: false,
          message: 'Authorization code is required. Use ?action=token&code=YOUR_CODE'
        }, { status: 400 })
      }
      
      const clientId = process.env.GOOGLE_CLIENT_ID
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET
      
      if (!clientId || !clientSecret) {
        return NextResponse.json({
          success: false,
          message: 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are required'
        }, { status: 400 })
      }
      
      try {
        const tokens = await GoogleOAuthSetup.getTokensFromCode(clientId, clientSecret, code)
        
        return NextResponse.json({
          success: true,
          message: 'Tokens obtained successfully',
          tokens,
          nextSteps: [
            '1. Add GOOGLE_REFRESH_TOKEN to your .env.local file',
            '2. Add GOOGLE_ACCESS_TOKEN to your .env.local file',
            '3. Restart your development server',
            '4. Test the email service at /api/test-email'
          ]
        })
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: 'Failed to exchange code for tokens',
          error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action. Use ?action=setup or ?action=token'
    }, { status: 400 })
    
  } catch (error) {
    console.error('OAuth setup error:', error)
    return NextResponse.json(
      { success: false, message: 'OAuth setup failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
