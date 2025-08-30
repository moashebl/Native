import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { NextResponse } from 'next/server'

const publicPages = [
  '/',
  '/search',
  '/sign-in',
  '/sign-up',
  '/cart',
  '/cart/(.*)',
  '/product/(.*)',
  '/page/(.*)',
  // (/secret requires auth)
]

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const publicPathnameRegex = RegExp(
    `^(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return NextResponse.next()
  } else {
    if (!req.auth) {
      const newUrl = new URL(
        `/sign-in?callbackUrl=${
          encodeURIComponent(req.nextUrl.pathname) || '/'
        }`,
        req.nextUrl.origin
      )
      return Response.redirect(newUrl)
    } else {
      return NextResponse.next()
    }
  }
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}