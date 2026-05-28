import { AnimatePresence, motion } from 'motion/react'
import type { InterviewState } from '@/constants/interview'

type QuestionBubbleProps = {
  question: string
  state: InterviewState
}

export default function QuestionBubble({ question, state }: QuestionBubbleProps) {
  const isIdle = state === 'idle'
  const isCompleted = state === 'completed'
  const displayText = isIdle
    ? 'HRD siap memulai interview. Dengarkan pertanyaan pertama setelah sesi dimulai.'
    : isCompleted
      ? 'Sesi interview selesai. Hasil latihanmu sedang disiapkan.'
      : `"${question}"`

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${state}-${question}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32 }}
        className="mt-5 w-full"
      >
        <div className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.038] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {state === 'clarifying' && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-red/25 bg-brand-red/10 px-2.5 py-0.5">
              <div className="h-1 w-1 rounded-full bg-brand-red" />
              <span className="font-mono text-[0.56rem] font-semibold uppercase tracking-widest text-brand-red">Klarifikasi</span>
            </div>
          )}
          <p className={state === 'listening' ? 'text-[0.9rem] leading-7 text-white/45' : 'text-[0.9rem] leading-7 text-white/80'}>
            {displayText}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
