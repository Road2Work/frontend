'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, FilePenLine, Lightbulb, Plus, ShieldCheck, Sparkles, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Textarea from '@/components/atoms/Textarea'
import PageState from '@/components/molecules/PageState'
import { AppError } from '@/lib/api'
import { profileService } from '@/services/profile.service'
import { roleFitService } from '@/services/role-fit.service'
import type { Profile, SkillEvidence } from '@/types/api-contract'

export default function ProfileReviewTemplate() {
  const router = useRouter()
  const locationSearch = useSyncExternalStore(subscribeLocationSearch, getLocationSearchSnapshot, getServerLocationSearchSnapshot)
  const isEditMode = new URLSearchParams(locationSearch).get('mode') === 'edit'
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
  const [profileUnavailable, setProfileUnavailable] = useState(false)

  const source = profile?.source ?? (profile?.contextSource === 'cv' ? 'cv' : 'manual')
  const completeness = normalizeScore(profile?.profileCompleteness ?? estimateProfileCompleteness(summary, skills, tools, achievements))
  const evidenceScore = normalizeScore(profile?.evidenceScore ?? profile?.initialEvidenceScore ?? estimateEvidenceScore(skills, achievements))
  const totalSignals = skills.length + tools.length + achievements.length
  const hasReviewableProfile = Boolean(summary.trim() && skills.length && tools.length)
  const hasExtractedSignals = Boolean(skills.length || tools.length || achievements.length)

  useEffect(() => {
    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'
    const cachedProfile = readCachedProfile()

    if (cachedProfile) {
      applyProfile(cachedProfile)
    }

    profileService
      .getProfile(profileId)
      .then(response => {
        const data = response.data.profile
        window.sessionStorage.setItem('road2work:profile-cache', JSON.stringify(data))
        applyProfile(data)
        setProfileUnavailable(false)
      })
      .catch(error => {
        const isMissingProfile = error instanceof AppError && error.status === 404

        if (isMissingProfile) {
          if (cachedProfile) {
            setProfileUnavailable(false)
            toast.info('Profil ini belum tersimpan di database lokal', {
              description: 'Kamu tetap bisa lanjut. Saat dikonfirmasi, Road2Work akan menyimpan ulang profil dari data yang sedang kamu review.',
            })
            return
          }

          clearStoredProfile()
          resetProfileForm()
          setProfileUnavailable(true)
          toast.error('Profil latihan sudah tidak tersedia', {
            description: 'Database lokal kemungkinan baru di-reset. Upload CV atau isi profil lagi agar data tersimpan ulang.',
          })
          return
        }

        if (!cachedProfile) {
          toast.error('Profil belum bisa dimuat', {
            description: error instanceof Error ? error.message : 'Ulangi upload CV atau isi profil singkat.',
          })
        }
      })
  }, [])

  const applyProfile = (data: Profile) => {
    setProfile(data)
    setSummary(buildProfileSummary(data))
    setSkills(data.skills ?? [])
    setTools(data.tools ?? [])
    setSkillEvidence(data.skillEvidence?.length ? data.skillEvidence : buildSkillEvidence(data))
    setAchievements(data.achievementSignals ?? data.evidenceItems ?? [])
  }

  const nextDestination = useMemo(() => getNextDestination(profile, source, isEditMode), [profile, source, isEditMode])

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
      await confirmProfileIfAvailable(profile.id)
      await afterProfileConfirmed(updated.data.profile)
      const destination = getNextDestination(updated.data.profile, source, isEditMode)

      toast.success('Profil latihan dikonfirmasi', {
        description: destination === '/hub'
          ? 'Dashboard kesiapanmu sudah diperbarui dengan profil terbaru.'
          : source === 'cv'
            ? 'Berikutnya, pilih role yang paling sesuai dari rekomendasi.'
            : 'Target role kamu siap dipakai untuk latihan interview.',
      })
      router.push(destination)
    } catch (error) {
      if (error instanceof AppError && error.status === 404) {
        try {
          const recovered = await recoverProfileFromReview()
          await afterProfileConfirmed(recovered)
          const destination = getNextDestination(recovered, source, isEditMode)

          toast.success('Profil latihan berhasil disimpan ulang', {
            description: 'Data review kamu sudah disinkronkan ke database lokal. Lanjut ke tahap berikutnya.',
          })
          router.push(destination)
        } catch (recoveryError) {
          clearStoredProfile()
          resetProfileForm()
          setProfileUnavailable(true)
          toast.error('Profil latihan tidak bisa dipulihkan', {
            description: recoveryError instanceof Error ? recoveryError.message : 'Buat profil ulang dari CV atau profil singkat.',
          })
        }
        return
      }

      toast.error('Gagal menyimpan profil', {
        description: error instanceof Error ? error.message : 'Coba ulangi proses review.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const afterProfileConfirmed = async (updatedProfile: Profile) => {
    window.sessionStorage.setItem('road2work:profile-id', updatedProfile.id)
    window.sessionStorage.setItem('road2work:profile-cache', JSON.stringify(updatedProfile))
    window.sessionStorage.setItem('road2work:profile-status', 'confirmed')
    applyProfile(updatedProfile)
    setProfileUnavailable(false)

    if (source === 'manual') {
      const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? updatedProfile.selectedRoleId ?? updatedProfile.targetRoleId ?? 'role_data_analyst'
      await roleFitService.calculateScore({ profileId: updatedProfile.id, roleId })
      await roleFitService.confirmRole({ profileId: updatedProfile.id, roleId })
    }
  }

  const recoverProfileFromReview = async () => {
    const targetRoleId = profile?.targetRoleId ?? window.sessionStorage.getItem('road2work:selected-role-id') ?? 'role_data_analyst'
    const created = await profileService.createProfile({ targetRoleId })
    const profileId = created.data.profile.id

    const updated = await saveReviewToProfile(profileId)
    await confirmProfileIfAvailable(profileId)

    return updated.data.profile
  }

  const saveReviewToProfile = async (profileId: string) => {
    try {
      return await profileService.updateProfile(profileId, {
        professionalSummary: summary,
        skills,
        tools,
        skillEvidence,
        achievementSignals: achievements,
      })
    } catch (error) {
      if (!(error instanceof AppError) || error.status !== 404) throw error

      return profileService.submitShortProfile(profileId, {
        mostRelevantExperience: summary || achievements.join('. ') || 'Pengalaman profesional belum dirinci.',
        skillsAndTools: Array.from(new Set([...skills, ...tools])).join(', ') || 'Skill dan tools belum dirinci.',
        projectExperience: skillEvidence.map(item => item.evidenceText).filter(Boolean).join('\n'),
        achievementOrImpact: achievements.join('\n'),
      })
    }
  }

  const confirmProfileIfAvailable = async (profileId: string) => {
    try {
      await profileService.confirmProfile(profileId)
    } catch (error) {
      if (!(error instanceof AppError) || error.status !== 404) throw error
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo={isEditMode ? '/hub' : source === 'cv' ? '/setup' : '/start'} backLabel="Kembali" />

      <main className="mx-auto max-w-6xl px-5 py-10">
        {profileUnavailable ? (
          <PageState
            type="empty"
            title="Profil latihan perlu dibuat ulang"
            description="Profile ID yang tersimpan di browser sudah tidak ada di database lokal. Ini biasa terjadi setelah database di-reset. Mulai ulang dari upload CV atau isi profil singkat."
            actionLabel="Bangun Profil Lagi"
            actionHref="/career-onboarding"
          />
        ) : (
          <>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <Badge tone="red">Review Profil</Badge>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] font-black leading-tight text-ink">
            {isEditMode ? 'Perbarui profil latihanmu.' : 'Cek dulu sebelum lanjut.'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            {isEditMode ? 'Edit bagian yang perlu diperkuat. Setelah disimpan, dashboard akan menghitung ulang skor profil dan prioritas latihanmu.' : 'Ini adalah hasil pembacaan awal dari CV atau profilmu. Rapikan bagian yang kurang tepat, tambah bukti yang penting, lalu konfirmasi sebelum masuk ke tahap berikutnya.'}
          </p>
        </motion.div>

        <Card className="mb-6 overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={source === 'cv' ? 'red' : 'amber'}>{source === 'cv' ? 'Upload CV' : 'Profil Manual'}</Badge>
                <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
                  {totalSignals} sinyal profil terbaca
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-black text-ink">
                {hasReviewableProfile
                  ? 'Profilmu sudah terbaca. Tinggal dirapikan.'
                  : hasExtractedSignals
                    ? 'Skill dan tools sudah terbaca. Lengkapi ringkasannya.'
                    : 'Lengkapi bagian penting sebelum lanjut.'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                Fokus edit di tiga hal: tulis ringkasan singkat, pastikan skill/tools yang terbaca sudah benar, lalu tambahkan bukti pengalaman yang bisa kamu ceritakan saat interview.
              </p>
            </div>
            <div className="border-t border-black/[0.06] bg-ink p-6 text-white lg:border-l lg:border-t-0">
              <div className="grid grid-cols-2 gap-3">
                <MiniStat label="Skill" value={skills.length} />
                <MiniStat label="Tools" value={tools.length} />
                <MiniStat label="Bukti" value={achievements.length + skillEvidence.length} />
                <MiniStat label="Lengkap" value={`${completeness}%`} />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <ReviewSection
              number="01"
              icon={<FilePenLine className="h-5 w-5" />}
              title="Ringkasan profesional"
              description="Tulis dengan bahasamu sendiri. Pilih pengalaman yang paling relevan, bukan semua hal yang pernah kamu kerjakan."
            >
              <Textarea
                id="summary"
                value={summary}
                onChange={event => setSummary(event.target.value)}
                placeholder="Contoh: Saya fresh graduate yang fokus pada data analytics. Saya terbiasa menggunakan SQL dan Python untuk membersihkan data, membuat analisis sederhana, dan menyajikan insight lewat dashboard."
                className="min-h-36 text-sm leading-7"
              />
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-full bg-ink/5 px-3 py-1">Ideal 2-4 kalimat</span>
                <span className="rounded-full bg-ink/5 px-3 py-1">Sebutkan role atau fokus</span>
                <span className="rounded-full bg-ink/5 px-3 py-1">Tambahkan evidence singkat</span>
              </div>
            </ReviewSection>

            <EditableChipsCard
              number="02"
              title="Skill"
              description="Kemampuan yang ingin kamu bawa ke interview. Hapus yang tidak relevan, tambah yang penting."
              value={newSkill}
              placeholder="Tambah skill, contoh: SQL"
              items={skills}
              onValueChange={setNewSkill}
              onAdd={() => addChip('skill')}
              onRemove={item => setSkills(current => current.filter(skill => skill !== item))}
            />

            <EditableChipsCard
              number="03"
              title="Tools"
              description="Perangkat, platform, framework, atau bahasa yang benar-benar pernah kamu gunakan."
              value={newTool}
              placeholder="Tambah tools, contoh: Tableau"
              items={tools}
              onValueChange={setNewTool}
              onAdd={() => addChip('tool')}
              onRemove={item => setTools(current => current.filter(tool => tool !== item))}
            />

            <ReviewSection
              number="04"
              icon={<Sparkles className="h-5 w-5" />}
              title="Bukti per skill"
              description="Hubungkan skill dengan contoh nyata. Bagian ini membantu AI HRD menyiapkan pertanyaan yang lebih relevan."
              action={
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
              }
            >
              {skillEvidence.length > 0 ? (
                <div className="space-y-3">
                  {skillEvidence.map((item, index) => (
                    <div key={`${item.skillName}-${index}`} className="rounded-[20px] border border-black/[0.06] bg-paper p-4">
                      <div className="grid gap-3 md:grid-cols-[220px_1fr_auto]">
                        <div>
                          <Label>Skill</Label>
                          <Input
                            value={item.skillName}
                            onChange={event => {
                              const value = event.target.value
                              setSkillEvidence(current => current.map((row, rowIndex) => (rowIndex === index ? { ...row, skillName: value } : row)))
                            }}
                          />
                        </div>
                        <div>
                          <Label>Bukti pengalaman</Label>
                          <Textarea
                            value={item.evidenceText}
                            onChange={event => {
                              const value = event.target.value
                              setSkillEvidence(current => current.map((row, rowIndex) => (rowIndex === index ? { ...row, evidenceText: value } : row)))
                            }}
                            placeholder="Contoh: memakai SQL untuk membersihkan data transaksi dan membuat insight penjualan mingguan."
                            className="min-h-[84px]"
                          />
                        </div>
                        <button
                          type="button"
                          aria-label="Hapus bukti skill"
                          className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-brand-red/10 hover:text-brand-red"
                          onClick={() => setSkillEvidence(current => current.filter((_, rowIndex) => rowIndex !== index))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyEditState text="Belum ada bukti per skill. Tambahkan minimal satu contoh pengalaman agar interview lebih tajam." />
              )}
            </ReviewSection>

            <EditableChipsCard
              number="05"
              title="Pencapaian"
              description="Tambahkan hasil, impact, atau kontribusi yang ingin kamu tonjolkan saat interview."
              value={newAchievement}
              placeholder="Contoh: completion rate naik 12%"
              items={achievements}
              onValueChange={setNewAchievement}
              onAdd={addAchievement}
              onRemove={item => setAchievements(current => current.filter(achievement => achievement !== item))}
            />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                <ShieldCheck className="h-4 w-4" />
                Kualitas Profil
              </div>
              <Metric label="Bukti Pengalaman" value={evidenceScore} hint="Seberapa kuat skill-mu didukung pengalaman nyata, bukan sekadar klaim." />
              <Metric label="Kelengkapan Profil" value={completeness} hint="Makin lengkap profilmu, makin akurat rekomendasi role dan pertanyaan interview." />
              <Metric label="Keyakinan Sistem" value={normalizeConfidence(profile?.aiConfidence ?? 82)} hint="Estimasi keyakinan sistem terhadap kualitas konteks profilmu." />
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-lg font-black text-ink">Berikutnya</h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                {nextDestination === '/hub'
                  ? 'Setelah disimpan, dashboard akan langsung memakai profil terbaru untuk menghitung ulang skor dan prioritas latihan.'
                  : source === 'cv'
                  ? 'Kamu akan melihat rekomendasi role berdasarkan isi CV, lalu memilih role yang ingin dilatih.'
                  : 'Kamu akan langsung masuk ke persiapan interview untuk target role yang sudah dipilih.'}
              </p>
              <Button type="button" size="lg" className="mt-5 w-full" withArrow={!isSubmitting} loading={isSubmitting} onClick={handleConfirm}>
                {isEditMode ? 'Simpan Perubahan' : 'Konfirmasi Profil'}
              </Button>
            </Card>

            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                <Lightbulb className="h-4 w-4" />
                Checklist Cepat
              </div>
              <div className="space-y-3">
                <ChecklistItem checked={Boolean(summary.trim())} text="Ringkasan sudah menjelaskan fokus karier." />
                <ChecklistItem checked={skills.length >= 3} text="Minimal 3 skill relevan sudah masuk." />
                <ChecklistItem checked={tools.length >= 2} text="Tools utama sudah ditulis." />
                <ChecklistItem checked={skillEvidence.some(item => item.evidenceText.trim())} text="Ada bukti pengalaman untuk skill utama." />
              </div>
            </Card>
          </aside>
        </div>
          </>
        )}
      </main>
    </div>
  )

  function resetProfileForm() {
    setProfile(null)
    setSummary('')
    setSkills([])
    setTools([])
    setSkillEvidence([])
    setAchievements([])
    setNewSkill('')
    setNewTool('')
    setNewAchievement('')
  }
}

function EditableChipsCard({
  number,
  title,
  description,
  value,
  placeholder,
  items,
  onValueChange,
  onAdd,
  onRemove,
}: {
  number: string
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
    <ReviewSection number={number} icon={<Plus className="h-5 w-5" />} title={title} description={description}>
      <div className="flex gap-2">
        <Input
          value={value}
          placeholder={placeholder}
          onChange={event => onValueChange(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onAdd()
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={onAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {items.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map(item => (
            <button key={item} type="button" onClick={() => onRemove(item)} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-brand-red/30 hover:text-brand-red">
              {item}
              <Trash2 className="h-3 w-3" />
            </button>
          ))}
        </div>
      ) : (
        <EmptyEditState text={`Belum ada ${title.toLowerCase()} yang masuk. Tambahkan item yang paling relevan.`} />
      )}
    </ReviewSection>
  )
}

function ReviewSection({
  number,
  icon,
  title,
  description,
  action,
  children,
}: {
  number: string
  icon: ReactNode
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <Card className="p-0">
      <div className="border-b border-black/[0.06] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
              {icon}
            </div>
            <div>
              <div className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">{number}</div>
              <h2 className="mt-1 font-display text-xl font-black text-ink">{title}</h2>
              {description && <p className="mt-1 max-w-2xl text-xs leading-6 text-muted">{description}</p>}
            </div>
          </div>
          {action}
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </Card>
  )
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
      <div className="font-display text-2xl font-black">{value}</div>
      <div className="mt-1 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/55">{label}</div>
    </div>
  )
}

function ChecklistItem({ checked, text }: { checked: boolean; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${checked ? 'text-emerald-600' : 'text-ink/20'}`} />
      <span className={`text-sm leading-6 ${checked ? 'text-ink' : 'text-muted'}`}>{text}</span>
    </div>
  )
}

function EmptyEditState({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-ink/15 bg-paper p-4 text-sm leading-6 text-muted">
      {text}
    </div>
  )
}

function Metric({ label, value, hint }: { label: string; value: number; hint?: string }) {
  const safeValue = normalizeScore(value)
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="font-display font-black text-ink">{safeValue}</span>
      </div>
      {hint && <p className="mb-2 text-xs leading-relaxed text-muted">{hint}</p>}
      <div className="h-2 rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-brand-red transition-all duration-500" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}

function subscribeLocationSearch(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange)
  return () => window.removeEventListener('popstate', onStoreChange)
}

function getLocationSearchSnapshot() {
  return window.location.search
}

function getServerLocationSearchSnapshot() {
  return ''
}
function readCachedProfile(): Profile | null {
  try {
    const raw = window.sessionStorage.getItem('road2work:profile-cache')
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

function clearStoredProfile() {
  window.sessionStorage.removeItem('road2work:profile-id')
  window.sessionStorage.removeItem('road2work:profile-cache')
  window.sessionStorage.removeItem('road2work:profile-status')
  window.sessionStorage.removeItem('road2work:profile-context-source')
}

function buildProfileSummary(profile: Profile) {
  const existing = profile.professionalSummary ?? profile.profileSummary ?? profile.experienceSummary
  if (existing?.trim()) return existing
  return ''
}

function buildSkillEvidence(profile: Profile): SkillEvidence[] {
  const summary = profile.profileSummary ?? profile.professionalSummary ?? profile.experienceSummary ?? ''
  return (profile.skills ?? []).slice(0, 8).map(skill => ({
    skillName: skill,
    evidenceText: summary || `Tambahkan contoh pengalaman yang membuktikan penggunaan ${skill}.`,
    evidenceLevel: summary ? 2 : 1,
    source: 'cv',
  }))
}


function normalizeScore(value: unknown) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.max(0, Math.min(100, Math.round(numeric)))
}

function normalizeConfidence(value: unknown) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 0
  if (numeric <= 1) return normalizeScore(numeric * 100)
  return normalizeScore(numeric)
}
function estimateProfileCompleteness(summary: string, skills: string[], tools: string[], achievements: string[]) {
  let score = 0
  if (summary.trim()) score += 30
  if (skills.length) score += Math.min(25, skills.length * 5)
  if (tools.length) score += Math.min(20, tools.length * 4)
  if (achievements.length) score += Math.min(25, achievements.length * 8)
  return Math.min(100, score)
}

function estimateEvidenceScore(skills: string[], achievements: string[]) {
  return Math.min(100, Math.max(0, skills.length * 5 + achievements.length * 10))
}

function getNextDestination(_profile: Profile | null, source: Profile['source'] | 'manual' | 'cv' | null | undefined, isEditMode = false) {
  if (isEditMode) return '/hub'
  return source === 'cv' ? '/role-fit' : '/onboarding'
}

