import { toast as sonnerToast } from 'sonner'

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export const toast = ({ title, description, variant = 'default' }: ToastProps) => {
  if (variant === 'destructive') {
    sonnerToast.error(title || description || 'Error', { description: title ? description : undefined })
  } else {
    sonnerToast(title || description || 'Success', { description: title ? description : undefined })
  }
}

export const useToast = () => {
  return { toast }
}