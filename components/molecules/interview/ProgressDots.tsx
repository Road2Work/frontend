import { motion } from 'motion/react'

type ProgressDotsProps = {
  total: number
  current: number
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center px-6 py-4">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index <= current

        return (
          <div key={index} className="flex items-center">
            <motion.div
              className="rounded-full"
              animate={{
                width: index === current ? 28 : 8,
                height: 8,
                backgroundColor: isActive ? '#E63946' : 'rgba(255,255,255,0.12)',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            {index < total - 1 && (
              <div
                className="h-px w-5"
                style={{ backgroundColor: index < current ? 'rgba(230,57,70,0.5)' : 'rgba(255,255,255,0.08)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
