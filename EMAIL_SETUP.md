# Email System Setup with Nodemailer

This project now uses Nodemailer for sending emails instead of Resend. The system sends emails for various events including user registration, order confirmation, payment confirmation, and delivery confirmation.

## Features

### 1. Email Verification
- **When**: User signs up with email/password (not Google)
- **What**: Sends verification email with unique token
- **Template**: `src/emails/verification-email.tsx`
- **Action**: User must click verification link to activate account

### 2. Order Confirmation
- **When**: Order is placed
- **What**: Sends order details with product images, descriptions, and prices
- **Template**: `src/emails/order-confirmation.tsx`
- **Action**: Informs user that order has been received

### 3. Payment Confirmation
- **When**: Order payment is confirmed
- **What**: Sends payment confirmation with order summary
- **Template**: `src/emails/payment-confirmation.tsx`
- **Action**: Confirms successful payment

### 4. Delivery Confirmation
- **When**: Order is delivered
- **What**: Sends delivery confirmation and review request
- **Template**: `src/emails/delivery-confirmation.tsx`
- **Action**: Informs user of successful delivery and requests review

## Configuration

### Gmail SMTP Settings
The system is configured to use Gmail SMTP with the following credentials:
- **Email**: n8v.store@gmail.com
- **Password**: Native12345
- **SMTP Server**: smtp.gmail.com
- **Port**: 587 (TLS)

### Environment Variables
```env
SENDER_EMAIL=n8v.store@gmail.com
SENDER_NAME=Your App Name
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## File Structure

```
src/
├── lib/
│   ├── nodemailer.ts          # Nodemailer configuration
│   ├── email-service.ts       # Main email service
│   └── email-utils.ts         # Utility functions
├── emails/
│   ├── verification-email.tsx     # Email verification template
│   ├── order-confirmation.tsx     # Order confirmation template
│   ├── payment-confirmation.tsx   # Payment confirmation template
│   └── delivery-confirmation.tsx  # Delivery confirmation template
└── app/
    ├── api/
    │   └── verify-email/          # Email verification API
    └── verify-email/              # Verification page
```

## Usage

### Testing Email Service
Visit `/api/test-email` to test if the email service is working correctly.

### Email Verification Flow
1. User signs up with email/password
2. System generates verification token
3. Verification email is sent to user
4. User clicks verification link
5. Account is activated and user can sign in

### Order Email Flow
1. **Order Placed**: Order confirmation email sent
2. **Payment Confirmed**: Payment confirmation email sent
3. **Order Delivered**: Delivery confirmation email sent

## Security Notes

### Gmail App Passwords
For production use, consider using Gmail App Passwords instead of regular passwords:
1. Enable 2-factor authentication on Gmail account
2. Generate app-specific password
3. Use app password in configuration

### Token Expiration
- Verification tokens expire after 24 hours
- Tokens are cleared after successful verification

## Troubleshooting

### Common Issues

1. **Gmail Authentication Failed**
   - Check if 2FA is enabled
   - Use app password instead of regular password
   - Ensure "Less secure app access" is enabled (not recommended for production)

2. **Emails Not Sending**
   - Check console for error messages
   - Verify Gmail credentials
   - Test email connection at `/api/test-email`

3. **Verification Links Not Working**
   - Check token expiration
   - Verify API endpoint is accessible
   - Check server logs for errors

### Testing
- Use development environment for testing
- Check browser console and server logs
- Verify email templates render correctly
- Test all email flows end-to-end

## Migration from Resend

The system has been migrated from Resend to Nodemailer:
- Old email functions are preserved for compatibility
- New Nodemailer-based system is active
- Email templates have been updated for better compatibility
- All existing functionality is maintained

## Future Enhancements

- Email queue system for better reliability
- Email templates customization
- Multiple email provider support
- Email analytics and tracking
- Bulk email capabilities
