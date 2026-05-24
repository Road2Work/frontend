export default function HowItWorksNote() {
  return (
    <div className="mb-6 rounded-2xl border border-brand-red/15 bg-brand-red/5 p-5">
      <div className="mb-2 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-brand-red">
        <div className="h-px w-3 bg-brand-red" />
        How It Works
      </div>
      <p className="text-sm leading-relaxed text-ink">
        Jawab setiap pertanyaan dengan <strong>voice</strong>. AI HRD akan mendengarkan dan dapat memberi pertanyaan follow-up jika jawaban kamu butuh detail atau evidence yang lebih kuat. Jawablah spesifik dan gunakan contoh nyata dari pengalaman kamu.
      </p>
    </div>
  )
}
