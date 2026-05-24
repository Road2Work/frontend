import { motion } from 'motion/react'

const BAR_HEIGHTS = [4, 10, 18, 28, 22, 36, 26, 16, 30, 20, 12, 24, 32, 16, 7]

type WaveformBarsProps = {
  active: boolean
  color?: string
}

export default function WaveformBars({ active, color = '#22C55E' }: WaveformBarsProps) {
  return (
    <div className="flex h-12 w-full items-end justify-center gap-1">
      {BAR_HEIGHTS.map((height, index) => (
        <motion.div
          key={index}
          className="max-w-1 flex-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={
            active
              ? {
                  height: [height * 0.3, height, height * 1.5, height * 0.8, height * 0.3],
                  opacity: [0.3, 0.8, 1, 0.7, 0.3],
                }
              : { height: 3, opacity: 0.1 }
          }
          transition={
            active
              ? { duration: 0.6 + (index % 5) * 0.1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.035 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}
