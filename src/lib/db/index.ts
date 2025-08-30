import mongoose from 'mongoose'

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  // Don't try to connect on client side
  if (isBrowser) {
    console.warn('Database connection attempted on client side')
    return null
  }

  if (cached.conn) return cached.conn

  if (!MONGODB_URI) {
    // During build time, we might not have the MONGODB_URI set
    // This allows the build to continue without database connection
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL) {
      throw new Error('MONGODB_URI is missing')
    }
    console.warn('MONGODB_URI is missing during build, skipping database connection')
    return null
  }

  try {
    console.log('Attempting to connect to MongoDB...')
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI)
    cached.conn = await cached.promise
    console.log('Successfully connected to MongoDB')
    return cached.conn
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}