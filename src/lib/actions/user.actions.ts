'use server'
import bcrypt from 'bcryptjs'
import { auth } from '@/../auth'
import { IUserSignUp, IUserName, IUserEmail, IUserPassword } from '@/types'
import { UserSignUpSchema, UserUpdateSchema } from '../validator'
import { connectToDatabase } from '../db'
import User, { IUser } from '../db/models/user.model'
import { formatError } from '../utils'
import { revalidatePath } from 'next/cache'
import { getSetting } from './setting.actions'
import { z } from 'zod'

// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectToDatabase()
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}
// UPDATE
export async function updateUserName(user: IUserName) {
  try {
    await connectToDatabase()
    const session = await auth()
    const currentUser = await User.findById(session?.user?.id)
    if (!currentUser) throw new Error('User not found')
    currentUser.name = user.name
    const updatedUser = await currentUser.save()
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function updateUserEmail(user: IUserEmail) {
  try {
    await connectToDatabase()
    const session = await auth()
    const currentUser = await User.findById(session?.user?.id)
    if (!currentUser) throw new Error('User not found')
    
    // Check if user has a password (not Google sign-in)
    if (!currentUser.password) {
      return { success: false, message: 'Email cannot be changed for Google sign-in accounts' }
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser && existingUser._id.toString() !== currentUser._id.toString()) {
      return { success: false, message: 'Email already exists' }
    }
    
    currentUser.email = user.email
    const updatedUser = await currentUser.save()
    return {
      success: true,
      message: 'Email updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function updateUserPassword(user: IUserPassword) {
  try {
    await connectToDatabase()
    const session = await auth()
    const currentUser = await User.findById(session?.user?.id)
    if (!currentUser) throw new Error('User not found')
    
    // Check if user has a password (not Google sign-in)
    if (!currentUser.password) {
      return { success: false, message: 'Password cannot be changed for Google sign-in accounts' }
    }
    
    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(user.currentPassword, currentUser.password)
    if (!isCurrentPasswordValid) {
      return { success: false, message: 'Current password is incorrect' }
    }
    
    // Hash new password
    currentUser.password = await bcrypt.hash(user.newPassword, 5)
    const updatedUser = await currentUser.save()
    return {
      success: true,
      message: 'Password updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function isGoogleUser() {
  try {
    await connectToDatabase()
    const session = await auth()
    const currentUser = await User.findById(session?.user?.id)
    if (!currentUser) return false
    
    // If user has no password, they signed in with Google
    return !currentUser.password
  } catch {
    return false
  }
}
// DELETE

export async function deleteUser(id: string) {
  try {
    await connectToDatabase()
    const res = await User.findByIdAndDelete(id)
    if (!res) throw new Error('Use not found')
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// GET
export async function getAllUsers({
  limit,
  page,
}: {
  limit?: number
  page: number
}) {
  const {
    common: { pageSize },
  } = await getSetting()
  limit = limit || pageSize
  await connectToDatabase()

  const skipAmount = (Number(page) - 1) * limit
  const users = await User.find()
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)
  const usersCount = await User.countDocuments()
  return {
    data: JSON.parse(JSON.stringify(users)) as IUser[],
    totalPages: Math.ceil(usersCount / limit),
  }
}
export async function updateUser(user: z.infer<typeof UserUpdateSchema>) {
  try {
    await connectToDatabase()
    const dbUser = await User.findById(user._id)
    if (!dbUser) throw new Error('User not found')
    dbUser.name = user.name
    dbUser.email = user.email
    dbUser.role = user.role
    const updatedUser = await dbUser.save()
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function getUserById(userId: string) {
  await connectToDatabase()
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  return JSON.parse(JSON.stringify(user)) as IUser
}