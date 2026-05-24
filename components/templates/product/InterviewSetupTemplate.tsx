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
  const [source, setSource] = useState<'cv' | 'profile'>('cv')
  const [isBuildingContext, setIsBuildingContext] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)

  const handleBuildContext = async (description: string, form?: HTMLFormElement) => {
    if (isBuildingContext) return

    setIsBuildingContext(true)
    toast.loading('Sedang membuat Interview Context...', {
      id: 'build-interview-context',
      description: 'AI HRD sedang membaca konteks dan menyiapkan pertanyaan yang relevan.',
    })

    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'

    try {
      if (source === 'cv') {
        const formData = new FormData()
        if (cvFile) formData.append('cvFile', cvFile)
        const response = await profileService.uploadCV(profileId, formData)
        window.sessionStorage.setItem('road2work:profile-id', response.data.profile.id)
        window.sessionStorage.setItem('road2work:profile-context-source', 'cv')
      } else {
        const formData = new FormData(form!)
        const response = await profileService.submitShortProfile(profileId, {
          mostRelevantExperience: String(formData.get('experience') ?? ''),
          skillsAndTools: String(formData.get('skills') ?? ''),
          projectExperience: String(formData.get('project') ?? ''),
          achievementOrImpact: String(formData.get('impact') ?? ''),
        })
        window.sessionStorage.setItem('road2work:profile-id', response.data.profile.id)
        window.sessionStorage.setItem('road2work:profile-context-source', 'short_profile')
      }

      toast.success('Interview Context siap', {
        id: 'build-interview-context',
        description,
      })
      router.push('/onboarding')
    } catch (error) {
      toast.error('Gagal membuat Interview Context', {
        id: 'build-interview-context',
        description: error instanceof Error ? error.message : 'Coba ulangi proses setup.',
      })
    } finally {
      setIsBuildingContext(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/start" backLabel="Kembali ke Role" />
      <main className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <Badge tone="red">Interview Context</Badge>
          <h1 className="mt-5 font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
            Beri AI HRD konteks yang cukup.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            Upload CV kamu, atau isi profil singkat jika tidak ingin mengunggah file. MVP tidak menyediakan lanjut tanpa data.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <SelectableCard
              title="Upload CV"
              description="Pilihan terbaik untuk pertanyaan personal dan analisis evidence yang lebih kuat."
              selected={source === 'cv'}
              onClick={() => {
                if (!isBuildingContext) setSource('cv')
              }}
            >
              <FiUploadCloud className="h-7 w-7 text-brand-red" />
            </SelectableCard>
            <SelectableCard
              title="Isi Profil Singkat"
              description="Cara yang lebih ramah privasi untuk menjelaskan pengalaman dengan kata-kata kamu sendiri."
              selected={source === 'profile'}
              onClick={() => {
                if (!isBuildingContext) setSource('profile')
              }}
            >
              <FiFileText className="h-7 w-7 text-brand-red" />
            </SelectableCard>
          </div>

          <Card className="mt-8 p-6">
            {source === 'cv' ? (
              <div>
                <div className="rounded-[22px] border border-dashed border-brand-red/35 bg-brand-red/5 p-8 text-center">
                  <FiUploadCloud className="mx-auto h-10 w-10 text-brand-red" />
                  <h2 className="mt-4 font-display text-2xl font-black text-ink">Upload CV PDF</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted">
                    Format PDF, rekomendasi ukuran 2-5 MB. File akan diproses untuk skill, tools, experience, dan evidence.
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
                    onClick={() => handleBuildContext('AI HRD akan memakai CV kamu untuk mempersonalisasi sesi.')}
                  >
                    Bangun Interview Context
                  </Button>
                </div>
                {isBuildingContext && <ContextLoadingNote source="cv" />}
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={event => {
                  event.preventDefault()
                  void handleBuildContext('Profil singkat kamu siap dipakai untuk sesi latihan.', event.currentTarget)
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
                    Skill/tools yang pernah kamu gunakan
                  </Label>
                  <Input id="skills" name="skills" placeholder="SQL, Python, Excel, FastAPI, PostgreSQL..." required />
                </div>
                <div>
                  <Label htmlFor="project" required>
                    Project, internship, organisasi, atau pengalaman freelance
                  </Label>
                  <Textarea id="project" name="project" placeholder="Ceritakan konteks project, tanggung jawab kamu, dan masalah yang kamu selesaikan." />
                </div>
                <div>
                  <Label htmlFor="impact" required>
                    Hasil, pencapaian, atau impact
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
                    Bangun Interview Context
                  </Button>
                </div>
                {isBuildingContext && <ContextLoadingNote source="profile" />}
              </form>
            )}
          </Card>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm leading-7 text-muted">
            <FiShield className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
            Data kamu hanya digunakan untuk mempersonalisasi latihan interview. API key dan pemrosesan AI tetap berada di backend services.
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
          <p className="font-display text-sm font-bold text-ink">Sedang membuat Interview Context</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            {source === 'cv'
              ? 'CV sedang diproses untuk membaca skill, tools, experience, dan evidence utama.'
              : 'Profil singkat sedang diproses untuk menyusun konteks role dan pertanyaan yang relevan.'}
          </p>
        </div>
      </div>
    </div>
  )
}
