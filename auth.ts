import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from './src/lib/db'
import client from './src/lib/db/client'
import User from './src/lib/db/models/user.model'

import NextAuth, { type DefaultSession } from 'next-auth'
import authConfig from './auth.config'

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      role: string
    } & DefaultSession['user']
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase()
        if (credentials == null) return null

        const user = await User.findOne({ email: credentials.email })

        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        // Ensure user has a name, fallback to email prefix if not
        const userName = user.name || (user.email ? user.email.split('@')[0] : 'User')
        
        if (!user.name) {
          await connectToDatabase()
          await User.findByIdAndUpdate(user.id, {
            name: userName,
            role: 'user',
          })
        }
        token.name = userName
        token.role = (user as { role: string }).role || 'user'
      }

      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    session: async ({ session, user, trigger, token }) => {
      session.user.id = token.sub as string
      session.user.role = (token.role as string) || 'user'
      session.user.name = token.name as string
      if (trigger === 'update' && user?.name) {
        session.user.name = user.name
      }
      return session
    },
  },
})