'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import Card from '@/components/atoms/Card'
import { allRoles } from '@/data/road2work'

const capsuleLayout = [
  { x: 34, y: 38, rotate: -7 },
  { x: 238, y: 24, rotate: 4 },
  { x: 458, y: 48, rotate: -3 },
  { x: 628, y: 30, rotate: 6 },
  { x: 104, y: 148, rotate: 5 },
  { x: 374, y: 154, rotate: -5 },
]

export default function RoleCapsulePlayground() {
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const items = [...allRoles, 'Role lain segera hadir']

  return (
    <Card className="overflow-hidden p-5 sm:p-7 lg:p-8">
      <div
        ref={constraintsRef}
        className="relative min-h-[300px] cursor-grab rounded-[28px] border border-dashed border-ink/10 bg-[radial-gradient(circle_at_30%_20%,rgba(230,57,70,0.08),transparent_34%),linear-gradient(135deg,#ffffff_0%,#fbf8f3_100%)] active:cursor-grabbing sm:min-h-[280px] lg:min-h-[310px]"
      >
        <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/70 px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-muted shadow-soft">
          Geser role
        </div>

        <div className="hidden sm:block">
          {items.map((role, index) => (
            <DraggableCapsule
              key={role}
              role={role}
              index={index}
              constraintsRef={constraintsRef}
              className="absolute"
              baseRotate={capsuleLayout[index]?.rotate ?? 0}
              style={{
                left: capsuleLayout[index]?.x ?? 24,
                top: capsuleLayout[index]?.y ?? 24,
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 px-4 pb-5 pt-16 sm:hidden">
          {items.map((role, index) => (
            <DraggableCapsule key={role} role={role} index={index} constraintsRef={constraintsRef} />
          ))}
        </div>
      </div>
    </Card>
  )
}

function DraggableCapsule({
  role,
  index,
  constraintsRef,
  className,
  style,
  baseRotate = 0,
}: {
  role: string
  index: number
  constraintsRef: React.RefObject<HTMLDivElement | null>
  className?: string
  style?: React.CSSProperties
  baseRotate?: number
}) {
  const isSoon = role.includes('segera hadir')

  return (
    <motion.button
      type="button"
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.18}
      whileHover={{ y: -4, scale: 1.04, rotate: 0 }}
      whileTap={{ scale: 0.97, cursor: 'grabbing' }}
      initial={{ opacity: 0, scale: 0.92, y: 18, rotate: baseRotate }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: baseRotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'select-none rounded-full px-6 py-4 font-display text-sm font-bold shadow-[0_10px_28px_rgba(31,41,55,0.12)] transition-colors',
        isSoon
          ? 'border border-dashed border-brand-red/35 bg-brand-red/5 text-brand-red'
          : 'border border-ink/10 bg-white text-ink hover:text-brand-red',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {role}
    </motion.button>
  )
}
