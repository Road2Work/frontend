import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'

export default function AnswerImprovementCard() {
  return (
    <Card className="p-7">
      <Badge tone="red">Perbaikan Jawaban Before-After</Badge>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <AnswerBox
          title="Sebelum"
          text="Saya pernah membuat dashboard untuk tugas kuliah dan membersihkan data agar hasilnya lebih rapi."
          className="bg-paper"
        />
        <AnswerBox
          title="Sesudah"
          text="Pada project dashboard kuliah, saya bertanggung jawab membersihkan data, memastikan format konsisten, lalu menyajikan insight yang lebih mudah dibaca oleh tim."
          className="border border-brand-red/20 bg-brand-red/5"
        />
      </div>
      <p className="mt-5 text-sm leading-7 text-muted">
        Versi sesudah lebih kuat karena menjelaskan konteks, tanggung jawab, dan hasil tanpa menambahkan fakta baru di luar jawaban user.
      </p>
    </Card>
  )
}

function AnswerBox({ title, text, className }: { title: string; text: string; className: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`}>
      <h3 className="font-display text-xl font-black text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
    </div>
  )
}
