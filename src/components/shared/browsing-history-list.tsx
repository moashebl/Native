'use client'
import useBrowsingHistory from '@/hooks/use-browsing-history'
import React, { useEffect, useState, useCallback } from 'react'
import ProductSlider from './product/product-slider'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'

export default function BrowsingHistoryList({
  className,
  excludeId = '',
}: {
  className?: string
  excludeId?: string
}) {
  const { products } = useBrowsingHistory()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div />
  }

  return (
    products.length !== 0 && (
      <div className='bg-background'>
        <Separator className={cn('mb-4', className)} />
        <ProductList
          title="Related to items that you've viewed"
          type='related'
          excludeId={excludeId}
        />
        <Separator className='mb-4' />
        <ProductList
          title='Your browsing history'
          hideDetails
          type='history'
          excludeId={excludeId}
        />
      </div>
    )
  )
}

function ProductList({
  title,
  type = 'history',
  hideDetails = false,
  excludeId = '',
}: {
  title: string
  type: 'history' | 'related'
  hideDetails?: boolean
  excludeId?: string
}) {
  const { products } = useBrowsingHistory()
  const [data, setData] = React.useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchProducts = useCallback(async () => {
    if (!mounted) return
    
    const res = await fetch(
      `/api/products/browsing-history?type=${type}&excludeId=${excludeId}&categories=${products
        .map((product) => product.category)
        .join(',')}&ids=${products.map((product) => product.id).join(',')}`
    )
    const data = await res.json()
    setData(data)
  }, [mounted, excludeId, products, type])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    data.length > 0 && (
      <ProductSlider
        title={title}
        products={data}
        hideDetails={hideDetails}
      />
    )
  )
}