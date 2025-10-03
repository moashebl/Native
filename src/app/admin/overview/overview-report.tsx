'use client'
import { BadgeDollarSign, Barcode, CreditCard, Users } from 'lucide-react'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDateTime, formatNumber } from '@/lib/utils'

import SalesCategoryPieChart from './sales-category-pie-chart'

import React, { useEffect, useState, useTransition } from 'react'
import { DateRange } from 'react-day-picker'
import { getOrderSummary } from '@/lib/actions/order.actions'
import SalesAreaChart from './sales-area-chart'
import { CalendarDateRangePicker } from './date-range-picker'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import { Skeleton } from '@/components/ui/skeleton'
import TableChart from './table-chart'

export default function OverviewReport() {
  // Calculate 6 months ago from today
  const getSixMonthsAgo = () => {
    const today = new Date()
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
    return sixMonthsAgo
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: getSixMonthsAgo(),
    to: new Date(),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<{ [key: string]: any }>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    if (date) {
      startTransition(async () => {
        setData(await getOrderSummary(date))
      })
    }
  }, [date])

  if (!data)
    return (
      <div className='space-y-4'>
        <div>
          <h1 className='h1-bold'>Dashboard</h1>
        </div>
        {/* First Row */}
        <div className='flex gap-4'>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className='h-36 w-full' />
          ))}
        </div>

        {/* Second Row */}
        <div>
          <Skeleton className='h-[30rem] w-full' />
        </div>

        {/* Third Row */}
        <div className='flex gap-4'>
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className='h-60 w-full' />
          ))}
        </div>

        {/* Fourth Row */}
        <div className='flex gap-4'>
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className='h-60 w-full' />
          ))}
        </div>
      </div>
    )
  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>Dashboard</h1>
        <CalendarDateRangePicker defaultDate={date} setDate={setDate} />
      </div>
      <div className='space-y-4'>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <BadgeDollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='text-xl md:text-2xl font-bold'>
                <ProductPrice price={data.totalSales} plain />
              </div>
              <div>
                <Link className='text-xs text-primary hover:underline' href='/admin/orders'>
                  View revenue
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='text-xl md:text-2xl font-bold'>
                {formatNumber(data.ordersCount)}
              </div>
              <div>
                <Link className='text-xs text-primary hover:underline' href='/admin/orders'>
                  View orders
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Customers
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='text-xl md:text-2xl font-bold'>{data.usersCount}</div>
              <div>
                <Link className='text-xs text-primary hover:underline' href='/admin/users'>
                  View customers
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Products
              </CardTitle>
              <Barcode className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='text-xl md:text-2xl font-bold'>{data.productsCount}</div>
              <div>
                <Link className='text-xs text-primary hover:underline' href='/admin/products'>
                  View products
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesAreaChart data={data.salesChartData} />
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>How much you’re earning</CardTitle>
              <CardDescription>
                Estimated · Last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TableChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                {formatDateTime(date!.from!).dateOnly} to{' '}
                {formatDateTime(date!.to!).dateOnly}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TableChart />
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
          <Card className='overflow-hidden'>
            <CardHeader>
              <CardTitle>Best-Selling Categories</CardTitle>
            </CardHeader>
            <CardContent className='px-2 sm:px-6'>
              <SalesCategoryPieChart data={data.topSalesCategories} />
            </CardContent>
          </Card>
          <Card className='overflow-hidden'>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className='overflow-x-auto px-0 sm:px-6'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='whitespace-nowrap'>Buyer</TableHead>
                    <TableHead className='whitespace-nowrap'>Date</TableHead>
                    <TableHead className='whitespace-nowrap'>Total</TableHead>
                    <TableHead className='whitespace-nowrap'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.latestOrders.map((order: IOrderList) => (
                    <TableRow key={order._id}>
                      <TableCell className='whitespace-nowrap'>
                        {order.user ? order.user.name : 'Deleted User'}
                      </TableCell>

                      <TableCell className='whitespace-nowrap'>
                        {formatDateTime(order.createdAt).dateOnly}
                      </TableCell>
                      <TableCell className='whitespace-nowrap'>
                        <ProductPrice price={order.totalPrice} plain />
                      </TableCell>

                      <TableCell className='whitespace-nowrap'>
                        <Link href={`/admin/orders/${order._id}`}>
                          <span className='px-2'>Details</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}