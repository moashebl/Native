import Link from 'next/link'

import Pagination from '@/components/shared/pagination'
import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import ProductSortSelector from '@/components/shared/product/product-sort-selector'
import { getFilterUrl, toSlug } from '@/lib/utils'
import Rating from '@/components/shared/product/rating'

import CollapsibleOnMobile from '@/components/shared/collapsible-on-mobile'

const sortOrders = [
  { value: 'price-low-to-high', name: 'Price: Low to high' },
  { value: 'price-high-to-low', name: 'Price: High to low' },
  { value: 'newest-arrivals', name: 'Newest arrivals' },
  { value: 'avg-customer-review', name: 'Avg. customer review' },
  { value: 'best-selling', name: 'Best selling' },
]

const prices = [
  {
    name: '$1 to $20',
    value: '1-20',
  },
  {
    name: '$21 to $50',
    value: '21-50',
  },
  {
    name: '$51 to $1000',
    value: '51-1000',
  },
]

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams
  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
  } = searchParams

  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    tag !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${tag !== 'all' ? ` : Tag ${tag}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    }
  } else {
    return {
      title: 'Search Products',
    }
  }
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams

  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
    sort = 'best-selling',
    page = '1',
  } = searchParams

  const params = { q, category, tag, price, rating, sort, page }

  const categories = await getAllCategories()
  const tags = await getAllTags()
  const data = await getAllProducts({
    category,
    tag,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  })
  return (
    <div>
      <div className='my-4 bg-card border border-border rounded-lg p-4 flex-between flex-col md:flex-row'>
        <div className='flex items-center text-muted-foreground mb-2 md:mb-0'>
          <span className='font-medium'>
            {data.totalProducts === 0
              ? 'No'
              : `${data.from}-${data.to} of ${
                  data.totalProducts
                }`}{' '}
            results
          </span>
          {(q !== 'all' && q !== '') ||
          (category !== 'all' && category !== '') ||
          (tag !== 'all' && tag !== '') ||
          rating !== 'all' ||
          price !== 'all'
            ? ` for `
            : null}
          {q !== 'all' && q !== '' && (
            <span className='text-primary font-medium'>&ldquo;{q}&rdquo;</span>
          )}
          {category !== 'all' &&
            category !== '' && (
              <span className='ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-md'>
                Category: {category}
              </span>
            )}
          {tag !== 'all' &&
            tag !== '' && (
              <span className='ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-md'>
                Tag: {tag}
              </span>
            )}
          {price !== 'all' && (
            <span className='ml-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded-md'>
              Price: {price}
            </span>
          )}
          {rating !== 'all' && (
            <span className='ml-2 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-md'>
              Rating: {rating} & Up
            </span>
          )}
          {(q !== 'all' && q !== '') ||
          (category !== 'all' && category !== '') ||
          (tag !== 'all' && tag !== '') ||
          rating !== 'all' ||
          price !== 'all' ? (
            <Button variant={'outline'} size="sm" asChild className='ml-3'>
              <Link href='/search'>Clear All</Link>
            </Button>
          ) : null}
        </div>
        <div>
          <ProductSortSelector
            sortOrders={sortOrders}
            sort={sort}
            params={params}
          />
        </div>
      </div>
      <div className='bg-muted/30 grid md:grid-cols-5 md:gap-6 p-4'>
        <CollapsibleOnMobile title='Filters'>
          <div className='space-y-6 p-4 bg-card border border-border rounded-lg'>
            <div className='border-b border-border pb-4'>
              <div className='font-bold text-lg mb-3 text-foreground'>Department</div>
              <div className='space-y-2'>
                <Link
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    ('all' === category || '' === category) 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                  href={getFilterUrl({ category: 'all', params })}
                >
                  All
                </Link>
                {categories.map((c: string) => (
                  <Link
                    key={c}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      c === category 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                    href={getFilterUrl({ category: c, params })}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className='border-b border-border pb-4'>
              <div className='font-bold text-lg mb-3 text-foreground'>Price</div>
              <div className='space-y-2'>
                <Link
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    'all' === price 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                  href={getFilterUrl({ price: 'all', params })}
                >
                  All
                </Link>
                {prices.map((p) => (
                  <Link
                    key={p.value}
                    href={getFilterUrl({ price: p.value, params })}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      p.value === price 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className='border-b border-border pb-4'>
              <div className='font-bold text-lg mb-3 text-foreground'>Customer Review</div>
              <div className='space-y-2'>
                <Link
                  href={getFilterUrl({ rating: 'all', params })}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    'all' === rating 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  All
                </Link>
                <Link
                  href={getFilterUrl({ rating: '4', params })}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    '4' === rating 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <div className='flex items-center gap-2'>
                    <Rating size={4} rating={4} />
                    <span>& Up</span>
                  </div>
                </Link>
              </div>
            </div>
            
            <div>
              <div className='font-bold text-lg mb-3 text-foreground'>Tag</div>
              <div className='space-y-2'>
                <Link
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    ('all' === tag || '' === tag)
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                  href={getFilterUrl({ tag: 'all', params })}
                >
                  All
                </Link>
                {tags.map((t: string) => (
                  <Link
                    key={t}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      toSlug(t) === tag 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                    href={getFilterUrl({ tag: t, params })}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleOnMobile>

        <div className='md:col-span-4 space-y-4'>
          <div className='bg-card border border-border rounded-lg p-4'>
            <div className='font-bold text-xl text-foreground mb-2'>Results</div>
            <div className='text-muted-foreground text-sm'>
              Check each product page for other buying options
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {data.products.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-gray-500 text-lg mb-2'>No products found</div>
                <div className='text-gray-400 text-sm'>Try adjusting your search criteria or filters</div>
              </div>
            )}
            {data.products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {data.totalPages > 1 && (
            <Pagination page={page} totalPages={data.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}