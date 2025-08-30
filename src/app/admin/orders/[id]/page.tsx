import { notFound } from 'next/navigation'
import React from 'react'

import { auth } from '@/../auth'
import { getOrderById } from '@/lib/actions/order.actions'
import OrderDetailsForm from '@/components/shared/order/order-details-form'
import { formatId } from '@/lib/utils'

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params

  return {
    title: `Order ${formatId(params.id)}`,
  }
}

export default async function AdminOrderDetailsPage(props: {
  params: Promise<{
    id: string
  }>
}) {
  const params = await props.params

  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  return (
    <main className='flex-1 p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Order {formatId(order._id)}</h1>
        <p className='text-muted-foreground'>
          Order details for {session?.user?.name || 'Unknown User'}
        </p>
      </div>
      <OrderDetailsForm order={order} />
    </main>
  )
}