import { IOrder } from '@/lib/db/models/order.model'
import { emailService } from '@/lib/email-service'

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    console.log('Sending purchase receipt for order:', order._id);
    
    // Use the Nodemailer email service instead of Resend
    const emailResult = await emailService.sendPurchaseReceiptEmail(order);
    
    if (emailResult) {
      console.log('Purchase receipt email sent successfully');
    } else {
      console.error('Failed to send purchase receipt email');
    }
    
    return emailResult;
  } catch (error) {
    console.error('Error sending purchase receipt:', error);
    return false;
  }
}

export const sendAskReviewOrderItems = async ({ order }: { order: IOrder }) => {
  try {
    console.log('Sending review request for order:', order._id);
    
    // Use the Nodemailer email service instead of Resend
    const emailResult = await emailService.sendAskReviewOrderItemsEmail(order);
    
    if (emailResult) {
      console.log('Review request email sent successfully');
    } else {
      console.error('Failed to send review request email');
    }
    
    return emailResult;
  } catch (error) {
    console.error('Error sending review request:', error);
    return false;
  }
}