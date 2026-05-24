import { Mic, MicOff } from 'lucide-react'
import { motion } from 'motion/react'
import { interviewStateConfig, type InterviewState } from '@/constants/interview'
import StateSpinner from './StateSpinner'

type MicControlProps = {
  state: InterviewState
  onClick: () => void
}

export default function MicControl({ state, onClick }: MicControlProps) {
  const config = interviewStateConfig[state]
  const disabled = state === 'thinking'

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      className="relative flex h-24 w-24 items-center justify-center rounded-full disabled:cursor-default"
      animate={{ backgroundColor: config.micBg, boxShadow: config.micShadow }}
    >
      {state === 'thinking' ? (
        <StateSpinner className="h-8 w-8 border-white/15 border-t-white/55" />
      ) : state === 'listening' ? (
        <MicOff size={34} className="text-white" />
      ) : (
        <Mic size={34} className="text-white" />
      )}
    </motion.button>
  )
}
