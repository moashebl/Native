import type { NextAuthConfig } from 'next-auth'

// Notice this is only an object, not a full Auth.js instance
// This config should only be used on the server side
export default {
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/checkout(\/.*)?/,
        /\/account(\/.*)?/,
        /\/admin(\/.*)?/,
      ]
      const { pathname } = request.nextUrl
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth
      return true
    },
  },
  // Ensure this config is only used server-side
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig