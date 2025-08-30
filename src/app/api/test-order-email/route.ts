import { NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'
import { IOrder } from '@/lib/db/models/order.model'

export async function POST() {
  try {
    console.log('Testing order confirmation email...')
    
    // Test the email connection first
    const connectionTest = await emailService.testConnection()
    console.log('Email connection test result:', connectionTest)
    
    if (!connectionTest) {
      return NextResponse.json(
        { success: false, message: 'Email connection failed' },
        { status: 500 }
      )
    }

    // Test sending an order confirmation email
    try {
      console.log('Testing order confirmation email sending...')
      
      // Create a test order object with proper structure matching OrderInputSchema
      const testOrder = {
        _id: 'test-order-123',
        user: { email: 'mohamed.alaashebl15@gmail.com' }, // Use your actual email for testing
        items: [
          {
            clientId: 'test-client-123',
            product: 'test-product-123',
            name: 'Test Product',
            slug: 'test-product',
            category: 'Test Category',
            quantity: 1,
            countInStock: 10,
            image: '/images/test.jpg',
            price: 100.00
          }
        ],
        createdAt: new Date(),
        expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        paymentMethod: 'Credit Card',
        itemsPrice: 100.00,
        shippingPrice: 10.00,
        taxPrice: 5.00,
        totalPrice: 115.00,
        isPaid: false,
        isDelivered: false,
        shippingAddress: {
          fullName: 'Test User',
          street: '123 Test St',
          city: 'Test City',
          province: 'Test Province',
          postalCode: '12345',
          country: 'Test Country',
          phone: '123-456-7890'
        }
      }
      
      console.log('Testing email template rendering directly...')
      
      // Test the email template rendering without database lookup
      const { render } = await import('@react-email/render')
      const { default: OrderConfirmationEmail } = await import('@/emails/order-confirmation')
      
      try {
        const emailHtml = await render(
          OrderConfirmationEmail({
            order: testOrder as unknown as IOrder, // Type assertion for test purposes
            siteName: 'Native House',
          })
        )
        
        console.log('Email template rendered successfully, length:', emailHtml.length)
        
        return NextResponse.json({
          success: true,
          message: 'Order confirmation email template rendered successfully',
          connectionTest: true,
          templateRender: true,
          emailSent: false, // We're not actually sending, just testing rendering
          emailLength: emailHtml.length
        })
      } catch (templateError) {
        console.error('Email template rendering failed:', templateError)
        return NextResponse.json({
          success: false,
          message: 'Email template rendering failed',
          connectionTest: true,
          templateRender: false,
          emailSent: false,
          error: templateError instanceof Error ? templateError.message : 'Unknown error'
        }, { status: 500 })
      }
    } catch (emailError) {
      console.error('Order confirmation email test failed:', emailError)
      return NextResponse.json({
        success: false,
        message: 'Order confirmation email test failed',
        connectionTest: true,
        emailSent: false,
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Order email test error:', error)
    return NextResponse.json(
      { success: false, message: 'Order email test failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
