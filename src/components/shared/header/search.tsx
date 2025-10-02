'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

interface SearchProps {
  categories?: string[]
}

export default function Search({ categories = [] }: SearchProps) {
  
  return (
    <form
      action='/search'
      method='GET'
      className='flex  items-stretch h-8 md:h-9 '
    >
      <Select name='category'>
        <SelectTrigger className='w-auto h-full dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-r rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none'>
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='all'>All</SelectItem>
          {categories.length > 0 && categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className='flex-1 rounded-none dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-base h-full'
        placeholder='Search Native House'
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground rounded-s-none rounded-e-md h-full px-3 py-1.5 md:py-2'
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}