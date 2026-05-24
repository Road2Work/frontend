import type { ComponentType } from 'react'
import Card from '@/components/atoms/Card'

type InsightListCardProps = {
  title: string
  icon: ComponentType<{ className?: string }>
  items: string[]
  tone?: 'success' | 'danger'
}

const toneClass = {
  success: 'text-emerald-600 bg-paper',
  danger: 'text-brand-red bg-brand-red/5',
}

export default function InsightListCard({ title, icon: Icon, items, tone = 'success' }: InsightListCardProps) {
  return (
    <Card className="p-7">
      <div className="mb-6 flex items-center gap-3">
        <Icon className={`h-6 w-6 ${tone === 'success' ? 'text-emerald-600' : 'text-brand-red'}`} />
        <h2 className="font-display text-2xl font-black text-ink">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item} className={`rounded-2xl p-4 text-sm leading-7 text-muted ${toneClass[tone]}`}>
            {item}
          </div>
        ))}
      </div>
    </Card>
  )
}
