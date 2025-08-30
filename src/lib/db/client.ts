// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from 'mongodb'

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

if (!process.env.MONGODB_URI && !isBrowser) {
  if (process.env.NODE_ENV === 'development' || process.env.VERCEL) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
  }
  // During build time, we might not have the MONGODB_URI set
  console.warn('MONGODB_URI is missing during build')
}

const uri = process.env.MONGODB_URI || ''
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient | null = null

// Only create client on server side
if (uri && !isBrowser) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClient?: MongoClient
    }

    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(uri, options)
    }
    client = globalWithMongo._mongoClient
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
  }
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client