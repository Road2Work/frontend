'use client'

import { MessageSquare, Mic, Sparkles } from 'lucide-react'
import HrdVideoFrame from '@/components/molecules/interview/HrdVideoFrame'

const stats = [
  { value: '5+', label: 'Role Tersedia' },
  { value: 'Voice', label: 'Latihan Lisan' },
  { value: 'AI HRD', label: 'Pertanyaan Adaptif' },
  { value: 'Feedback', label: 'Bukti & Gap' },
]

export default function InterviewCanvasShowcase() {
  return (
    <div className="mx-auto mt-16 w-full max-w-3xl">
      <div className="relative rounded-[28px] border border-black/[0.08] bg-white p-2 shadow-[0_24px_80px_rgba(31,41,55,0.14),0_4px_18px_rgba(31,41,55,0.08)]">
        <div className="absolute left-5 top-5 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-white/80 backdrop-blur sm:flex">
          <Sparkles size={13} className="text-brand-red" />
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-widest">Interview Canvas</span>
        </div>

        <HrdVideoFrame state="listening" />

        <div className="absolute bottom-4 left-4 right-4 z-20 hidden items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur md:flex">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red">
              <Mic size={16} />
            </div>
            <div className="min-w-0 text-left">
              <p className="truncate font-display text-sm font-bold leading-5">AI HRD sedang mendengarkan</p>
              <p className="line-clamp-1 text-xs leading-5 text-white/60">Gunakan contoh nyata dan hasil terukur.</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
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
