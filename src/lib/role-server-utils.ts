'use server'

import { auth } from '@/../auth'
import { isMainAdmin } from './role-utils'

/**
 * Check if the current user is the main admin
 */
export async function isCurrentUserMainAdmin(): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.email) return false
  return isMainAdmin(session.user.email)
}

/**
 * Check if the current user can modify the target user
 * Rules:
 * - Main admin can modify anyone
 * - Regular admins can modify users but not the main admin
 * - Users cannot modify anyone
 */
export async function canModifyUser(targetUserEmail: string): Promise<boolean> {
  const session = await auth()
  
  // Must be logged in
  if (!session?.user?.email) return false
  
  // Must be an admin
  if (session.user.role !== 'Admin') return false
  
  // Main admin can modify anyone
  if (session.user.email && isMainAdmin(session.user.email)) return true
  
  // Regular admins cannot modify the main admin
  if (isMainAdmin(targetUserEmail)) return false
  
  // Regular admins can modify other users
  return true
}

/**
 * Check if the current user can delete the target user
 * Same rules as canModifyUser but also prevents self-deletion
 */
export async function canDeleteUser(targetUserEmail: string): Promise<boolean> {
  const session = await auth()
  
  // Cannot delete yourself
  if (session?.user?.email === targetUserEmail) return false
  
  // Use the same rules as modify
  return await canModifyUser(targetUserEmail)
}

/**
 * Get the role options available for the current user to assign
 */
export async function getAvailableRoles(): Promise<string[]> {
  const session = await auth()
  
  // Only admins can assign roles
  if (session?.user?.role !== 'Admin' || !session?.user?.email) return []
  
  // Main admin can assign any role
  if (isMainAdmin(session.user.email)) {
    return ['Admin', 'User']
  }
  
  // Regular admins can only assign User role (cannot create more admins)
  return ['User']
}
