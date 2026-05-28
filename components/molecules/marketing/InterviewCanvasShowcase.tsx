'use client'

import { MessageSquare, Mic, Sparkles } from 'lucide-react'
import HrdVideoFrame from '@/components/molecules/interview/HrdVideoFrame'

const stats = [
  { value: '5+', label: 'Role Tersedia' },
  { value: 'Voice-First', label: 'Interview Practice' },
  { value: 'AI HRD', label: 'Adaptive Questions' },
  { value: 'Real Feedback', label: 'Before-After Answers' },
]

export default function InterviewCanvasShowcase() {
  return (
    <div className="mx-auto mt-16 w-full max-w-3xl">
      <div className="relative rounded-[28px] border border-black/[0.08] bg-white p-2 shadow-[0_24px_80px_rgba(31,41,55,0.14),0_4px_18px_rgba(31,41,55,0.08)]">
        <div className="absolute left-5 top-5 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-white/80 backdrop-blur sm:flex">
          <Sparkles size={13} className="text-brand-red" />
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-widest">Canvas Interview</span>
        </div>

        <HrdVideoFrame state="listening" />

        <div className="absolute bottom-5 left-5 right-5 z-20 hidden items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white backdrop-blur md:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red">
              <Mic size={16} />
            </div>
            <div>
              <p className="font-display text-sm font-bold">AI HRD sedang mendengarkan</p>
              <p className="text-xs text-white/55">Jawab dengan contoh nyata dan hasil yang terukur.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65">
            <MessageSquare size={13} />
            Q2/5
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-[0_12px_44px_rgba(31,41,55,0.08)] backdrop-blur md:grid-cols-4">
        {stats.map((item, index) => (
          <div key={item.value} className="relative px-4 py-5 text-center">
            {index > 0 && <div className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-ink/10 md:block" />}
            <div className="font-display text-lg font-black text-brand-red">{item.value}</div>
            <div className="mt-1 text-xs text-muted">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
