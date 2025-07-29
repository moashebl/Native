import data from '@/lib/data'
import { connectToDatabase } from '.'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'
import User from './models/user.model'

loadEnvConfig(cwd())

const main = async () => {
  try {
    // Connect to database first
    await connectToDatabase(process.env.MONGODB_URI)
    
    const { products, users } = data
    
    // Clear existing data
    await User.deleteMany()
    await Product.deleteMany()
    
    // Insert new data
    const createdUser = await User.insertMany(users)
    const createdProducts = await Product.insertMany(products)

    console.log({
      createdUser,
      createdProducts,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

main()