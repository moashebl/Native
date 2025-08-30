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
    <div className='space-y-2'>
      <h1 className='h1-bold'>Orders</h1>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: IOrderList) => (
              <TableRow key={order._id}>
                <TableCell>{formatId(order._id)}</TableCell>
                <TableCell>
                  {formatFullDateTime(order.createdAt!).fullDateTime}
                </TableCell>
                <TableCell>
                  {order.user ? order.user.name : 'Deleted User'}
                </TableCell>
                <TableCell>
                  {' '}
                  <ProductPrice price={order.totalPrice} plain />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.isPaid ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Paid
                        {order.paidAt && (
                          <span className="ml-1 text-xs">
                            {formatFullDateTime(order.paidAt).fullDateTime}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ❌ Unpaid
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.isDelivered ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Delivered
                        {order.deliveredAt && (
                          <span className="ml-1 text-xs">
                            {formatFullDateTime(order.deliveredAt).fullDateTime}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🚚 In Transit
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className='flex gap-1'>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/admin/orders/${order._id}`}>Details</Link>
                  </Button>
                  <DeleteDialog id={order._id} action={deleteOrder} />
                  <StatusUpdateButtons order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination page={page} totalPages={orders.totalPages!} />
        )}
      </div>
    </div>
  )
}