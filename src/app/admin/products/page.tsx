'use client'

import { useEffect, useState } from 'react'
import ProductList from './product-list'
import { getAllProductsForAdmin } from '@/lib/actions/product.actions'
import { IProductInput } from '@/types'

interface Product extends IProductInput {
  _id: string
  createdAt: Date
  stock: number
  isPublished: boolean
}

export default function AdminProduct() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products: fetchedProducts } = await getAllProductsForAdmin({
          query: 'all',
          page: 1,
          sort: 'latest',
          limit: 100
        })

        // Transform products to match ProductList expectations
        const transformedProducts = fetchedProducts.map((product) => ({
          ...product,
          stock: product.countInStock || 0,
          _id: product._id?.toString() || '',
          createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
        }))

        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = (id: string) => {
    console.log('Deleting product:', id)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    )
  }

  return <ProductList products={products} onDelete={handleDelete} />
}