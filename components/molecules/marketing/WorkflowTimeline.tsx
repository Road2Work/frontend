'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import type { IconItem } from '@/data/road2work'
import { workflowSteps } from '@/data/road2work'

export default function WorkflowTimeline() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <div ref={ref} className="relative mt-14">
      <motion.div
        className="absolute left-[12.5%] right-[12.5%] top-16 hidden border-t-2 border-dashed border-brand-red/35 lg:block"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {workflowSteps.map((step, index) => (
          <TimelineStep key={step.title} step={step} index={index} active={inView} />
        ))}
      </div>
    </div>
  )
}

function TimelineStep({ step, index, active }: { step: IconItem; index: number; active: boolean }) {
  const Icon = step.icon
  const itemNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className="relative text-center"
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.08 + index * 0.12,
      }}
    >
      <div className="relative mx-auto mb-7 flex h-32 w-32 items-center justify-center rounded-[28px] border border-black/[0.03] bg-white text-brand-red shadow-[0_18px_55px_rgba(31,41,55,0.08)]">
        <Icon className="h-9 w-9" aria-hidden="true" />
        <motion.div
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-red font-mono text-sm font-bold text-white shadow-[0_10px_24px_rgba(230,57,70,0.35)]"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.42, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {index + 1}
        </motion.div>
      </div>

      <div className="font-mono text-2xl font-bold tracking-wide text-brand-red">{itemNumber}</div>
      <h3 className="mt-3 font-display text-xl font-bold leading-tight text-ink">{step.title}</h3>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-muted">{step.description}</p>
    </motion.article>
  )
}
