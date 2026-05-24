import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import type { OnboardingChecklistItem } from '@/constants/interview'

type ChecklistItemProps = {
  item: OnboardingChecklistItem
  index: number
  checked: boolean
  onToggle: () => void
}

export default function ChecklistItem({ item, index, checked, onToggle }: ChecklistItemProps) {
  const Icon = item.icon

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.07 }}
      onClick={onToggle}
      className="flex w-full items-center gap-4 rounded-2xl text-left transition hover:-translate-y-0.5"
      style={{
        padding: '1rem 1.25rem',
        backgroundColor: checked ? 'rgba(34,197,94,0.04)' : '#FDFDFD',
        border: checked ? '2px solid rgba(34,197,94,0.25)' : '1px solid rgba(0,0,0,0.07)',
        borderRadius: 16,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition"
        style={{ backgroundColor: checked ? 'rgba(34,197,94,0.12)' : 'rgba(230,57,70,0.07)' }}
      >
        {checked ? <Check size={18} style={{ color: '#22C55E' }} /> : <Icon size={18} style={{ color: '#E63946' }} />}
      </div>

      <div className="flex-1">
        <div
          className="font-display text-sm font-semibold tracking-[-0.01em] text-ink transition"
          style={{ textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.4 : 1 }}
        >
          {item.label}
        </div>
        <div className="mt-0.5 text-xs text-[#A0A0A0]">{item.desc}</div>
      </div>

      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition"
        style={{ backgroundColor: checked ? '#22C55E' : 'transparent', border: checked ? 'none' : '2px solid #E0E0E0' }}
      >
        {checked && <Check size={11} className="text-white" />}
      </div>
    </motion.button>
  )
}
