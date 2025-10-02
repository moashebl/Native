import { MAIN_ADMIN_EMAIL } from './constants'

/**
 * Check if the given email is the main admin
 * This is a pure function that can be used on both client and server
 */
export function isMainAdmin(email: string): boolean {
  return email === MAIN_ADMIN_EMAIL
}
