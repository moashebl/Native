'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2 } from 'lucide-react'
import { IProductInput } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import { formatDate } from '@/lib/utils'

interface Product extends IProductInput {
  _id: string
  createdAt: Date
  stock: number
  isPublished: boolean
}

interface ProductListProps {
  products: Product[]
  onDelete: (id: string) => void
}

export default function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Products</h2>
        <Link href='/admin/products/create'>
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={64}
                    height={64}
                    className='object-cover rounded'
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/products/${product._id}`}
                    className='font-medium hover:underline'
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <ProductPrice price={product.price} plain />
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={product.isPublished ? 'default' : 'secondary'}>
                    {product.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(product.createdAt)}</TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <Link href={`/admin/products/${product._id}`}>
                      <Button variant='outline' size='sm'>
                        <Edit className='w-4 h-4' />
                      </Button>
                    </Link>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => onDelete(product._id)}
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}