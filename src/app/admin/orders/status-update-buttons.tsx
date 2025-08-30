'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { updateOrderToPaid, deliverOrder } from '@/lib/actions/order.actions'
import { IOrderList } from '@/types'

export default function StatusUpdateButtons({ order }: { order: IOrderList }) {
  // Debug logging
  console.log('StatusUpdateButtons render:', {
    orderId: order._id,
    isPaid: order.isPaid,
    isDelivered: order.isDelivered,
    paidAt: order.paidAt,
    deliveredAt: order.deliveredAt
  })

  const handleMarkAsPaid = async () => {
    try {
      console.log('Marking order as paid:', order._id)
      const result = await updateOrderToPaid(order._id)
      if (result.success) {
        toast({ title: 'Success', description: result.message })
        // Refresh the page to show updated status
        window.location.reload()
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' })
      }
    } catch (error) {
      console.error('Error marking as paid:', error)
      toast({ title: 'Error', description: 'Failed to update order status', variant: 'destructive' })
    }
  }

  const handleMarkAsDelivered = async () => {
    try {
      console.log('Marking order as delivered:', order._id)
      const result = await deliverOrder(order._id)
      if (result.success) {
        toast({ title: 'Success', description: result.message })
        // Refresh the page to show updated status
        window.location.reload()
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' })
      }
    } catch (error) {
      console.error('Error marking as delivered:', error)
      toast({ title: 'Error', description: 'Failed to update order status', variant: 'destructive' })
    }
  }

  return (
    <div className="flex gap-1">
      {/* Always show the current status for debugging */}
      <div className="text-xs text-gray-500 mr-2">
        Status: {order.isPaid ? 'Paid' : 'Unpaid'} / {order.isDelivered ? 'Delivered' : 'Not Delivered'}
      </div>
      
      {/* Show Mark Paid button if not paid */}
      {!order.isPaid && (
        <Button
          onClick={handleMarkAsPaid}
          variant="outline"
          size="sm"
          className="text-green-600 hover:text-green-700"
        >
          Mark Paid
        </Button>
      )}
      
      {/* Show Mark Delivered button if paid but not delivered */}
      {order.isPaid && !order.isDelivered && (
        <Button
          onClick={handleMarkAsDelivered}
          variant="outline"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
        >
          Mark Delivered
        </Button>
      )}
      
      {/* Show info if order is already completed */}
      {order.isPaid && order.isDelivered && (
        <span className="text-xs text-green-600 px-2 py-1 bg-green-100 rounded">
          ✅ Completed
        </span>
      )}
    </div>
  )
}
