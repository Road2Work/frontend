import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ScoreRing from '@/components/molecules/ScoreRing'

export default function ScoreSummaryCard() {
  return (
    <Card className="p-8 text-center">
      <Badge tone="amber">Hampir Siap</Badge>
      <div className="my-8">
        <ScoreRing score={72} />
      </div>
      <h1 className="font-display text-3xl font-black text-ink">Interview Readiness Score</h1>
      <p className="mt-3 text-sm leading-7 text-muted">Target role: Data Analyst - Evidence Level 3/5</p>
      <div className="mt-7 flex flex-col gap-3">
        <Button href="/start" withArrow>
          Latihan Lagi
        </Button>
        <Button href="/start" variant="secondary">
          Coba Role Lain
        </Button>
      </div>
    </Card>
  )
}
