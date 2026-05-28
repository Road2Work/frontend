import { AnimatePresence, motion } from 'motion/react'
import { interviewStateConfig, type InterviewState } from '@/constants/interview'
import MicControl from './MicControl'
import WaveformBars from './WaveformBars'

type VoiceControlPanelProps = {
  state: InterviewState
  onMicClick: () => void
  answerSeconds?: number
  maxAnswerSeconds?: number
}

const leftTicks = [16, 10, 6, 3]
const rightTicks = [3, 6, 10, 16]

function DecorativeTicks({ state, ticks }: { state: InterviewState; ticks: number[] }) {
  const color = state === 'listening' ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'

  return (
    <div className="hidden items-center gap-1.5 sm:flex">
      {ticks.map((width, index) => (
        <div key={index} className="h-px rounded-full" style={{ width, backgroundColor: color }} />
      ))}
    </div>
  )
}

export default function VoiceControlPanel({
  state,
  onMicClick,
  answerSeconds = 0,
  maxAnswerSeconds = 90,
}: VoiceControlPanelProps) {
  const config = interviewStateConfig[state]
  const answerProgress = Math.min(100, Math.round((answerSeconds / maxAnswerSeconds) * 100))

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4">
      <div className="flex min-h-[72px] w-full items-center rounded-2xl border border-white/[0.05] bg-white/[0.025] px-4 py-3">
        <WaveformBars active={state === 'listening'} color={state === 'listening' ? '#22C55E' : 'rgba(255,255,255,0.08)'} />
      </div>

      {state === 'listening' && (
        <div className="w-full rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3">
          <div className="mb-2 flex items-center justify-between font-mono text-[0.62rem] tracking-wide">
            <span className="uppercase text-emerald-500">Mendengarkan</span>
            <span className="text-white/35">
              {formatDuration(answerSeconds)} / {formatDuration(maxAnswerSeconds)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              animate={{ width: `${answerProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-center gap-8">
        <DecorativeTicks state={state} ticks={leftTicks} />
        <MicControl state={state} onClick={onMicClick} />
        <DecorativeTicks state={state} ticks={rightTicks} />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={config.hint}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-[300px] text-center font-mono text-[0.62rem] tracking-wide text-white/25"
        >
          {config.hint}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function formatDuration(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, '0')
  const seconds = (value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
