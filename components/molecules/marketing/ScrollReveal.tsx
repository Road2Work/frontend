'use client'

import { Children, useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: distance, filter: 'blur(8px)' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerReveal({
  children,
  className,
  childClassName,
}: {
  children: ReactNode
  className?: string
  childClassName?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => (
        <motion.div
          className={cn('h-full', childClassName)}
          initial={{ opacity: 0, y: 26, filter: 'blur(7px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 26, filter: 'blur(7px)' }}
          transition={{
            duration: 0.62,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.08 + index * 0.08,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
