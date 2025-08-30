import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import AskReviewOrderItemsEmail from './ask-review-order-items'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    console.log('Sending purchase receipt for order:', order._id);
    console.log('Order user data:', JSON.stringify(order.user, null, 2));
    
    // Populate the user's email if it's not already populated
    let userEmail: string;
    
    if (typeof order.user === 'object' && order.user !== null && 'email' in order.user) {
      // If user is already populated with email
      userEmail = (order.user as { email: string }).email;
      console.log('Using email from populated user:', userEmail);
    } else {
      // If user is just an ObjectId, we need to fetch the user's email
      const { default: User } = await import('@/lib/db/models/user.model');
      console.log('Fetching user with ID:', order.user);
      const user = await User.findById(order.user);
      if (!user) throw new Error('User not found');
      userEmail = user.email;
      console.log('Fetched user email:', userEmail);
    }

    if (!userEmail) {
      throw new Error('User email not found');
    }

    await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: userEmail,
      subject: `Order Confirmation`,
      react: <PurchaseReceiptEmail order={order} />,
    });
  } catch (error) {
    console.error('Error sending purchase receipt:', error);
    throw error;
  }
}

export const sendAskReviewOrderItems = async ({ order }: { order: IOrder }) => {
  const oneDayFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: 'Review your order items',
    react: <AskReviewOrderItemsEmail order={order} />,
    scheduledAt: oneDayFromNow,
  })
}