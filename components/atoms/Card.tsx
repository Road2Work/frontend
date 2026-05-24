import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]',
        className,
      )}
      {...props}
    />
  )
}
