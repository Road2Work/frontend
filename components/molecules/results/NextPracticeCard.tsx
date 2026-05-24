import { FiRefreshCcw, FiTrendingUp } from 'react-icons/fi'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

export default function NextPracticeCard() {
  return (
    <Card className="p-7">
      <FiTrendingUp className="mb-5 h-7 w-7 text-brand-red" />
      <h2 className="font-display text-2xl font-black text-ink">Rekomendasi Latihan Berikutnya</h2>
      <p className="mt-4 text-sm leading-7 text-muted">
        Evidence Booster Practice. Fokus latihan berikutnya adalah memperjelas tools, kontribusi pribadi, dan impact agar jawaban lebih meyakinkan.
      </p>
      <div className="mt-7">
        <Button href="/interview" withArrow>
          <FiRefreshCcw className="h-4 w-4" />
          Latihan Lagi
        </Button>
      </div>
    </Card>
  )
}
