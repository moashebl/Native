import transporter from './nodemailer'
import { APP_NAME } from './constants'
import { render } from '@react-email/render'
import { fetchExchangeRates } from './currency-api'
import VerificationEmail from '../emails/verification-email'
import OrderConfirmationEmail from '../emails/order-confirmation'
import PaymentConfirmationEmail from '../emails/payment-confirmation'
import DeliveryConfirmationEmail from '../emails/delivery-confirmation'
import PurchaseReceiptEmail from '../emails/purchase-receipt'
import AskReviewOrderItemsEmail from '../emails/ask-review-order-items'

// Email service class
export class EmailService {
  private static instance: EmailService
  private senderEmail = 'n8v.store@gmail.com'
  private senderName = APP_NAME

  private constructor() {}

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  // Send verification email
  async sendVerificationEmail(userEmail: string, userName: string, verificationToken: string): Promise<boolean> {
    try {
      const emailHtml = await render(
        VerificationEmail({
          userName,
          verificationToken,
          siteName: APP_NAME,
        })
      )

      await transporter.sendMail({
        from: this.senderEmail,
        to: userEmail,
        subject: 'Verify Your Email Address',
        html: emailHtml,
      })

      console.log(`Verification email sent to ${userEmail}`)
      return true
    } catch (error) {
      console.error('Error sending verification email:', error)
      return false
    }
  }

  // Send order confirmation email
  async sendOrderConfirmationEmail(order: { _id: string; user: { email: string } | string }): Promise<boolean> {
    try {
      console.log('Starting to send order confirmation email for order:', order._id)
      
      // Get user email from order
      let userEmail: string
      if (typeof order.user === 'object' && order.user !== null && 'email' in order.user) {
        userEmail = (order.user as { email: string }).email
        console.log('User email from populated order:', userEmail)
      } else {
        // If user is not populated, we need to fetch it
        console.log('Fetching user with ID:', order.user)
        const { default: User } = await import('./db/models/user.model')
        const user = await User.findById(order.user)
        if (!user) throw new Error('User not found')
        userEmail = user.email
        console.log('Fetched user email:', userEmail)
      }

      // Get full order details for the email template
      console.log('Fetching full order details...')
      const { default: Order } = await import('./db/models/order.model')
      const fullOrder = await Order.findById(order._id).populate('items.product')
      
      if (!fullOrder) {
        throw new Error('Order not found')
      }
      console.log('Full order fetched successfully, items count:', fullOrder.items.length)

      // Sanitize the order data for email rendering
      const sanitizedOrder = JSON.parse(JSON.stringify(fullOrder))
      console.log('Order data sanitized for email rendering')

      // Get current EGP exchange rate
      console.log('Fetching current EGP exchange rate...')
      const exchangeRates = await fetchExchangeRates()
      const egpRate = exchangeRates.EGP
      console.log('Current EGP rate:', egpRate)

      console.log('Rendering email template...')
      const emailHtml = await render(
        OrderConfirmationEmail({
          order: sanitizedOrder,
          siteName: APP_NAME,
          egpRate,
        })
      )
      console.log('Email template rendered successfully')

      console.log('Sending email via transporter...')
      await transporter.sendMail({
        from: this.senderEmail,
        to: userEmail,
        subject: 'Order Confirmation',
        html: emailHtml,
      })

      console.log(`Order confirmation email sent successfully to ${userEmail}`)
      return true
    } catch (error) {
      console.error('Error sending order confirmation email:', error)
      return false
    }
  }

  // Send payment confirmation email
  async sendPaymentConfirmationEmail(order: { _id: string; user: { email: string } | string }): Promise<boolean> {
    try {
      // Get user email from order
      let userEmail: string
      if (typeof order.user === 'object' && order.user !== null && 'email' in order.user) {
        userEmail = (order.user as { email: string }).email
      } else {
        // If user is not populated, we need to fetch it
        const { default: User } = await import('./db/models/user.model')
        const user = await User.findById(order.user)
        if (!user) throw new Error('User not found')
        userEmail = user.email
      }

      // Get full order details for the email template
      const { default: Order } = await import('./db/models/order.model')
      const fullOrder = await Order.findById(order._id).populate('items.product')
      
      if (!fullOrder) {
        throw new Error('Order not found')
      }

      // Sanitize the order data for email rendering
      const sanitizedOrder = JSON.parse(JSON.stringify(fullOrder))
      console.log('Order data sanitized for email rendering')

      // Get current EGP exchange rate
      console.log('Fetching current EGP exchange rate...')
      const exchangeRates = await fetchExchangeRates()
      const egpRate = exchangeRates.EGP
      console.log('Current EGP rate:', egpRate)

      const emailHtml = await render(
        PaymentConfirmationEmail({
          order: sanitizedOrder,
          siteName: APP_NAME,
          egpRate,
        })
      )

      await transporter.sendMail({
        from: this.senderEmail,
        to: userEmail,
        subject: 'Payment Confirmed',
        html: emailHtml,
      })

      console.log(`Payment confirmation email sent to ${userEmail}`)
      return true
    } catch (error) {
      console.error('Error sending payment confirmation email:', error)
      return false
    }
  }

  // Send delivery confirmation email
  async sendDeliveryConfirmationEmail(order: { _id: string; user: { email: string } | string }): Promise<boolean> {
    try {
      // Get user email from order
      let userEmail: string
      if (typeof order.user === 'object' && order.user !== null && 'email' in order.user) {
        userEmail = (order.user as { email: string }).email
      } else {
        // If user is not populated, we need to fetch it
        const { default: User } = await import('./db/models/user.model')
        const user = await User.findById(order.user)
        if (!user) throw new Error('User not found')
        userEmail = user.email
      }

      // Get full order details for the email template
      const { default: Order } = await import('./db/models/order.model')
      const fullOrder = await Order.findById(order._id).populate('items.product')
      
      if (!fullOrder) {
        throw new Error('Order not found')
      }

      // Sanitize the order data for email rendering
      const sanitizedOrder = JSON.parse(JSON.stringify(fullOrder))
      console.log('Order data sanitized for email rendering')

      // Get current EGP exchange rate
      console.log('Fetching current EGP exchange rate...')
      const exchangeRates = await fetchExchangeRates()
      const egpRate = exchangeRates.EGP
      console.log('Current EGP rate:', egpRate)

      const emailHtml = await render(
        DeliveryConfirmationEmail({
          order: sanitizedOrder,
          siteName: APP_NAME,
          egpRate,
        })
      )

      await transporter.sendMail({
        from: this.senderEmail,
        to: userEmail,
        subject: 'Order Delivered',
        html: emailHtml,
      })

      console.log(`Delivery confirmation email sent to ${userEmail}`)
      return true
    } catch (error) {
      console.error('Error sending delivery confirmation email:', error)
      return false
    }
  }

  // Send purchase receipt email
  async sendPurchaseReceiptEmail(order: { _id: string; user: { email: string } | string }): Promise<boolean> {
    try {
      console.log('Starting to send purchase receipt email for order:', order._id)
      
      // Get user email from order
      let userEmail: string
      if (typeof order.user === 'object' && order.user !== null && 'email' in order.user) {
        userEmail = (order.user as { email: string }).email
        console.log('User email from populated order:', userEmail)
      } else {
        // If user is not populated, we need to fetch it
        console.log('Fetching user with ID:', order.user)
        const { default: User } = await import('./db/models/user.model')
        const user = await User.findById(order.user)
        if (!user) throw new Error('User not found')
        userEmail = user.email
        console.log('Fetched user email:', userEmail)
      }

      // Get full order details for the email template
      console.log('Fetching full order details...')
      const { default: Order } = await import('./db/models/order.model')
      const fullOrder = await Order.findById(order._id).populate('items.product')
      
      if (!fullOrder) {
        throw new Error('Order not found')
      }
      console.log('Full order fetched successfully, items count:', fullOrder.items.length)

      // Sanitize the order data for email rendering
      const sanitizedOrder = JSON.parse(JSON.stringify(fullOrder))
      console.log('Order data sanitized for email rendering')

      // Get current EGP exchange rate
      console.log('Fetching current EGP exchange rate...')
      const exchangeRates = await fetchExchangeRates()
      const egpRate = exchangeRates.EGP
      console.log('Current EGP rate:', egpRate)

      console.log('Rendering email template...')
      const emailHtml = await render(
        PurchaseReceiptEmail({
          order: sanitizedOrder,
          siteName: APP_NAME,
          egpRate,
        })
      )
      console.log('Email template rendered successfully')

      console.log('Sending email via transporter...')
      await transporter.sendMail({
        from: this.senderEmail,
        to: userEmail,
        subject: 'Purchase Receipt',
        html: emailHtml,
      })

      console.log(`Purchase receipt email sent successfully to ${userEmail}`)
      return true
    } catch (error) {
      console.error('Error sending purchase receipt email:', error)
      return false
    }
  }

  // Send ask review order items email
  async sendAskReviewOrderItemsEmail(order: { _id: string; user: { email: string } | string }): Promise<boolean> {
    try {
      console.log('Starting to send ask review email for order:', order._id)
      
      // Get user email from order
      let userEmail: string
      if (typeof order.user === 'object' && order.user !== null && 'email' in order.user) {
        userEmail = (order.user as { email: string }).email
        console.log('User email from populated order:', userEmail)
      } else {
        // If user is not populated, we need to fetch it
        console.log('Fetching user with ID:', order.user)
        const { default: User } = await import('./db/models/user.model')
        const user = await User.findById(order.user)
        if (!user) throw new Error('User not found')
        userEmail = user.email
        console.log('Fetched user email:', userEmail)
      }

      // Get full order details for the email template
      console.log('Fetching full order details...')
      const { default: Order } = await import('./db/models/order.model')
      const fullOrder = await Order.findById(order._id).populate('items.product')
      
      if (!fullOrder) {
        throw new Error('Order not found')
      }
      console.log('Full order fetched successfully, items count:', fullOrder.items.length)

      // Sanitize the order data for email rendering
      const sanitizedOrder = JSON.parse(JSON.stringify(fullOrder))
      console.log('Order data sanitized for email rendering')

      // Get current EGP exchange rate
      console.log('Fetching current EGP exchange rate...')
      const exchangeRates = await fetchExchangeRates()
      const egpRate = exchangeRates.EGP
      console.log('Current EGP rate:', egpRate)

      console.log('Rendering email template...')
      const emailHtml = await render(
        AskReviewOrderItemsEmail({
          order: sanitizedOrder,
          siteName: APP_NAME,
          egpRate,
        })
      )
      console.log('Email template rendered successfully')

      console.log('Sending email via transporter...')
      await transporter.sendMail({
        from: this.senderEmail,
        to: userEmail,
        subject: 'How was your experience?',
        html: emailHtml,
      })

      console.log(`Ask review email sent successfully to ${userEmail}`)
      return true
    } catch (error) {
      console.error('Error sending ask review email:', error)
      return false
    }
  }

  // Test email connection
  async testConnection(): Promise<boolean> {
    try {
      await transporter.verify()
      return true
    } catch (error) {
      console.error('Email connection test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance()
