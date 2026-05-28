'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiFileText, FiShield, FiUploadCloud } from 'react-icons/fi'
import { toast } from 'sonner'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Textarea from '@/components/atoms/Textarea'
import AppHeader from '@/components/organisms/AppHeader'
import SelectableCard from '@/components/molecules/SelectableCard'
import { profileService } from '@/services/profile.service'

export default function InterviewSetupTemplate() {
  const router = useRouter()
  const onboardingPath = typeof window === 'undefined' ? 'cv' : (window.sessionStorage.getItem('road2work:onboarding-path') ?? 'cv')
  const selectedRoleName = typeof window === 'undefined' ? 'target role' : (window.sessionStorage.getItem('road2work:selected-role-name') ?? 'target role')
  const [source, setSource] = useState<'cv' | 'profile'>(() => {
    if (typeof window === 'undefined') return 'cv'
    return window.sessionStorage.getItem('road2work:onboarding-path') === 'manual' ? 'profile' : 'cv'
  })
  const [isBuildingContext, setIsBuildingContext] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)

  const handleBuildContext = async (description: string, form?: HTMLFormElement) => {
    if (isBuildingContext) return

    if (source === 'cv') {
      if (!cvFile) {
        toast.error('CV wajib diupload', {
          description: 'Pilih file PDF terlebih dahulu agar profil latihanmu bisa disiapkan.',
        })
        return
      }

      if (cvFile.type !== 'application/pdf') {
        toast.error('Format CV tidak valid', {
          description: 'Gunakan file PDF agar CV bisa dibaca dengan benar.',
        })
        return
      }

      if (cvFile.size > 5 * 1024 * 1024) {
        toast.error('Ukuran CV terlalu besar', {
          description: 'Gunakan file maksimal 5 MB.',
        })
        return
      }
    }

    setIsBuildingContext(true)
    toast.loading(source === 'cv' ? 'Sedang mengekstrak CV...' : 'Sedang mengekstrak profil manual...', {
      id: 'build-interview-context',
      description: 'Road2Work sedang menyiapkan profil latihan untuk kamu review.',
    })

    try {
      if (source === 'cv') {
        const formData = new FormData()
        if (cvFile) formData.append('cvFile', cvFile)
        const response = await profileService.uploadCvForExtraction(formData)
        window.sessionStorage.setItem('road2work:profile-id', response.data.profile.id)
        window.sessionStorage.setItem('road2work:profile-context-source', 'cv')
      } else {
        const formData = new FormData(form!)
        const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? 'role_data_analyst'
        const response = await profileService.createManualProfile({
          domainId: window.sessionStorage.getItem('road2work:selected-domain-id') ?? 'domain_it',
          roleFamilyId: window.sessionStorage.getItem('road2work:selected-role-family-id') ?? 'family_data_ai',
          targetRoleId: roleId,
          mostRelevantExperience: String(formData.get('experience') ?? ''),
          skillsAndTools: String(formData.get('skills') ?? ''),
          projectExperience: String(formData.get('project') ?? ''),
          achievementOrImpact: String(formData.get('impact') ?? ''),
        })
        window.sessionStorage.setItem('road2work:profile-id', response.data.profile.id)
        window.sessionStorage.setItem('road2work:profile-context-source', 'manual')
      }

      toast.success('Profil latihan siap direview', {
        id: 'build-interview-context',
        description,
      })
      router.push('/profile-review')
    } catch (error) {
      toast.error('Gagal menyiapkan profil latihan', {
        id: 'build-interview-context',
        description: error instanceof Error ? error.message : 'Coba ulangi proses setup.',
      })
    } finally {
      setIsBuildingContext(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo={source === 'cv' ? '/career-onboarding' : '/start'} backLabel="Kembali" />
      <main className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <Badge tone="red">Siapkan Profil Latihan</Badge>
          <h1 className="mt-5 font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
            {source === 'cv' ? 'Upload CV, lalu review hasilnya.' : 'Ceritakan pengalaman yang relevan.'}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {source === 'cv'
              ? 'Road2Work akan membaca skill, tools, project, dan pencapaian dari CV kamu.'
              : `Kamu memilih ${selectedRoleName}. Isi konteks singkat agar sesi latihan lebih sesuai dengan pengalamanmu.`}
          </p>

          {onboardingPath !== 'manual' && onboardingPath !== 'cv' && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <SelectableCard
                title="Upload CV"
                description="Cocok kalau kamu ingin mulai dari pengalaman yang sudah tertulis di CV."
                selected={source === 'cv'}
                onClick={() => {
                  if (!isBuildingContext) setSource('cv')
                }}
              >
                <FiUploadCloud className="h-7 w-7 text-brand-red" />
              </SelectableCard>
              <SelectableCard
                title="Isi Profil Singkat"
                description="Cocok kalau kamu sudah punya target role dan ingin menulis konteks dengan kata-katamu sendiri."
                selected={source === 'profile'}
                onClick={() => {
                  if (!isBuildingContext) setSource('profile')
                }}
              >
                <FiFileText className="h-7 w-7 text-brand-red" />
              </SelectableCard>
            </div>
          )}

          {source === 'profile' && (
            <div className="mt-8 rounded-2xl border border-brand-red/15 bg-brand-red/5 p-4">
              <div className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">Target Role</div>
              <p className="mt-2 font-display text-lg font-black text-ink">{selectedRoleName}</p>
            </div>
          )}

          <Card className="mt-8 p-6">
            {source === 'cv' ? (
              <div>
                <div className="rounded-[22px] border border-dashed border-brand-red/35 bg-brand-red/5 p-8 text-center">
                  <FiUploadCloud className="mx-auto h-10 w-10 text-brand-red" />
                  <h2 className="mt-4 font-display text-2xl font-black text-ink">Upload CV PDF</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted">
                    Gunakan PDF maksimal 5 MB. Pastikan CV memuat pengalaman, project, skill, tools, dan pencapaian yang ingin kamu tonjolkan.
                  </p>
                  <div className="mx-auto mt-6 max-w-sm">
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="cursor-pointer py-3"
                      onChange={event => setCvFile(event.currentTarget.files?.[0] ?? null)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    type="button"
                    size="lg"
                    withArrow={!isBuildingContext}
                    loading={isBuildingContext}
                    onClick={() => handleBuildContext('CV kamu berhasil dibaca. Review profil latihan sebelum lanjut.')}
                  >
                    Siapkan Profil Latihan
                  </Button>
                </div>
                {isBuildingContext && <ContextLoadingNote source="cv" />}
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={event => {
                  event.preventDefault()
                  void handleBuildContext('Profil singkat kamu siap direview sebelum masuk sesi latihan.', event.currentTarget)
                }}
              >
                <div>
                  <Label htmlFor="experience" required>
                    Pengalaman paling relevan
                  </Label>
                  <Textarea id="experience" name="experience" placeholder="Contoh: final project, internship, organisasi, freelance..." required />
                </div>
                <div>
                  <Label htmlFor="skills" required>
                    Skill dan tools yang pernah kamu gunakan
                  </Label>
                  <Input id="skills" name="skills" placeholder="SQL, Python, Excel, FastAPI, PostgreSQL..." required />
                </div>
                <div>
                  <Label htmlFor="project" required>
                    Project, magang, organisasi, atau freelance
                  </Label>
                  <Textarea id="project" name="project" placeholder="Ceritakan konteks project, tanggung jawab kamu, dan masalah yang kamu selesaikan." />
                </div>
                <div>
                  <Label htmlFor="impact" required>
                    Hasil atau pencapaian
                  </Label>
                  <Textarea id="impact" name="impact" placeholder="Sebutkan impact terukur jika ada. Jika belum ada, jelaskan hasil kualitatifnya." />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    withArrow={!isBuildingContext}
                    loading={isBuildingContext}
                  >
                    Siapkan Profil Latihan
                  </Button>
                </div>
                {isBuildingContext && <ContextLoadingNote source="profile" />}
              </form>
            )}
          </Card>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm leading-7 text-muted">
            <FiShield className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
            {source === 'cv'
              ? 'Pastikan CV berisi project, skill, tools, dan pengalaman yang ingin kamu bahas saat interview.'
              : 'Tulis pengalaman dengan contoh nyata. Semakin jelas konteksnya, semakin relevan pertanyaan latihan yang kamu dapat.'}
          </div>
        </div>
      </main>
    </div>
  )
}

function ContextLoadingNote({ source }: { source: 'cv' | 'profile' }) {
  return (
    <div className="mt-5 rounded-2xl border border-brand-red/15 bg-brand-red/5 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-brand-red/25 border-t-brand-red" />
        <div>
          <p className="font-display text-sm font-bold text-ink">Sedang menyiapkan profil latihan</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            {source === 'cv'
              ? 'CV sedang dibaca untuk menemukan skill, tools, pengalaman, dan pencapaian utama.'
              : 'Profil singkat sedang dirapikan agar pertanyaan latihan lebih relevan.'}
          </p>
        </div>
      </div>
    </div>
  )
}
