import { motion } from 'motion/react'

type SessionSummaryCardProps = {
  checkedCount: number
  totalCount: number
}

const summaryItems = [
  { label: 'Role', value: 'Data Analyst', mono: false },
  { label: 'Durasi', value: '~15 menit', mono: true },
  { label: 'Pertanyaan', value: '5 utama', mono: true },
]

export default function SessionSummaryCard({ checkedCount, totalCount }: SessionSummaryCardProps) {
  const allChecked = checkedCount === totalCount

  return (
    <div className="mb-5 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]">
      <div className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-red">
        Sesi Kamu
      </div>

      <div className="grid grid-cols-3 gap-4">
        {summaryItems.map(item => (
          <div key={item.label}>
            <div className="mb-1 font-mono text-[0.6rem] tracking-wide text-[#A0A0A0]">{item.label}</div>
            <div className={item.mono ? 'font-mono font-bold text-ink' : 'font-display font-bold tracking-[-0.01em] text-ink'}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-black/[0.06] pt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[0.6rem] tracking-wide text-[#A0A0A0]">CHECKLIST</span>
          <span className="font-mono text-[0.65rem] font-bold" style={{ color: allChecked ? '#22C55E' : '#E63946' }}>
            {checkedCount}/{totalCount}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#F0F0F0]">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: allChecked ? '#22C55E' : '#E63946' }}
            animate={{ width: `${(checkedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}
