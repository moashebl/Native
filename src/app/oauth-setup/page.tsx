'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react'

export default function OAuthSetupPage() {
  const [step, setStep] = useState<'credentials' | 'authorization' | 'tokens' | 'complete'>('credentials')
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [authUrl, setAuthUrl] = useState('')
  const [authorizationCode, setAuthorizationCode] = useState('')
  const [tokens, setTokens] = useState<{ accessToken: string; refreshToken: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSetupCredentials = async () => {
    if (!clientId || !clientSecret) {
      setError('Please enter both Client ID and Client Secret')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/oauth-setup?action=setup`)
      const result = await response.json()

      if (result.success) {
        setAuthUrl(result.authUrl)
        setStep('authorization')
      } else {
        setError(result.message)
      }
    } catch {
      setError('Failed to generate authorization URL')
    } finally {
      setLoading(false)
    }
  }

  const handleGetTokens = async () => {
    if (!authorizationCode) {
      setError('Please enter the authorization code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/oauth-setup?action=token&code=${authorizationCode}`)
      const result = await response.json()

      if (result.success) {
        setTokens(result.tokens)
        setStep('complete')
      } else {
        setError(result.message)
      }
    } catch {
      setError('Failed to exchange code for tokens')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Google OAuth2 Setup</h1>
          <p className="mt-2 text-gray-600">Configure OAuth2 for your email service</p>
        </div>

        {/* Step 1: Enter Credentials */}
        {step === 'credentials' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                Enter OAuth2 Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Enter your Google OAuth2 Client ID"
                />
              </div>
              <div>
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Enter your Google OAuth2 Client Secret"
                  type="password"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button onClick={handleSetupCredentials} disabled={loading} className="w-full">
                {loading ? 'Generating...' : 'Generate Authorization URL'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Authorization */}
        {step === 'authorization' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                Authorize Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Click the button below to authorize your application with Google
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={() => window.open(authUrl, '_blank')} 
                className="w-full"
                variant="outline"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Authorize with Google
              </Button>

              <div className="space-y-2">
                <Label htmlFor="authCode">Authorization Code</Label>
                <Input
                  id="authCode"
                  value={authorizationCode}
                  onChange={(e) => setAuthorizationCode(e.target.value)}
                  placeholder="Paste the authorization code from Google"
                />
                <p className="text-sm text-gray-500">
                  After authorizing, copy the code from the Google page and paste it above
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setStep('credentials')} variant="outline">
                  Back
                </Button>
                <Button onClick={handleGetTokens} disabled={loading || !authorizationCode} className="flex-1">
                  {loading ? 'Getting Tokens...' : 'Get Tokens'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Complete */}
        {step === 'complete' && tokens && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                Setup Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  OAuth2 setup completed successfully! Add these tokens to your .env.local file:
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Refresh Token</Label>
                <div className="flex gap-2">
                  <Input value={tokens.refreshToken} readOnly />
                  <Button 
                    onClick={() => copyToClipboard(tokens.refreshToken)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Access Token</Label>
                <div className="flex gap-2">
                  <Input value={tokens.accessToken} readOnly />
                  <Button 
                    onClick={() => copyToClipboard(tokens.accessToken)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Next steps:</strong>
                  <ol className="mt-2 list-decimal list-inside space-y-1">
                    <li>Add GOOGLE_REFRESH_TOKEN to your .env.local file</li>
                    <li>Add GOOGLE_ACCESS_TOKEN to your .env.local file</li>
                    <li>Restart your development server</li>
                    <li>Test the email service at /api/test-email</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <Button onClick={() => setStep('credentials')} className="w-full">
                Start Over
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
