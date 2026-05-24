import type { LabelHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
  required?: boolean
}

export default function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label className={cn('mb-2 block text-sm font-semibold text-ink', className)} {...props}>
      {children}
      {required && <span className="ml-1 text-brand-red">*</span>}
    </label>
  )
}
