'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'white'
type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red text-white shadow-[0_4px_20px_rgba(230,57,70,0.28),0_1px_3px_rgba(0,0,0,0.1)] hover:bg-brand-red-dark hover:-translate-y-0.5',
  secondary:
    'border border-ink/15 bg-white text-ink shadow-soft hover:border-ink/35 hover:bg-white',
  ghost: 'text-ink/70 hover:bg-ink/5 hover:text-ink',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  white: 'bg-white text-brand-red hover:bg-white/90',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  withArrow?: boolean
  className?: string
}

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    loading?: boolean
  }

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    loading?: never
  }

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  withArrow,
  className,
  href,
  loading,
  ...props
}: NativeButtonProps | LinkButtonProps) {
  const buttonClass = cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-display font-bold tracking-normal transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )

  const content = (
    <>
      {loading ? 'Memproses...' : children}
      {withArrow && <FiArrowRight aria-hidden="true" className="h-4 w-4" />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={buttonClass} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={buttonClass}
      disabled={(props as ButtonHTMLAttributes<HTMLButtonElement>).disabled || loading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
