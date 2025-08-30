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
import { updateUserEmail } from '@/lib/actions/user.actions'
import { UserEmailSchema } from '@/lib/validator'
import { IUserEmail } from '@/types'
import { useSession } from 'next-auth/react'

export default function EmailForm() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const { toast } = useToast()

  const form = useForm<IUserEmail>({
    resolver: zodResolver(UserEmailSchema),
    defaultValues: {
      email: session?.user?.email || '',
    },
  })

  async function onSubmit(values: IUserEmail) {
    try {
      const result = await updateUserEmail(values)
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        })
        
        // Update the session with new email
        await update({
          ...session,
          user: {
            ...session?.user,
            email: values.email,
          },
        })
        
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
        <CardTitle>Change Email Address</CardTitle>
        <CardDescription>
          Update your email address. You&apos;ll need to sign in with the new email address after the change.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter new email address'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be your new sign-in email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className='flex gap-3'>
              <Button type='submit' className='rounded-full'>
                Update Email
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
