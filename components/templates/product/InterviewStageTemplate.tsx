'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Camera, CameraOff, Square } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import Button from '@/components/atoms/Button'
import Logo from '@/components/atoms/Logo'
import HrdVideoFrame from '@/components/molecules/interview/HrdVideoFrame'
import ProgressDots from '@/components/molecules/interview/ProgressDots'
import QuestionBubble from '@/components/molecules/interview/QuestionBubble'
import VoiceControlPanel from '@/components/molecules/interview/VoiceControlPanel'
import UserCameraPreview from '@/components/molecules/media/UserCameraPreview'
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
import {
  interviewQuestions,
  type InterviewState,
} from '@/constants/interview'
import { useUserMedia } from '@/hooks/useUserMedia'
import { interviewService } from '@/services/interview.service'

const cameraPreferenceKey = 'road2work:user-camera-enabled'

const interviewCameraOptions = {
  video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 360 } },
  audio: false,
} as const

export default function InterviewStageTemplate() {
  const router = useRouter()
  const [qIndex, setQIndex] = useState(0)
  const [state, setState] = useState<InterviewState>('asking')
  const [seconds, setSeconds] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    if (typeof window === 'undefined') return interviewQuestions[0]
    return window.sessionStorage.getItem('road2work:current-question-text') ?? interviewQuestions[0]
  })
  const [cameraVisible, setCameraVisible] = useState(true)
  const camera = useUserMedia(interviewCameraOptions)
  const {
    stream: cameraStream,
    status: cameraStatus,
    start: startCamera,
    stop: stopCamera,
  } = camera

  useEffect(() => {
    const id = window.setInterval(() => setSeconds(value => value + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (window.sessionStorage.getItem(cameraPreferenceKey) === 'true') {
      void startCamera()
    }
  }, [startCamera])

  const handleCameraStart = async () => {
    const granted = await startCamera()
    if (granted) {
      window.sessionStorage.setItem(cameraPreferenceKey, 'true')
      toast.success('Kamera aktif', {
        description: 'User canvas kamu sekarang muncul di sesi interview.',
      })
    } else {
      toast.error('Kamera belum bisa diaktifkan', {
        description: 'Periksa izin kamera di browser, lalu coba lagi.',
      })
    }
  }

  const handleCameraStop = () => {
    window.sessionStorage.setItem(cameraPreferenceKey, 'false')
    stopCamera()
    toast.info('Kamera dimatikan')
  }

  const handleMic = async () => {
    if (state === 'asking' || state === 'clarifying') {
      setState('listening')
      return
    }

    if (state !== 'listening') return

    setState('thinking')
    try {
      const sessionId = window.sessionStorage.getItem('road2work:session-id') ?? 'session_001'
      const answerPayload = new FormData()
      answerPayload.append('audioFile', new Blob(['mock-audio-answer'], { type: 'audio/webm' }), 'answer.webm')

      const response = await interviewService.submitVoiceAnswer(sessionId, answerPayload)
      if (response.data.isCompleted) {
        if (response.data.resultId) window.sessionStorage.setItem('road2work:result-id', response.data.resultId)
        toast.success('Sesi selesai', {
          description: 'Dashboard hasil sedang disiapkan.',
        })
        router.push('/results')
        return
      }

      if (response.data.nextQuestion) {
        window.sessionStorage.setItem('road2work:current-question-id', response.data.nextQuestion.id)
        window.sessionStorage.setItem('road2work:current-question-text', response.data.nextQuestion.questionText)
        setCurrentQuestion(response.data.nextQuestion.questionText)
        setQIndex(value => value + 1)
      }
      setState('asking')
    } catch (error) {
      toast.error('Jawaban belum bisa diproses', {
        description: error instanceof Error ? error.message : 'Coba kirim jawaban lagi.',
      })
      setState('asking')
    }
  }

  return (
    <div className="flex min-h-screen select-none flex-col bg-[#080A10]">
      <InterviewTopBar
        seconds={seconds}
        questionIndex={qIndex}
        totalQuestions={interviewQuestions.length}
        onEndInterview={() => {
          toast.success('Sesi selesai', {
            description: 'Hasil readiness kamu sedang disiapkan.',
          })
        }}
      />
      <div className="hidden sm:block">
        <ProgressDots total={interviewQuestions.length} current={qIndex} />
      </div>

      <div className="flex flex-1 flex-col items-center overflow-auto px-4 pb-8 pt-4 sm:px-8 sm:pt-0">
        <div className="relative flex w-full max-w-[660px] flex-col items-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HrdVideoFrame state={state} />
          </motion.div>

          {cameraVisible && (
            <div className="absolute right-2 top-2 z-20 w-[34vw] max-w-32 min-w-24 sm:right-4 sm:top-4 sm:w-44 sm:max-w-none">
              <UserCameraPreview stream={cameraStream} status={cameraStatus} compact className="border-white/10 shadow-[0_18px_48px_rgba(0,0,0,0.35)]" />
            </div>
          )}

          <QuestionBubble question={currentQuestion} state={state} />
          <CameraControlBar
            cameraEnabled={!!cameraStream}
            cameraVisible={cameraVisible}
            cameraLoading={cameraStatus === 'requesting'}
            onStartCamera={handleCameraStart}
            onStopCamera={handleCameraStop}
            onToggleVisible={() => setCameraVisible(value => !value)}
          />
          <VoiceControlPanel state={state} onMicClick={handleMic} />
        </div>
      </div>
    </div>
  )
}

function CameraControlBar({
  cameraEnabled,
  cameraVisible,
  cameraLoading,
  onStartCamera,
  onStopCamera,
  onToggleVisible,
}: {
  cameraEnabled: boolean
  cameraVisible: boolean
  cameraLoading: boolean
  onStartCamera: () => void
  onStopCamera: () => void
  onToggleVisible: () => void
}) {
  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
      {cameraEnabled ? (
        <Button type="button" variant="secondary" size="sm" onClick={onStopCamera}>
          <CameraOff className="h-4 w-4" />
          Kamera Mati
        </Button>
      ) : (
        <Button type="button" variant="secondary" size="sm" onClick={onStartCamera} loading={cameraLoading}>
          <Camera className="h-4 w-4" />
          Kamera Aktif
        </Button>
      )}
      <Button type="button" variant="ghost" size="sm" onClick={onToggleVisible}>
        {cameraVisible ? 'Sembunyikan Preview' : 'Tampilkan Preview'}
      </Button>
    </div>
  )
}

function InterviewTopBar({
  seconds,
  questionIndex,
  totalQuestions,
  onEndInterview,
}: {
  seconds: number
  questionIndex: number
  totalQuestions: number
  onEndInterview: () => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/[0.05] px-4 sm:px-8">
      <Logo dark />
      <div className="flex min-w-0 items-center gap-2 sm:gap-5">
        <div className="hidden items-center gap-1.5 rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 sm:flex">
          <div className="h-1 w-1 rounded-full bg-brand-red" />
          <span className="font-mono text-[0.62rem] font-semibold tracking-wide text-brand-red">Data Analyst</span>
        </div>
        <div className="rounded-full border border-white/[0.07] bg-white/[0.05] px-3 py-1 font-mono text-[0.68rem] tracking-wide text-white/50">
          Q{questionIndex + 1}/{totalQuestions}
        </div>
        <span className="hidden font-mono text-xs tabular-nums tracking-wide text-white/30 sm:block">
          {formatDuration(seconds)}
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-white/[0.07] px-2.5 py-1.5 font-mono text-[0.65rem] tracking-wide text-white/30 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white/65 sm:px-3"
            >
              <Square size={11} /> Selesai
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Selesaikan interview sekarang?</AlertDialogTitle>
              <AlertDialogDescription>
                Kamu akan diarahkan ke halaman hasil. Pastikan jawaban terakhir sudah selesai sebelum mengakhiri sesi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Lanjut Interview</AlertDialogCancel>
              <AlertDialogAction asChild onClick={onEndInterview}>
                <Link href="/results">Lihat Hasil</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}

function formatDuration(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, '0')
  const seconds = (value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
