'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { SettingInputSchema } from '@/lib/validator'
import { ClientSetting, ISettingInput } from '@/types'
import { updateSetting } from '@/lib/actions/setting.actions'
import useSetting from '@/hooks/use-setting-store'
import LanguageForm from './language-form'
import CurrencyForm from './currency-form'
import PaymentMethodForm from './payment-method-form'
import DeliveryDateForm from './delivery-date-form'
import SiteInfoForm from './site-info-form'
import CommonForm from './common-form'
import CarouselForm from './carousel-form'

const SettingForm = ({ setting }: { setting: ISettingInput }) => {
  const { setSetting } = useSetting()

  const form = useForm<ISettingInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(SettingInputSchema) as any,
    defaultValues: setting,
  })
  const {
    formState: { isSubmitting },
  } = form

  const { toast } = useToast()
  async function onSubmit(values: ISettingInput) {
    try {
      console.log('Submitting settings:', values)
      const res = await updateSetting({ ...values })
      console.log('Update result:', res)
      
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        toast({
          description: res.message,
        })
        setSetting(values as ClientSetting)
      }
    } catch (error) {
      console.error('Error submitting settings:', error)
      toast({
        variant: 'destructive',
        description: 'An unexpected error occurred while saving settings',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        method='post'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={form.handleSubmit(onSubmit as any)}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <SiteInfoForm id='setting-site-info' form={form as any} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <CommonForm id='setting-common' form={form as any} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <CarouselForm id='setting-carousels' form={form as any} />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <LanguageForm id='setting-languages' form={form as any} />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <CurrencyForm id='setting-currencies' form={form as any} />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <PaymentMethodForm id='setting-payment-methods' form={form as any} />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DeliveryDateForm id='setting-delivery-dates' form={form as any} />

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={isSubmitting}
            className='w-full mb-24'
          >
            {isSubmitting ? 'Submitting...' : `Save Setting`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingForm