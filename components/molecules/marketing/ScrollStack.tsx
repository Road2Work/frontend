'use client'

import { Children, type ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import { cn } from '@/lib/utils'

type ScrollStackProps = {
  children: ReactNode
  className?: string
}

type ScrollStackItemProps = {
  children: ReactNode
  className?: string
  index?: number
}

export default function ScrollStack({ children, className }: ScrollStackProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <div className={cn('relative mx-auto flex max-w-4xl flex-col gap-8 py-8', className)}>
      {Children.map(children, (child, index) => (
        <div
          className="sticky"
          style={{
            top: `calc(5.5rem + ${index * 0.75}rem)`,
            zIndex: index + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export function ScrollStackItem({ children, className, index = 0 }: ScrollStackItemProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-6 shadow-strong transition will-change-transform hover:-translate-y-1 sm:p-8',
        className,
      )}
      style={{
        transform: `scale(${1 - index * 0.012})`,
      }}
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-brand-red/8 transition group-hover:bg-brand-red/12" />
      {children}
    </article>
  )
}
