import type { IconType } from 'react-icons'
import Card from '@/components/atoms/Card'

type FeatureCardProps = {
  title: string
  description: string
  icon: IconType
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="p-6 transition hover:-translate-y-1 hover:shadow-strong">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-black text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
    </Card>
  )
}
