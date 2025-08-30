'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateUserPassword } from '@/lib/actions/user.actions'
import { UserPasswordSchema } from '@/lib/validator'
import { IUserPassword } from '@/types'

export default function PasswordForm() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<IUserPassword>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: IUserPassword) {
    try {
      const result = await updateUserPassword(values)
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        })
        
        // Clear form
        form.reset()
        
        router.push('/account/manage')
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className='max-w-2xl'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your current password'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your current password to verify your identity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter new password'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your new password must be at least 3 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm your new password'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Re-enter your new password to confirm.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className='flex gap-3'>
              <Button type='submit' className='rounded-full'>
                Update Password
              </Button>
              <Button
                type='button'
                variant='outline'
                className='rounded-full'
                onClick={() => router.push('/account/manage')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
