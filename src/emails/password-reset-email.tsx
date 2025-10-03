import React from 'react'

interface PasswordResetEmailProps {
  userName: string
  resetToken: string
  siteName: string
  resetUrl: string
}

export default function PasswordResetEmail({
  userName,
  resetUrl,
  siteName,
}: PasswordResetEmailProps) {
  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1f2937',
        padding: '30px 20px',
        textAlign: 'center',
        borderBottom: '3px solid #7c3aed'
      }}>
        <h1 style={{
          color: '#ffffff',
          margin: '0',
          fontSize: '28px',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          {siteName}
        </h1>
        <p style={{
          color: '#9ca3af',
          margin: '8px 0 0 0',
          fontSize: '14px',
          fontWeight: '400'
        }}>
          Premium Clothing & Accessories
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
            color: 'white',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            fontSize: '32px',
            boxShadow: '0 8px 16px rgba(124, 58, 237, 0.3)'
          }}>
            🔒
          </div>
          <h2 style={{
            color: '#1f2937',
            marginBottom: '15px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Reset Your Password
          </h2>
          <p style={{
            color: '#6b7280',
            margin: '0',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            We received a request to reset your password
          </p>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '25px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            Hello <strong>{userName}</strong>,
          </p>

          <p style={{
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            We received a request to reset your password for your {siteName} account. Click the button below to create a new password:
          </p>

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
              href={resetUrl}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                color: 'white',
                padding: '16px 40px',
                textDecoration: 'none',
                borderRadius: '8px',
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 8px 16px rgba(124, 58, 237, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              Reset Password
            </a>
          </div>

          <p style={{
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            If the button above doesn&apos;t work, you can copy and paste this link into your browser:
          </p>

          <p style={{
            color: '#7c3aed',
            wordBreak: 'break-all',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center',
            padding: '15px',
            backgroundColor: '#f5f3ff',
            borderRadius: '6px',
            border: '1px solid #ddd6fe'
          }}>
            {resetUrl}
          </p>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #fde68a'
        }}>
          <h3 style={{
            color: '#92400e',
            marginTop: '0',
            marginBottom: '10px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            ⏰ Important Information
          </h3>
          <p style={{
            color: '#92400e',
            lineHeight: '1.6',
            margin: '0 0 10px 0',
            fontSize: '14px'
          }}>
            This password reset link will expire in <strong>1 hour</strong>.
          </p>
          <p style={{
            color: '#92400e',
            lineHeight: '1.6',
            margin: '0',
            fontSize: '14px'
          }}>
            If you didn&apos;t request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
        </div>

        <div style={{
          backgroundColor: '#ecfdf5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #a7f3d0'
        }}>
          <h3 style={{
            color: '#065f46',
            marginTop: '0',
            marginBottom: '10px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            🛡️ Security Tips
          </h3>
          <ul style={{
            color: '#065f46',
            lineHeight: '1.6',
            margin: '0',
            paddingLeft: '20px',
            fontSize: '14px'
          }}>
            <li>Never share your password with anyone</li>
            <li>Use a strong, unique password</li>
            <li>Enable two-factor authentication if available</li>
          </ul>
        </div>

        <p style={{
          color: '#374151',
          lineHeight: '1.6',
          marginBottom: '20px',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          Best regards,<br />
          <strong>The {siteName} Team</strong>
        </p>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            backgroundColor: '#1f2937',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px auto',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            N
          </div>
          <h3 style={{
            color: '#1f2937',
            margin: '0 0 5px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Native
          </h3>
          <p style={{
            color: '#6b7280',
            margin: '0',
            fontSize: '14px'
          }}>
            Premium Clothing & Accessories
          </p>
        </div>

        <div style={{
          fontSize: '12px',
          color: '#9ca3af',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            This is an automated email. Please do not reply to this message.
          </p>
          <p style={{ margin: '0' }}>
            © 2025 Native, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
