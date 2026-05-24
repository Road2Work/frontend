'use client'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

function AlertDialog(props: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root {...props} />
}

function AlertDialogTrigger(props: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger {...props} />
}

function AlertDialogPortal(props: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal {...props} />
}

function AlertDialogOverlay({ className, ...props }: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/55 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({ className, ...props }: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_18px_70px_rgba(31,41,55,0.18),0_4px_18px_rgba(31,41,55,0.1)] outline-none',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('space-y-2 text-center sm:text-left', className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title className={cn('font-display text-xl font-black text-ink', className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) {
  return <AlertDialogPrimitive.Description className={cn('text-sm leading-7 text-muted', className)} {...props} />
}

function AlertDialogAction({ className, ...props }: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-full bg-brand-red px-5 font-display text-sm font-bold text-white shadow-[0_4px_20px_rgba(230,57,70,0.28),0_1px_3px_rgba(0,0,0,0.1)] transition hover:bg-brand-red-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-full border border-ink/15 bg-white px-5 font-display text-sm font-bold text-ink shadow-soft transition hover:border-ink/35 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20',
        className,
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}
