import { motion } from 'motion/react'

export default function StateSpinner({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
      className={`${className} rounded-full border-2 border-white/25 border-t-white`}
    />
  )
}
