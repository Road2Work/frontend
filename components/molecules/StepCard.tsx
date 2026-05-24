import type { IconType } from 'react-icons'
import Card from '@/components/atoms/Card'

type StepCardProps = {
  index: number
  title: string
  description: string
  icon: IconType
}

export default function StepCard({ index, title, description, icon: Icon }: StepCardProps) {
  return (
    <div className="relative">
      <Card className="h-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-red shadow-soft ring-1 ring-ink/10">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <span className="font-mono text-xs font-black text-brand-red">0{index}</span>
        </div>
        <h3 className="font-display text-lg font-black text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </Card>
    </div>
  )
}
