import { useState } from 'react'
import { Mic } from 'lucide-react'
import { motion } from 'motion/react'
import {
  interviewFrameStyles,
  interviewStateConfig,
  type InterviewState,
} from '@/constants/interview'
import StateSpinner from './StateSpinner'

type HrdVideoFrameProps = {
  state: InterviewState
}

export default function HrdVideoFrame({ state }: HrdVideoFrameProps) {
  const config = interviewStateConfig[state]
  const [failedVideoSrc, setFailedVideoSrc] = useState<string | null>(null)
  const videoFailed = failedVideoSrc === config.videoSrc
  const shouldPulse = state === 'listening' || state === 'clarifying' || state === 'asking'

  return (
    <div className="relative w-full overflow-hidden" style={interviewFrameStyles.container}>
      {!videoFailed && (
        <video
          key={config.videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          src={config.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setFailedVideoSrc(config.videoSrc)}
        />
      )}

      <div
        className="absolute inset-0"
        style={
          videoFailed
            ? { background: `radial-gradient(ellipse at 50% 50%, ${config.glowColor} 0%, transparent 65%)` }
            : interviewFrameStyles.videoOverlay
        }
      />
      <div className="absolute inset-0" style={interviewFrameStyles.vignette} />

      {videoFailed && (
        <FallbackAvatar state={state} shouldPulse={shouldPulse} />
      )}

      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-4 pt-14"
        style={interviewFrameStyles.bottomOverlay}
      >
        <div>
          <div className="font-display text-sm font-semibold text-white/85">AI HRD Road2Work</div>
          <div className="mt-0.5 font-mono text-[0.56rem] tracking-wide text-white/35">Adaptive Interview</div>
        </div>

        <motion.div
          className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5"
          animate={{ backgroundColor: config.badgeBg, borderColor: config.badgeBorder }}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={state === 'listening' || state === 'thinking' ? { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-widest" style={{ color: config.color }}>
            {config.label}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

function FallbackAvatar({ state, shouldPulse }: { state: InterviewState; shouldPulse: boolean }) {
  const config = interviewStateConfig[state]

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="relative flex h-36 w-36 items-center justify-center">
        {[1, 2, 3].map(index => (
          <motion.div
            key={index}
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${config.ringColor}` }}
            animate={shouldPulse ? { scale: [1, 1 + index * 0.28], opacity: [0.55, 0] } : { scale: 1, opacity: 0 }}
            transition={{ duration: 2, delay: index * 0.5, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        <motion.div
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full"
          style={interviewFrameStyles.avatarShell}
          animate={{
            boxShadow:
              state === 'listening' || state === 'clarifying'
                ? `0 0 0 3px ${config.ringColor}30, 0 0 48px ${config.glowColor}`
                : '0 0 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <motion.div className="flex h-16 w-16 items-center justify-center rounded-full" animate={{ background: config.orbGradient }}>
            {state === 'thinking' ? <StateSpinner /> : <Mic size={26} className="text-white" />}
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-5 font-mono text-[0.58rem] uppercase tracking-widest text-white/40">AI HRD</div>
    </div>
  )
}
