import nodemailer from 'nodemailer'

// Create a transporter using Gmail SMTP with OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    type: 'OAuth2',
    user: 'n8v.store@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
  },
  tls: {
    rejectUnauthorized: false
  }
})

export default transporter
