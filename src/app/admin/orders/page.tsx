import { Metadata } from 'next'
import Link from 'next/link'

import { auth } from '@/../auth'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
import { formatFullDateTime, formatId } from '@/lib/utils'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import StatusUpdateButtons from './status-update-buttons'

export const metadata: Metadata = {
  title: 'Admin Orders',
}
export default async function OrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams

  const { page = '1' } = searchParams

  const session = await auth()
  if (session?.user.role !== 'Admin')
    throw new Error('Admin permission required')

  const orders = await getAllOrders({
    page: Number(page),
  })
  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>Orders</h1>
        <div className='text-sm text-muted-foreground'>
          Total: {orders.data.length} orders
        </div>
      </div>

      {/* Mobile Card View */}
      <div className='block lg:hidden space-y-4'>
        {orders.data.map((order: IOrderList) => (
          <div key={order._id} className='bg-card border rounded-lg p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-xs text-muted-foreground'>Order ID</p>
                <p className='font-mono text-sm font-medium'>{formatId(order._id)}</p>
              </div>
              <div className='text-right'>
                <p className='text-xs text-muted-foreground'>Total</p>
                <p className='font-semibold text-lg'>
                  <ProductPrice price={order.totalPrice} plain />
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3 text-sm'>
              <div>
                <p className='text-xs text-muted-foreground mb-1'>Customer</p>
                <p className='font-medium'>{order.user ? order.user.name : 'Deleted User'}</p>
              </div>
              <div>
                <p className='text-xs text-muted-foreground mb-1'>Date</p>
                <p className='text-xs'>{formatFullDateTime(order.createdAt!).dateOnly}</p>
              </div>
            </div>

            <div className='flex gap-2 flex-wrap'>
              {order.isPaid ? (
                <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'>
                  ✓ Paid
                </span>
              ) : (
                <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'>
                  ✗ Unpaid
                </span>
              )}
              {order.isDelivered ? (
                <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'>
                  ✓ Delivered
                </span>
              ) : (
                <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'>
                  🚚 In Transit
                </span>
              )}
            </div>

            <div className='flex gap-2 pt-2 border-t'>
              <Button asChild variant='outline' size='sm' className='flex-1'>
                <Link href={`/admin/orders/${order._id}`}>View Details</Link>
              </Button>
              <StatusUpdateButtons order={order} />
              <DeleteDialog id={order._id} action={deleteOrder} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className='hidden lg:block overflow-x-auto rounded-lg border shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow className='bg-muted/50'>
              <TableHead className='font-semibold'>Order ID</TableHead>
              <TableHead className='font-semibold'>Date</TableHead>
              <TableHead className='font-semibold'>Customer</TableHead>
              <TableHead className='font-semibold text-right'>Total</TableHead>
              <TableHead className='font-semibold'>Payment</TableHead>
              <TableHead className='font-semibold'>Delivery</TableHead>
              <TableHead className='font-semibold text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: IOrderList) => (
              <TableRow key={order._id} className='hover:bg-muted/30'>
                <TableCell className='font-mono text-sm'>{formatId(order._id)}</TableCell>
                <TableCell className='text-sm whitespace-nowrap'>
                  {formatFullDateTime(order.createdAt!).dateOnly}
                </TableCell>
                <TableCell className='font-medium'>
                  {order.user ? order.user.name : 'Deleted User'}
                </TableCell>
                <TableCell className='text-right font-semibold'>
                  <ProductPrice price={order.totalPrice} plain />
                </TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'>
                      ✓ Paid
                    </span>
                  ) : (
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'>
                      ✗ Unpaid
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered ? (
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'>
                      ✓ Delivered
                    </span>
                  ) : (
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'>
                      🚚 In Transit
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className='flex gap-2 justify-end'>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/admin/orders/${order._id}`}>Details</Link>
                    </Button>
                    <StatusUpdateButtons order={order} />
                    <DeleteDialog id={order._id} action={deleteOrder} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {orders.totalPages > 1 && (
        <Pagination page={page} totalPages={orders.totalPages!} />
      )}
    </div>
  )
}