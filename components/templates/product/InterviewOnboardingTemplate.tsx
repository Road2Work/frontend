'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, BrainCircuit, Camera, Mic, Shield, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Button from '@/components/atoms/Button'
import UserCameraPreview from '@/components/molecules/media/UserCameraPreview'
import ChecklistItem from '@/components/molecules/onboarding/ChecklistItem'
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
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useUserMedia } from '@/hooks/useUserMedia'
import { interviewService } from '@/services/interview.service'
import type { AdaptivePracticeMemory, InterviewCompetency, PracticeMode } from '@/types/api-contract'

const cameraPreferenceKey = 'road2work:user-camera-enabled'

const onboardingCameraOptions = {
  video: { facingMode: 'user', width: { ideal: 960 }, height: { ideal: 540 } },
  audio: false,
} as const

export default function InterviewOnboardingTemplate() {
  const router = useRouter()
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [isStartingSession, setIsStartingSession] = useState(false)
  const [remainingQuota, setRemainingQuota] = useState<number | null>(null)
  const [practiceMemory, setPracticeMemory] = useState<AdaptivePracticeMemory | null>(null)
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('first_session')
  const [isCheckingMic, setIsCheckingMic] = useState(false)
  const [micReady, setMicReady] = useState(false)
  const camera = useUserMedia(onboardingCameraOptions)
  const audioRecorder = useAudioRecorder()

  const checkedCount = Object.values(checked).filter(Boolean).length
  const totalCount = onboardingChecklistItems.length
  const allChecked = checkedCount === totalCount
  const isAdaptive = practiceMode === 'adaptive_from_history' && practiceMemory?.enabled

  useEffect(() => {
    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'
    const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? 'role_data_analyst'
    const cachedPracticeMode = window.sessionStorage.getItem('road2work:practice-mode') as PracticeMode | null

    interviewService.getQuota().then(response => setRemainingQuota(response.data.remainingQuota))
    interviewService.getPracticeMemory({ profileId, roleId }).then(response => {
      const memory = response.data.adaptiveMemory
      setPracticeMemory(memory)
      setPracticeMode(cachedPracticeMode ?? (memory.enabled && memory.previousSessionIds.length > 0 ? 'adaptive_from_history' : 'first_session'))
    })
  }, [])

  const toggleCheck = (index: number) => {
    setChecked(current => ({ ...current, [index]: !current[index] }))
  }

  const handleCameraStart = async () => {
    const granted = await camera.start()
    if (granted) {
      window.sessionStorage.setItem(cameraPreferenceKey, 'true')
      toast.success('Kamera aktif', {
        description: 'Preview kamera akan muncul saat sesi interview dimulai.',
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

  const handleMicCheck = async () => {
    if (isCheckingMic) return

    setIsCheckingMic(true)
    const granted = await audioRecorder.start()

    if (!granted) {
      toast.error('Mic belum bisa diakses', {
        description: audioRecorder.error ?? 'Izinkan akses microphone di browser, lalu coba lagi.',
      })
      setIsCheckingMic(false)
      return
    }

    window.setTimeout(() => {
      void audioRecorder.stop().then(() => {
        setMicReady(true)
        setIsCheckingMic(false)
        toast.success('Mic siap', {
          description: 'Mic siap digunakan saat sesi interview berjalan.',
        })
      })
    }, 650)
  }

  const handleStartInterview = async () => {
    if (isStartingSession) return

    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'

    if (remainingQuota !== null && remainingQuota <= 0) {
      toast.error('Kuota interview habis', {
        description: 'Kembali ke dashboard dan lanjutkan saat kuota tersedia lagi.',
      })
      return
    }

    setIsStartingSession(true)
    try {
      const requestedCompetencies: InterviewCompetency[] = ['self_introduction', 'skill', 'solution_skill', 'agile_culture']
      const cachedFocus = window.sessionStorage.getItem('road2work:adaptive-improvement-focus')
      const improvementFocus = cachedFocus ? (JSON.parse(cachedFocus) as string[]) : (practiceMemory?.improvementFocus ?? [])
      const avoidRepeatedQuestions = window.sessionStorage.getItem('road2work:adaptive-avoid-repeated-questions')
      const response = await interviewService.createSession({
        profileId,
        questionCount: 3,
        practiceMode,
        retryMode: false,
        avoidRepeatedQuestions: avoidRepeatedQuestions ? avoidRepeatedQuestions === 'true' : (practiceMemory?.avoidRepeatedQuestions ?? true),
        improvementFocus,
        requestedCompetencies,
      })
      window.sessionStorage.setItem('road2work:session-id', response.data.session.id)
      window.sessionStorage.setItem('road2work:total-main-questions', String(response.data.session.questionCount ?? response.data.session.totalMainQuestions ?? 3))
      window.sessionStorage.setItem('road2work:current-question-id', response.data.currentQuestion.id)
      window.sessionStorage.setItem('road2work:current-question-type', response.data.currentQuestion.questionType)
      window.sessionStorage.setItem('road2work:current-question-text', response.data.currentQuestion.questionText)
      window.sessionStorage.setItem('road2work:practice-mode', response.data.session.practiceMode ?? practiceMode)
      window.sessionStorage.setItem('road2work:adaptive-memory', JSON.stringify(response.data.adaptiveMemory ?? response.data.session.adaptiveMemory ?? null))
      window.sessionStorage.setItem('road2work:answer-policy', JSON.stringify(response.data.session.recordingPolicy ?? null))

      toast.success('Sesi interview dimulai', {
        description: response.data.session.practiceMode === 'adaptive_from_history'
          ? 'Sesi ini akan fokus pada area yang masih perlu diperkuat.'
          : camera.stream ? 'Kamera kamu akan otomatis aktif di canvas interview.' : 'Kamu tetap bisa mengaktifkan kamera di halaman interview.',
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
      <AppHeader backTo="/profile-review" backLabel="Kembali ke Profil" />

      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Page Header */}
          <div className="mb-1 flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-brand-red">
            <div className="h-px w-8 bg-brand-red" />
            Hampir Siap
          </div>
          <h1 className="mb-1 font-display text-[clamp(1.6rem,3vw,2rem)] font-extrabold tracking-[-0.04em] text-ink">
            Siap masuk sesi live?
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            Selesaikan checklist singkat ini agar sesi latihan berjalan lancar.
          </p>

          {/* Session Summary + Quota in one card */}
          <SessionSummaryCard checkedCount={checkedCount} totalCount={totalCount} />

          {/* Quota + Adaptive — inline info row */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2 rounded-xl border border-black/[0.06] bg-white px-4 py-3">
              <Shield size={14} className="mt-0.5 shrink-0 text-brand-red" />
              <div>
                <div className="font-mono text-[0.58rem] font-bold uppercase tracking-widest text-brand-red">Kuota</div>
                <p className="mt-0.5 text-xs font-semibold text-ink">
                  {remainingQuota ?? '…'} / 5 sesi gratis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-black/[0.06] bg-white px-4 py-3">
              <BrainCircuit size={14} className="mt-0.5 shrink-0 text-brand-red" />
              <div>
                <div className="font-mono text-[0.58rem] font-bold uppercase tracking-widest text-brand-red">Mode</div>
                <p className="mt-0.5 text-xs font-semibold text-ink">
                  {isAdaptive ? 'Adaptif dari riwayat' : 'Sesi pertama'}
                </p>
              </div>
            </div>
          </div>

          {/* Adaptive focus — hanya muncul jika adaptive */}
          {isAdaptive && practiceMemory && (
            <div className="mb-4 rounded-xl border border-brand-red/15 bg-brand-red/5 p-4">
              <div className="mb-2 text-xs font-bold text-ink">Fokus perbaikan sesi ini</div>
              <div className="flex flex-wrap gap-2">
                {practiceMemory.improvementFocus.map(item => (
                  <span key={item} className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-bold text-brand-red">
                    {item.replaceAll('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mic & Camera — side by side compact */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            {/* Mic */}
            <div className="flex flex-col rounded-xl border border-black/[0.07] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="mb-2 flex items-center gap-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-brand-red">
                <Mic size={11} />
                Cek Mic
              </div>
              <p className="text-xs leading-5 text-muted">
                {micReady ? 'Mic terdeteksi dan siap digunakan.' : 'Izinkan akses mic agar jawaban kamu bisa didengar dengan jelas.'}
              </p>
              <div className="mt-auto pt-3">
                <Button type="button" variant={micReady ? 'secondary' : 'primary'} size="sm" className="w-full" onClick={handleMicCheck} loading={isCheckingMic}>
                  {micReady ? 'Tes Ulang' : 'Izinkan & Tes Mic'}
                </Button>
              </div>
            </div>

            {/* Camera */}
            <div className="flex flex-col rounded-xl border border-black/[0.07] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="mb-2 flex items-center gap-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-brand-red">
                <Camera size={11} />
                Cek Kamera
              </div>
              <p className="text-xs leading-5 text-muted">
                {camera.stream ? 'Kamera aktif dan siap tampil di sesi.' : 'Opsional — muncul sebagai canvas kecil saat interview.'}
              </p>
              <div className="mt-auto pt-3">
                {camera.stream ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="secondary" size="sm" className="w-full">Matikan Kamera</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Matikan kamera?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Preview kamera akan berhenti dan tidak muncul saat interview, kecuali kamu mengaktifkannya lagi.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCameraStop}>Matikan Kamera</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button type="button" size="sm" className="w-full" onClick={handleCameraStart} loading={camera.status === 'requesting'}>
                    Aktifkan Kamera
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Camera preview — hanya tampil saat aktif */}
          <AnimatePresence>
            {camera.stream && (
              <motion.div
                key="camera-preview"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 overflow-hidden rounded-xl"
              >
                <UserCameraPreview stream={camera.stream} status={camera.status} />
                {camera.error && <p className="mt-2 text-xs text-brand-red">{camera.error}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cara kerjanya — inline banner, bukan kartu penuh */}
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-brand-red/15 bg-brand-red/5 px-4 py-3">
            <Zap size={14} className="mt-0.5 shrink-0 text-brand-red" />
            <p className="text-xs leading-5 text-ink">
              <span className="font-bold">Cara kerjanya:</span> Jawab dengan suara. AI HRD bisa bertanya lanjut jika jawabanmu masih umum. Gunakan contoh nyata.
            </p>
          </div>

          {/* Checklist */}
          <div className="mb-6 space-y-2">
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
            <p className="mb-3 text-center text-xs text-[#A0A0A0]">
              Centang semua {totalCount} item untuk membuka sesi interview
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
            <Shield size={11} />
            Latihan ini dibuat untuk membantumu menjawab lebih jelas dan terstruktur.
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
      {loading ? 'Menyiapkan sesi...' : allChecked ? 'Mulai Interview' : `Lengkapi checklist (${checkedCount}/${totalCount})`}
      {allChecked && !loading && <ArrowRight size={18} />}
    </motion.button>
  )
}
