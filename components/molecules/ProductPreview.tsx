import { FiBarChart2, FiFileText, FiMic } from 'react-icons/fi'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import ProgressBar from '@/components/molecules/ProgressBar'
import ScoreRing from '@/components/molecules/ScoreRing'

export default function ProductPreview() {
  return (
    <Card id="product" className="overflow-hidden rounded-[28px] shadow-strong">
      <div className="border-b border-ink/10 bg-white px-6 py-5">
        <Badge tone="red">Preview Langsung</Badge>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-bold text-muted">
          {[
            { label: 'Pengalaman', icon: FiFileText },
            { label: 'Interview', icon: FiMic },
            { label: 'Kesiapan', icon: FiBarChart2 },
          ].map((item, index) => (
            <div key={item.label} className="relative">
              {index < 2 && <span className="absolute left-1/2 top-6 h-0.5 w-full bg-brand-red/25" />}
              <div className="relative mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red text-white shadow-[0_12px_24px_rgba(230,57,70,0.22)]">
                <item.icon className="h-5 w-5" />
              </div>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid min-h-[300px] grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="bg-ink p-6 text-white">
          <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase text-white/40">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-red" />
              Live HRD Interview
            </span>
            <span>Q2/5 04:21</span>
          </div>
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-8 ring-white/5">
              <FiMic className="h-9 w-9 text-brand-red" />
              <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-ink bg-emerald-500" />
            </div>
            <Badge tone="red">Mendengarkan</Badge>
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5 text-left text-sm leading-7 text-white/70">
              Ceritakan project saat kamu meningkatkan kualitas data. Apa yang kamu lakukan, dan apa yang berubah setelahnya?
            </div>
            <div className="mt-7 flex h-12 items-end gap-1">
              {[16, 28, 44, 24, 52, 38, 58, 28, 46, 34, 20, 42, 30].map((height, index) => (
                <span
                  key={index}
                  className="w-1.5 rounded-full bg-brand-red"
                  style={{ height, opacity: 0.25 + height / 90 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-paper p-6">
          <h3 className="font-display text-lg font-black text-ink">Readiness Score</h3>
          <div className="my-6 flex justify-center">
            <ScoreRing score={72} size={112} />
          </div>
          <div className="space-y-4">
            <ProgressBar label="STAR Structure" value={78} tone="green" />
            <ProgressBar label="Kedalaman Evidence" value={55} />
            <ProgressBar label="Komunikasi" value={82} tone="green" />
          </div>
          <div className="mt-6 rounded-2xl border border-brand-red/15 bg-brand-red/5 p-4 text-sm text-ink">
            <strong className="text-brand-red">Berikutnya:</strong> perkuat evidence dengan tools, kontribusi, dan impact yang konkret.
          </div>
        </div>
      </div>
    </Card>
  )
}
