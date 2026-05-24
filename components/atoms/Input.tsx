'use client'

import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = ({ className, error, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-2xl border bg-white px-4 text-sm text-ink shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:text-muted',
        error ? 'border-brand-red ring-4 ring-brand-red/10' : 'border-border-soft focus:border-brand-red focus:ring-4 focus:ring-brand-red/10',
        className,
      )}
      {...props}
    />
  )
}

export default Input
