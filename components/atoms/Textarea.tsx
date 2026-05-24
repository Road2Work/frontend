'use client'

import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = ({ className, error, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        'min-h-28 w-full resize-y rounded-2xl border bg-white px-4 py-3 text-sm leading-6 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:text-muted',
        error ? 'border-brand-red ring-4 ring-brand-red/10' : 'border-border-soft focus:border-brand-red focus:ring-4 focus:ring-brand-red/10',
        className,
      )}
      {...props}
    />
  )
}

export default Textarea
