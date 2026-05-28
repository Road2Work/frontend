'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ShieldCheck, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Textarea from '@/components/atoms/Textarea'
import { profileService } from '@/services/profile.service'
import { roleFitService } from '@/services/role-fit.service'
import type { Profile, SkillEvidence } from '@/types/api-contract'

export default function ProfileReviewTemplate() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [tools, setTools] = useState<string[]>([])
  const [skillEvidence, setSkillEvidence] = useState<SkillEvidence[]>([])
  const [achievements, setAchievements] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newTool, setNewTool] = useState('')
  const [newAchievement, setNewAchievement] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const source = profile?.source ?? (profile?.contextSource === 'cv' ? 'cv' : 'manual')
  const completeness = profile?.profileCompleteness ?? 0
  const evidenceScore = profile?.evidenceScore ?? profile?.initialEvidenceScore ?? 0

  useEffect(() => {
    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'
    profileService.getProfile(profileId).then(response => {
      const data = response.data.profile
      setProfile(data)
      setSummary(data.professionalSummary ?? data.profileSummary ?? '')
      setSkills(data.skills)
      setTools(data.tools)
      setSkillEvidence(data.skillEvidence ?? [])
      setAchievements(data.achievementSignals ?? data.evidenceItems ?? [])
    })
  }, [])

  const nextDestination = useMemo(() => (source === 'cv' ? '/role-fit' : '/onboarding'), [source])

  const addChip = (type: 'skill' | 'tool') => {
    const value = type === 'skill' ? newSkill.trim() : newTool.trim()
    if (!value) return
    if (type === 'skill') {
      setSkills(current => Array.from(new Set([...current, value])))
      setNewSkill('')
    } else {
      setTools(current => Array.from(new Set([...current, value])))
      setNewTool('')
    }
  }

  const addAchievement = () => {
    const value = newAchievement.trim()
    if (!value) return
    setAchievements(current => Array.from(new Set([...current, value])))
    setNewAchievement('')
  }

  const handleConfirm = async () => {
    if (!profile || isSubmitting) return
    setIsSubmitting(true)
    try {
      const updated = await profileService.updateProfile(profile.id, {
        professionalSummary: summary,
        skills,
        tools,
        skillEvidence,
        achievementSignals: achievements,
      })
      await profileService.confirmProfile(profile.id)
      window.sessionStorage.setItem('road2work:profile-id', updated.data.profile.id)
      window.sessionStorage.setItem('road2work:profile-status', 'confirmed')

      if (source === 'manual') {
        const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? updated.data.profile.selectedRoleId ?? 'role_data_analyst'
        await roleFitService.calculateScore({ profileId: profile.id, roleId })
        await roleFitService.confirmRole({ profileId: profile.id, roleId })
      }

      toast.success('Profil latihan dikonfirmasi', {
        description: source === 'cv' ? 'Berikutnya, pilih role yang paling sesuai dari rekomendasi.' : 'Target role kamu siap dipakai untuk latihan interview.',
      })
      router.push(nextDestination)
    } catch (error) {
      toast.error('Gagal menyimpan profil', {
        description: error instanceof Error ? error.message : 'Coba ulangi proses review.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo={source === 'cv' ? '/setup' : '/start'} backLabel="Kembali" />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <Badge tone="red">Review Profil</Badge>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] font-black leading-tight text-ink">
            Cek dulu sebelum lanjut.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Pastikan ringkasan, skill, tools, dan bukti pengalaman sudah mewakili cerita terbaikmu.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <Card className="p-6">
              <Label htmlFor="summary">Ringkasan profesional</Label>
              <p className="mt-1 text-xs text-muted">Ceritakan siapa kamu secara profesional — fokus, keahlian utama, dan nilai yang kamu bawa. Ini jadi kesan pertama sistem terhadap profilmu.</p>
              <Textarea id="summary" value={summary} onChange={event => setSummary(event.target.value)} className="mt-3 min-h-32" />
            </Card>

            <EditableChipsCard
              title="Skill"
              description="Kemampuan teknis atau non-teknis yang relevan dengan target kariermu. Semakin spesifik, semakin kuat profilmu."
              value={newSkill}
              placeholder="Tambah skill, contoh: SQL"
              items={skills}
              onValueChange={setNewSkill}
              onAdd={() => addChip('skill')}
              onRemove={item => setSkills(current => current.filter(skill => skill !== item))}
            />

            <EditableChipsCard
              title="Tools"
              description="Perangkat lunak, platform, atau alat yang kamu gunakan sehari-hari. Contoh: Figma, Tableau, VS Code, Jira."
              value={newTool}
              placeholder="Tambah tools, contoh: Tableau"
              items={tools}
              onValueChange={setNewTool}
              onAdd={() => addChip('tool')}
              onRemove={item => setTools(current => current.filter(tool => tool !== item))}
            />

            <Card className="p-6">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="font-display text-xl font-black text-ink">Bukti per skill</h2>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setSkillEvidence(current => [
                      ...current,
                      { skillName: skills[0] ?? 'Skill baru', evidenceText: '', evidenceLevel: 3, source: 'user_edit' },
                    ])
                  }
                >
                  <Plus className="h-4 w-4" /> Tambah
                </Button>
              </div>
              <p className="mb-4 text-xs text-muted">Hubungkan tiap skill dengan pengalaman nyata. Ini membantu sistem menilai kedalaman kemampuanmu — bukan sekadar daftar kata kunci.</p>
              <div className="space-y-3">
                {skillEvidence.map((item, index) => (
                  <div key={`${item.skillName}-${index}`} className="grid gap-3 rounded-2xl border border-black/[0.06] p-4 md:grid-cols-[180px_1fr_auto]">
                    <Input value={item.skillName} onChange={event => { const v = event.target.value; setSkillEvidence(current => current.map((row, rowIndex) => (rowIndex === index ? { ...row, skillName: v } : row))) }} />
                    <Textarea value={item.evidenceText} onChange={event => { const v = event.target.value; setSkillEvidence(current => current.map((row, rowIndex) => (rowIndex === index ? { ...row, evidenceText: v } : row))) }} placeholder="Bukti pengalaman" className="min-h-[60px]" />
                    <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-brand-red/10 hover:text-brand-red" onClick={() => setSkillEvidence(current => current.filter((_, rowIndex) => rowIndex !== index))}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <EditableChipsCard
              title="Pencapaian"
              description="Tunjukkan dampak konkret kerjamu — lebih baik dengan angka. Contoh: 'Meningkatkan retensi user 20%' atau 'Merampingkan proses hingga hemat 3 jam/minggu'."
              value={newAchievement}
              placeholder="Contoh: completion rate naik 12%"
              items={achievements}
              onValueChange={setNewAchievement}
              onAdd={addAchievement}
              onRemove={item => setAchievements(current => current.filter(achievement => achievement !== item))}
            />
          </div>

          <aside className="space-y-5">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                <ShieldCheck className="h-4 w-4" />
                Kualitas Profil
              </div>
              <Metric
                label="Bukti Pengalaman"
                value={evidenceScore}
                hint="Seberapa kuat skill-mu didukung pengalaman nyata, bukan sekadar klaim."
              />
              <Metric
                label="Kelengkapan Profil"
                value={completeness}
                hint="Persentase bagian profil yang sudah terisi — makin lengkap, makin akurat rekomendasinya."
              />
              <Metric
                label="Keyakinan Sistem"
                value={Math.round((profile?.aiConfidence ?? 0.82) * 100)}
                hint="Tingkat kepercayaan AI bahwa profil ini cukup akurat untuk dijadikan dasar evaluasi interview."
              />
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-lg font-black text-ink">Berikutnya</h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                {source === 'cv'
                  ? 'Kamu akan melihat rekomendasi role berdasarkan isi CV, lalu memilih role yang ingin dilatih.'
                  : 'Kamu akan langsung masuk ke persiapan interview untuk target role yang sudah dipilih.'}
              </p>
              <Button type="button" size="lg" className="mt-5 w-full" withArrow={!isSubmitting} loading={isSubmitting} onClick={handleConfirm}>
                Konfirmasi Profil
              </Button>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

function EditableChipsCard({
  title,
  description,
  value,
  placeholder,
  items,
  onValueChange,
  onAdd,
  onRemove,
}: {
  title: string
  description?: string
  value: string
  placeholder: string
  items: string[]
  onValueChange: (value: string) => void
  onAdd: () => void
  onRemove: (item: string) => void
}) {
  return (
    <Card className="p-6">
      <h2 className="font-display text-xl font-black text-ink">{title}</h2>
      {description && <p className="mt-1 text-xs text-muted">{description}</p>}
      <div className="mt-4 flex gap-2">
        <Input value={value} placeholder={placeholder} onChange={event => onValueChange(event.target.value)} onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault()
            onAdd()
          }
        }} />
        <Button type="button" variant="secondary" onClick={onAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map(item => (
          <button key={item} type="button" onClick={() => onRemove(item)} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-brand-red/30 hover:text-brand-red">
            {item}
            <Trash2 className="h-3 w-3" />
          </button>
        ))}
      </div>
    </Card>
  )
}

function Metric({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="font-display font-black text-ink">{value}</span>
      </div>
      {hint && <p className="mb-2 text-xs leading-relaxed text-muted">{hint}</p>}
      <div className="h-2 rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-brand-red transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  )
}
