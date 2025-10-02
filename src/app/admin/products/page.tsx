'use client'

import { useEffect, useState } from 'react'
import ProductList from './product-list'
import { getAllProductsForAdmin, deleteProduct } from '@/lib/actions/product.actions'
import { IProductInput } from '@/types'
import { toast } from '@/hooks/use-toast'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'

interface Product extends IProductInput {
  _id: string
  createdAt: Date
  stock: number
  isPublished: boolean
}

export default function AdminProduct() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    productId: string
    productName: string
  }>({
    open: false,
    productId: '',
    productName: ''
  })

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
    // Find the product name for the confirmation dialog
    const product = products.find(p => p._id === id)
    const productName = product?.name || 'this product'
    
    setDeleteDialog({
      open: true,
      productId: id,
      productName: productName
    })
  }

  const confirmDelete = async () => {
    const { productId, productName } = deleteDialog
    
    try {
      const result = await deleteProduct(productId)
      
      if (result.success) {
        // Remove the product from the local state
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId))
        
        toast({
          title: 'Product Deleted Successfully',
          description: `"${productName}" has been permanently removed from your catalog.`,
        })
      } else {
        toast({
          title: 'Failed to Delete Product',
          description: result.message || 'An error occurred while deleting the product.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: 'Delete Operation Failed',
        description: 'Unable to delete the product. Please check your connection and try again.',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialog({ open: false, productId: '', productName: '' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    )
  }

  return (
    <>
      <ProductList products={products} onDelete={handleDelete} />
      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
        title="Delete Product"
        description={`Are you sure you want to permanently delete "${deleteDialog.productName}"? This action cannot be undone and will remove the product from your catalog.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  )
}