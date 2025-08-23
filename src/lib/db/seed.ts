import data from '@/lib/data'
import { connectToDatabase } from '.'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'
import User from './models/user.model'
import Review from './models/review.model'
import WebPage from './models/web-page.model'

loadEnvConfig(cwd())

const main = async () => {
  try {
    // Connect to database first
    await connectToDatabase(process.env.MONGODB_URI)
    
    const { products, users, reviews, webPages } = data
    await WebPage.deleteMany()
    await WebPage.insertMany(webPages)    
    // Clear existing data
    await User.deleteMany()
    await Product.deleteMany()
    
    // Insert new data
    const createdUser = await User.insertMany(users)
    const createdProducts = await Product.insertMany(products)
    await Review.deleteMany()
    const rws = []
    for (let i = 0; i < createdProducts.length; i++) {
      let x = 0
      const { ratingDistribution } = createdProducts[i]
      for (let j = 0; j < ratingDistribution.length; j++) {
        for (let k = 0; k < ratingDistribution[j].count; k++) {
          x++
          rws.push({
            ...reviews.filter((x) => x.rating === j + 1)[
              x % reviews.filter((x) => x.rating === j + 1).length
            ],
            isVerifiedPurchase: true,
            product: createdProducts[i]._id,
            user: createdUser[x % createdUser.length]._id,
            updatedAt: Date.now(),
            createdAt: Date.now(),
          })
        }
      }
    }
    const createdReviews = await Review.insertMany(rws)
    console.log({
      createdUser,
      createdProducts,
      createdReviews,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

main()