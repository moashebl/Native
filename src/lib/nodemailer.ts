import nodemailer from 'nodemailer'

// Create a transporter using Gmail SMTP with App Password (temporary solution)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'n8v.store@gmail.com',
    // Use the app password you generated from Google Account settings
    // Go to: https://myaccount.google.com/apppasswords
    // Select "Mail" and generate a password
    pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password-here',
  },
  tls: {
    rejectUnauthorized: false
  }
})

export default transporter

// Instructions:
// 1. Enable 2-Factor Authentication on your Gmail account
// 2. Go to: https://myaccount.google.com/apppasswords
// 3. Generate an app password for "Mail"
// 4. Add GMAIL_APP_PASSWORD=your-generated-password to your .env.local file
// 5. Rename this file to nodemailer.ts (or update the import in email-service.ts)
// 6. Restart your development server
