import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import ProgressBar from '@/components/molecules/ProgressBar'

type BreakdownItem = {
  label: string
  score: number
}

export default function BreakdownCard({ items }: { items: BreakdownItem[] }) {
  return (
    <Card className="p-8">
      <Badge tone="red">Rincian Skor</Badge>
      <h2 className="mt-4 font-display text-3xl font-black text-ink">
        Jawaban kamu relevan, tetapi evidence masih perlu detail tambahan.
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map(item => (
          <ProgressBar
            key={item.label}
            label={item.label}
            value={item.score}
            tone={item.score >= 80 ? 'green' : item.score >= 70 ? 'amber' : 'red'}
          />
        ))}
      </div>
    </Card>
  )
}
