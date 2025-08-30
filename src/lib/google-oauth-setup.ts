// import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

// Google OAuth2 setup helper
export class GoogleOAuthSetup {
  private static readonly SCOPES = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.compose'
  ]

  // Generate OAuth2 URL for user to authorize
  static generateAuthUrl(clientId: string, clientSecret: string): string {
    const oauth2Client = new OAuth2Client(clientId, clientSecret, 'urn:ietf:wg:oauth:2.0:oob')
    
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES,
      prompt: 'consent'
    })
    
    return authUrl
  }

  // Exchange authorization code for tokens
  static async getTokensFromCode(
    clientId: string, 
    clientSecret: string, 
    code: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const oauth2Client = new OAuth2Client(clientId, clientSecret, 'urn:ietf:wg:oauth:2.0:oob')
    
    const { tokens } = await oauth2Client.getToken(code)
    
    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Failed to get access token or refresh token')
    }
    
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    }
  }

  // Refresh access token using refresh token
  static async refreshAccessToken(
    clientId: string, 
    clientSecret: string, 
    refreshToken: string
  ): Promise<string> {
    const oauth2Client = new OAuth2Client(clientId, clientSecret, 'urn:ietf:wg:oauth:2.0:oob')
    oauth2Client.setCredentials({ refresh_token: refreshToken })
    
    const { credentials } = await oauth2Client.refreshAccessToken()
    
    if (!credentials.access_token) {
      throw new Error('Failed to refresh access token')
    }
    
    return credentials.access_token
  }
}

// Instructions for setting up OAuth2
export const OAUTH2_SETUP_INSTRUCTIONS = `
# Google OAuth2 Setup Instructions

## Step 1: Get Your OAuth2 Credentials
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Find your OAuth2 client ID and secret

## Step 2: Set Environment Variables
Add these to your .env.local file:
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

## Step 3: Get Authorization Code
1. Visit the OAuth2 authorization URL (will be generated)
2. Authorize your application
3. Copy the authorization code

## Step 4: Exchange Code for Tokens
Use the authorization code to get access and refresh tokens

## Step 5: Set Token Environment Variables
Add these to your .env.local file:
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_ACCESS_TOKEN=your_access_token_here

## Step 6: Test Email Service
Visit /api/test-email to test the OAuth2 setup
`
