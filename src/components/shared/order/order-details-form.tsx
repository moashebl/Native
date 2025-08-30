'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IOrderInput } from '@/types'
import ProductPrice from '../product/product-price'
import { formatDate } from '@/lib/utils'

interface Order extends IOrderInput {
  _id: string
  createdAt: Date
  isPaid: boolean
}

interface OrderDetailsFormProps {
  order: Order
}

export default function OrderDetailsForm({ order }: OrderDetailsFormProps) {
  const itemsPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const taxPrice = itemsPrice * 0.15 // 15% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10 // Free shipping over $100
  const totalPrice = itemsPrice + taxPrice + shippingPrice

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Order Details</h2>
        <Link href='/account/orders'>
          <Button variant='outline'>Back to Orders</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order #{order._id}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold'>Order Date</h3>
              <p>{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <h3 className='font-semibold'>Status</h3>
              <Badge variant={order.isPaid ? 'default' : 'secondary'}>
                {order.isPaid ? 'Paid' : 'Pending'}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className='font-semibold mb-2'>Items</h3>
            <div className='space-y-2'>
              {order.items.map((item, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span>{item.name} x {item.quantity}</span>
                  <ProductPrice price={item.price * item.quantity} plain />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items Total:</span>
              <ProductPrice price={itemsPrice} plain />
            </div>
            <div className='flex justify-between'>
              <span>Tax (15%):</span>
              <ProductPrice price={taxPrice} plain />
            </div>
            <div className='flex justify-between'>
              <span>Shipping:</span>
              <ProductPrice price={shippingPrice} plain />
            </div>
            <Separator />
            <div className='flex justify-between font-bold text-lg'>
              <span>Total:</span>
              <ProductPrice price={totalPrice} plain />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}