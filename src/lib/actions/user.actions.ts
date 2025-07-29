'use server'
import { signIn, signOut } from '../../../auth'
import { redirect } from 'next/navigation'
import { IUserSignIn } from '@/types'

export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}