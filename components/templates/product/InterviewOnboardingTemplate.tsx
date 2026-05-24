'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Camera, Shield } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Button from '@/components/atoms/Button'
import UserCameraPreview from '@/components/molecules/media/UserCameraPreview'
import ChecklistItem from '@/components/molecules/onboarding/ChecklistItem'
import HowItWorksNote from '@/components/molecules/onboarding/HowItWorksNote'
import SessionSummaryCard from '@/components/molecules/onboarding/SessionSummaryCard'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { onboardingChecklistItems } from '@/constants/interview'
import { useUserMedia } from '@/hooks/useUserMedia'
import { interviewService } from '@/services/interview.service'

const cameraPreferenceKey = 'road2work:user-camera-enabled'

const onboardingCameraOptions = {
  video: { facingMode: 'user', width: { ideal: 960 }, height: { ideal: 540 } },
  audio: false,
} as const

export default function InterviewOnboardingTemplate() {
  const router = useRouter()
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [isStartingSession, setIsStartingSession] = useState(false)
  const camera = useUserMedia(onboardingCameraOptions)

  const checkedCount = Object.values(checked).filter(Boolean).length
  const totalCount = onboardingChecklistItems.length
  const allChecked = checkedCount === totalCount

  const toggleCheck = (index: number) => {
    setChecked(current => ({ ...current, [index]: !current[index] }))
  }

  const handleCameraStart = async () => {
    const granted = await camera.start()
    if (granted) {
      window.sessionStorage.setItem(cameraPreferenceKey, 'true')
      toast.success('Kamera aktif', {
        description: 'Preview kamu akan otomatis muncul saat masuk sesi interview.',
      })
    } else {
      toast.error('Kamera belum bisa diaktifkan', {
        description: 'Periksa izin kamera di browser, lalu coba lagi.',
      })
    }
  }

  const handleCameraStop = () => {
    window.sessionStorage.setItem(cameraPreferenceKey, 'false')
    camera.stop()
    toast.info('Kamera dimatikan', {
      description: 'Kamera tidak akan otomatis menyala saat interview.',
    })
  }

  const handleStartInterview = async () => {
    if (isStartingSession) return

    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'
    const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? 'role_data_analyst'

    setIsStartingSession(true)
    try {
      const response = await interviewService.createSession({ profileId, roleId, totalMainQuestions: 5 })
      window.sessionStorage.setItem('road2work:session-id', response.data.session.id)
      window.sessionStorage.setItem('road2work:current-question-id', response.data.currentQuestion.id)
      window.sessionStorage.setItem('road2work:current-question-text', response.data.currentQuestion.questionText)

      toast.success('Sesi interview dimulai', {
        description: camera.stream ? 'Kamera kamu akan otomatis aktif di canvas interview.' : 'Kamu tetap bisa mengaktifkan kamera di halaman interview.',
      })
      router.push('/interview')
    } catch (error) {
      toast.error('Gagal memulai sesi interview', {
        description: error instanceof Error ? error.message : 'Coba lagi beberapa saat lagi.',
      })
    } finally {
      setIsStartingSession(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/setup" backLabel="Kembali ke Setup" />

      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-brand-red">
            <div className="h-px w-8 bg-brand-red" />
            Hampir Siap
          </div>

          <h1 className="mb-2 font-display text-[clamp(1.6rem,3vw,2rem)] font-extrabold tracking-[-0.04em] text-ink">
            Siap masuk sesi live?
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-muted">
            Selesaikan checklist di bawah, lalu mulai live session kamu.
          </p>

          <SessionSummaryCard checkedCount={checkedCount} totalCount={totalCount} />
          <div className="mb-5 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-brand-red">
                  <Camera size={13} />
                  Cek Kamera
                </div>
                <p className="text-sm leading-6 text-muted">
                  Preview kamera ini akan muncul sebagai user canvas kecil saat interview berlangsung.
                </p>
              </div>
              {camera.stream ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="secondary" size="sm">
                      Matikan
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Matikan kamera?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Preview kamera akan berhenti dan tidak otomatis muncul saat interview, kecuali kamu mengaktifkannya lagi.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCameraStop}>Matikan Kamera</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button type="button" size="sm" onClick={handleCameraStart} loading={camera.status === 'requesting'}>
                  Aktifkan
                </Button>
              )}
            </div>
            <UserCameraPreview stream={camera.stream} status={camera.status} />
            {camera.error && <p className="mt-3 text-sm text-brand-red">{camera.error}</p>}
          </div>
          <HowItWorksNote />

          <div className="mb-8 space-y-3">
            {onboardingChecklistItems.map((item, index) => (
              <ChecklistItem
                key={item.label}
                item={item}
                index={index}
                checked={!!checked[index]}
                onToggle={() => toggleCheck(index)}
              />
            ))}
          </div>

          {!allChecked && (
            <p className="mb-4 text-center text-sm text-[#A0A0A0]">
              Centang semua {totalCount} item untuk membuka sesi kamu
            </p>
          )}

          <StartInterviewButton
            allChecked={allChecked}
            checkedCount={checkedCount}
            totalCount={totalCount}
            onClick={handleStartInterview}
            loading={isStartingSession}
          />

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#C0C0C0]">
            <Shield size={12} />
            Sesi dievaluasi secara privat. Tidak ada data yang dibagikan keluar.
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function StartInterviewButton({
  allChecked,
  checkedCount,
  totalCount,
  onClick,
  loading,
}: {
  allChecked: boolean
  checkedCount: number
  totalCount: number
  onClick: () => void
  loading: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!allChecked || loading}
      className="flex w-full items-center justify-center gap-2 rounded-full py-4 font-display font-bold tracking-[-0.01em] text-white transition disabled:cursor-not-allowed"
      style={{
        backgroundColor: allChecked ? '#E63946' : '#E0E0E0',
        boxShadow: allChecked ? '0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)' : 'none',
      }}
      whileHover={
        allChecked
          ? {
              y: -1,
              backgroundColor: '#C1121F',
              boxShadow: '0 8px 28px rgba(230,57,70,0.38), 0 2px 6px rgba(0,0,0,0.12)',
            }
          : undefined
      }
    >
      {loading ? 'Menyiapkan sesi...' : allChecked ? 'Mulai Live Interview' : `Lengkapi checklist (${checkedCount}/${totalCount})`}
      {allChecked && !loading && <ArrowRight size={18} />}
    </motion.button>
  )
}
