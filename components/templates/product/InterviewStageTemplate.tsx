'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BrainCircuit, Camera, CameraOff, PlayCircle, Square } from 'lucide-react'
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
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useUserMedia } from '@/hooks/useUserMedia'
import { dashboardService } from '@/services/dashboard.service'
import { interviewService } from '@/services/interview.service'
import type { PracticeMode } from '@/types/api-contract'

const cameraPreferenceKey = 'road2work:user-camera-enabled'

const interviewCameraOptions = {
  video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 360 } },
  audio: false,
} as const

const maxAnswerSeconds = 90
const interviewStartedKey = 'road2work:interview-started'
const hrdIntroText =
  'Halo, saya AI HRD Road2Work. Sesi ini akan berjalan seperti interview singkat. Saya akan bertanya, lalu microphone kamu otomatis aktif setelah pertanyaan selesai. Jawab dengan contoh nyata, kontribusi pribadi, tools yang kamu gunakan, dan hasilnya. Kalau sudah siap, tekan mulai interview.'
const hrdClosingText =
  'Terima kasih. Sesi interview kamu sudah selesai. Road2Work akan menyiapkan hasil latihan dan dashboard kesiapan kariermu.'

type AnswerPolicy = {
  answerLimitSeconds?: number
  autoStartMic?: boolean
  silenceAutoStopEnabled?: boolean
}

type AnswerStopReason = 'user_mic_off' | 'timer_timeout'

type SpeechRecognitionConstructor = new () => SpeechRecognition

type SpeechRecognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

type SpeechRecognitionEvent = {
  resultIndex: number
  results: ArrayLike<{
    isFinal: boolean
    0: {
      transcript: string
    }
  }>
}

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

export default function InterviewStageTemplate() {
  const router = useRouter()
  const [qIndex, setQIndex] = useState(0)
  const [state, setState] = useState<InterviewState>('idle')
  const [hasStarted, setHasStarted] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(interviewStartedKey) === 'true'
  })
  const [seconds, setSeconds] = useState(0)
  const [answerSeconds, setAnswerSeconds] = useState(0)
  const [answerStartedAt, setAnswerStartedAt] = useState<string | null>(null)
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false)
  const [liveCaption, setLiveCaption] = useState('')
  const [liveCaptionSupported, setLiveCaptionSupported] = useState(true)
  const [introReady, setIntroReady] = useState(false)
  const [isPlayingIntro, setIsPlayingIntro] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(() => {
    if (typeof window === 'undefined') return 3
    return Number(window.sessionStorage.getItem('road2work:total-main-questions')) || 3
  })
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    if (typeof window === 'undefined') return interviewQuestions[0]
    return window.sessionStorage.getItem('road2work:current-question-text') ?? interviewQuestions[0]
  })
  const [currentQuestionId, setCurrentQuestionId] = useState(() => {
    if (typeof window === 'undefined') return 'question_001'
    return window.sessionStorage.getItem('road2work:current-question-id') ?? 'question_001'
  })
  const [currentQuestionType, setCurrentQuestionType] = useState<'main' | 'clarification'>(() => {
    if (typeof window === 'undefined') return 'main'
    return (window.sessionStorage.getItem('road2work:current-question-type') as 'main' | 'clarification' | null) ?? 'main'
  })
  const [practiceMode] = useState<PracticeMode>(() => {
    if (typeof window === 'undefined') return 'first_session'
    return (window.sessionStorage.getItem('road2work:practice-mode') as PracticeMode | null) ?? 'first_session'
  })
  const [answerPolicy] = useState<AnswerPolicy | null>(() => {
    if (typeof window === 'undefined') return null
    const cached = window.sessionStorage.getItem('road2work:answer-policy')
    return cached && cached !== 'null' ? (JSON.parse(cached) as AnswerPolicy) : null
  })
  const answerLimitSeconds = answerPolicy?.answerLimitSeconds ?? maxAnswerSeconds
  const displayQuestion = state === 'idle'
    ? introReady
      ? 'Arahan sudah selesai. Tekan Mulai Interview saat kamu siap menjawab pertanyaan pertama.'
      : hrdIntroText
    : currentQuestion
  const [cameraVisible, setCameraVisible] = useState(true)
  const camera = useUserMedia(interviewCameraOptions)
  const {
    error: audioRecorderError,
    start: startVoiceCapture,
    stop: stopVoiceCapture,
  } = useAudioRecorder()
  const {
    stream: cameraStream,
    status: cameraStatus,
    start: startCamera,
    stop: stopCamera,
  } = camera

  useEffect(() => {
    const sessionId = window.sessionStorage.getItem('road2work:session-id')

    if (!sessionId) {
      toast.error('Sesi interview belum tersedia', {
        description: 'Mulai sesi dari halaman persiapan terlebih dahulu.',
      })
      router.replace('/onboarding')
      return
    }

    interviewService
      .getSession(sessionId)
      .then(response => {
        const { session, currentQuestion } = response.data

        if (session.status === 'completed') {
          setState('completed')
          router.replace('/results')
          return
        }

        if (session.status === 'cancelled') {
          toast.error('Sesi interview sudah dibatalkan', {
            description: 'Mulai sesi baru dari halaman persiapan.',
          })
          router.replace('/onboarding')
          return
        }

        const resolvedTotal = session.questionCount ?? session.totalMainQuestions ?? totalQuestions
        const resolvedIndex = Math.max((session.currentQuestionIndex ?? session.questionIndex ?? 1) - 1, 0)
        const resolvedState = session.currentState ?? session.currentHrdState ?? currentQuestion?.hrdState ?? 'asking'

        setTotalQuestions(resolvedTotal)
        setQIndex(resolvedIndex)
        if (hasStarted) {
          setState(resolvedState === 'completed' ? 'completed' : resolvedState === 'clarifying' ? 'clarifying' : 'asking')
        } else {
          setState('idle')
        }

        window.sessionStorage.setItem('road2work:total-main-questions', String(resolvedTotal))
        window.sessionStorage.setItem('road2work:practice-mode', session.practiceMode ?? practiceMode)
        window.sessionStorage.setItem('road2work:answer-policy', JSON.stringify(session.recordingPolicy ?? answerPolicy ?? null))

        if (currentQuestion) {
          setCurrentQuestionId(currentQuestion.id)
          setCurrentQuestionType(currentQuestion.questionType)
          setCurrentQuestion(currentQuestion.questionText)
          window.sessionStorage.setItem('road2work:current-question-id', currentQuestion.id)
          window.sessionStorage.setItem('road2work:current-question-type', currentQuestion.questionType)
          window.sessionStorage.setItem('road2work:current-question-text', currentQuestion.questionText)
        }
      })
      .catch(error => {
        toast.error('Sesi interview belum bisa dimuat', {
          description: error instanceof Error ? error.message : 'Mulai ulang dari halaman persiapan.',
        })
        router.replace('/onboarding')
      })
  }, [answerPolicy, hasStarted, practiceMode, router, totalQuestions])

  useEffect(() => {
    const id = window.setInterval(() => setSeconds(value => value + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (window.sessionStorage.getItem(cameraPreferenceKey) === 'true') {
      void startCamera()
    }
  }, [startCamera])

  useEffect(() => {
    if (!hasStarted || (state !== 'asking' && state !== 'clarifying')) return

    let cancelled = false

    const moveToListening = async () => {
      await speakHrdQuestion(currentQuestion)
      if (cancelled) return

      setAnswerSeconds(0)
      setLiveCaption('')
      setAnswerStartedAt(new Date().toISOString())
      setState('listening')

      const granted = await startVoiceCapture()
      if (!granted) {
        toast.error('Mic belum bisa digunakan', {
          description: audioRecorderError ?? 'Periksa izin microphone di browser, lalu coba lagi.',
        })
      }
    }

    void moveToListening()

    return () => {
      cancelled = true
      stopHrdSpeech()
    }
  }, [audioRecorderError, currentQuestion, hasStarted, startVoiceCapture, state])

  const processAnswer = useCallback(async (stopReason: AnswerStopReason = 'user_mic_off') => {
    if (state !== 'listening' || isSubmittingAnswer) return

    setIsSubmittingAnswer(true)
    setState('thinking')
    try {
      const sessionId = window.sessionStorage.getItem('road2work:session-id') ?? 'session_001'
      const endedAt = new Date().toISOString()
      const audioBlob = await stopVoiceCapture()
      if (audioBlob.size < 1024) {
        setState(currentQuestionType === 'clarification' ? 'clarifying' : 'asking')
        setIsSubmittingAnswer(false)
        toast.error('Jawaban belum terdengar jelas', {
          description: 'AI HRD akan mengulang pertanyaan. Coba jawab lagi dengan suara sedikit lebih jelas.',
        })
        return
      }

      const response = await interviewService.submitVoiceAnswer(sessionId, {
        questionId: currentQuestionId,
        questionType: currentQuestionType,
        audioFile: audioBlob,
        recordingStartedAt: answerStartedAt ?? endedAt,
        recordingEndedAt: endedAt,
        answerDurationSec: answerSeconds,
        maxDurationSec: answerPolicy?.answerLimitSeconds ?? maxAnswerSeconds,
        stopReason,
        autoMicStarted: answerPolicy?.autoStartMic ?? true,
        silenceAutoStopEnabled: answerPolicy?.silenceAutoStopEnabled ?? false,
      })
      setAnswerSeconds(0)
      setAnswerStartedAt(null)
      setLiveCaption('')

      if (response.data.isCompleted) {
        if (response.data.resultId) window.sessionStorage.setItem('road2work:result-id', response.data.resultId)
        const profileId = window.sessionStorage.getItem('road2work:profile-id')
        if (profileId) await dashboardService.refreshDashboard({ profileId })
        setCurrentQuestion(hrdClosingText)
        setState('completed')
        toast.success('Sesi selesai', {
          description: 'AI HRD sedang menutup sesi sebelum hasil ditampilkan.',
        })
        await speakHrdQuestion(hrdClosingText)
        window.setTimeout(() => router.push('/results'), 1400)
        return
      }

      if (response.data.nextQuestion) {
        window.sessionStorage.setItem('road2work:current-question-id', response.data.nextQuestion.id)
        window.sessionStorage.setItem('road2work:current-question-type', response.data.nextQuestion.questionType)
        window.sessionStorage.setItem('road2work:current-question-text', response.data.nextQuestion.questionText)
        setCurrentQuestionId(response.data.nextQuestion.id)
        setCurrentQuestionType(response.data.nextQuestion.questionType)
        setCurrentQuestion(response.data.nextQuestion.questionText)
        if (response.data.nextQuestion.questionType === 'main') {
          setQIndex(value => value + 1)
        }
        setState(response.data.nextQuestion.questionType === 'clarification' ? 'clarifying' : 'asking')
        if (response.data.nextQuestion.questionType === 'clarification') {
          toast.info('AI HRD meminta klarifikasi', {
            description: 'Tambahkan tools, kontribusi pribadi, dan hasil yang lebih konkret.',
          })
        }
        return
      }
      setState('asking')
    } catch (error) {
      toast.error('Jawaban belum bisa diproses', {
        description: error instanceof Error ? error.message : 'Coba kirim jawaban lagi.',
      })
      setAnswerSeconds(0)
      setLiveCaption('')
      setState('asking')
    } finally {
      setIsSubmittingAnswer(false)
    }
  }, [answerPolicy, answerSeconds, answerStartedAt, currentQuestionId, currentQuestionType, isSubmittingAnswer, router, state, stopVoiceCapture])

  useEffect(() => {
    if (state !== 'listening') return

    const id = window.setInterval(() => {
      setAnswerSeconds(value => {
        const nextValue = Math.min(answerLimitSeconds, value + 1)
        if (nextValue >= answerLimitSeconds) {
          window.setTimeout(() => void processAnswer('timer_timeout'), 0)
        }
        return nextValue
      })
    }, 1000)

    return () => window.clearInterval(id)
  }, [answerLimitSeconds, processAnswer, state])

  useEffect(() => {
    if (state !== 'listening') return

    const SpeechRecognitionApi =
      (window as WindowWithSpeechRecognition).SpeechRecognition
      ?? (window as WindowWithSpeechRecognition).webkitSpeechRecognition

    if (!SpeechRecognitionApi) {
      setLiveCaptionSupported(false)
      return
    }

    setLiveCaptionSupported(true)
    const recognition = new SpeechRecognitionApi()
    recognition.lang = 'id-ID'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = event => {
      let nextCaption = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        nextCaption += event.results[index][0].transcript
      }
      setLiveCaption(nextCaption.trim())
    }

    recognition.onerror = () => {
      setLiveCaptionSupported(false)
    }

    try {
      recognition.start()
    } catch {
      setLiveCaptionSupported(false)
    }

    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      try {
        recognition.stop()
      } catch {
        // Browser may throw when recognition has already stopped.
      }
    }
  }, [state])

  const handleCameraStart = async () => {
    const granted = await startCamera()
    if (granted) {
      window.sessionStorage.setItem(cameraPreferenceKey, 'true')
      toast.success('Kamera aktif', {
        description: 'Preview kamera kamu sekarang tampil di sesi interview.',
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
    if (state !== 'listening') return

    await processAnswer('user_mic_off')
  }

  const handleStartInterview = () => {
    if (!introReady) return
    window.sessionStorage.setItem(interviewStartedKey, 'true')
    setHasStarted(true)
    setAnswerSeconds(0)
    setLiveCaption('')
    setAnswerStartedAt(null)
    setState(currentQuestionType === 'clarification' ? 'clarifying' : 'asking')
  }

  const handlePlayIntro = async () => {
    if (isPlayingIntro) return
    setIsPlayingIntro(true)
    try {
      await speakHrdQuestion(hrdIntroText)
      setIntroReady(true)
    } finally {
      setIsPlayingIntro(false)
    }
  }

  return (
    <div className="flex min-h-screen select-none flex-col bg-[#080A10]">
      <InterviewTopBar
        seconds={seconds}
        questionIndex={qIndex}
        totalQuestions={totalQuestions}
        practiceMode={practiceMode}
        onEndInterview={() => {
          toast.success('Sesi selesai', {
            description: 'Hasil latihan kamu sedang disiapkan.',
          })
        }}
      />
      <div className="hidden sm:block">
        <ProgressDots total={totalQuestions} current={qIndex} />
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

          <QuestionBubble question={displayQuestion} state={state} />
          <LiveCaptionPanel
            state={state}
            caption={liveCaption}
            supported={liveCaptionSupported}
          />
          {state === 'idle' && (
            <IdleStartPanel
              roleName={typeof window === 'undefined' ? 'target role' : (window.sessionStorage.getItem('road2work:selected-role-name') ?? 'target role')}
              answerLimitSeconds={answerLimitSeconds}
              introReady={introReady}
              isPlayingIntro={isPlayingIntro}
              onPlayIntro={handlePlayIntro}
              onStart={handleStartInterview}
            />
          )}
          <CameraControlBar
            cameraEnabled={!!cameraStream}
            cameraVisible={cameraVisible}
            cameraLoading={cameraStatus === 'requesting'}
            onStartCamera={handleCameraStart}
            onStopCamera={handleCameraStop}
            onToggleVisible={() => setCameraVisible(value => !value)}
          />
          <VoiceControlPanel
            state={state}
            onMicClick={handleMic}
            answerSeconds={answerSeconds}
            maxAnswerSeconds={answerLimitSeconds}
          />
        </div>
      </div>
    </div>
  )
}

function IdleStartPanel({
  roleName,
  answerLimitSeconds,
  introReady,
  isPlayingIntro,
  onPlayIntro,
  onStart,
}: {
  roleName: string
  answerLimitSeconds: number
  introReady: boolean
  isPlayingIntro: boolean
  onPlayIntro: () => void
  onStart: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4"
    >
      <div className="grid gap-3 text-sm text-white/65 sm:grid-cols-3">
        <div>
          <div className="font-mono text-[0.58rem] uppercase tracking-widest text-white/30">Target Role</div>
          <div className="mt-1 font-display font-bold text-white">{roleName}</div>
        </div>
        <div>
          <div className="font-mono text-[0.58rem] uppercase tracking-widest text-white/30">Waktu Jawab</div>
          <div className="mt-1 font-display font-bold text-white">{answerLimitSeconds} detik</div>
        </div>
        <div>
          <div className="font-mono text-[0.58rem] uppercase tracking-widest text-white/30">Mic</div>
          <div className="mt-1 font-display font-bold text-white">Aktif otomatis</div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button type="button" variant={introReady ? 'secondary' : 'primary'} size="lg" onClick={onPlayIntro} loading={isPlayingIntro}>
          <PlayCircle className="h-4 w-4" />
          {introReady ? 'Ulangi Arahan' : 'Dengar Arahan HRD'}
        </Button>
        <Button type="button" size="lg" onClick={onStart} disabled={!introReady || isPlayingIntro}>
          <PlayCircle className="h-4 w-4" />
          Mulai Interview
        </Button>
      </div>
    </motion.div>
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

function LiveCaptionPanel({
  state,
  caption,
  supported,
}: {
  state: InterviewState
  caption: string
  supported: boolean
}) {
  if (state !== 'listening') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-white/45">
            Live Caption
          </span>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/25">
          Preview lokal
        </span>
      </div>
      <p className="min-h-12 text-sm leading-6 text-white/75">
        {!supported
          ? 'Browser belum mendukung live caption. Jawaban tetap direkam dan diproses setelah kamu selesai menjawab.'
          : caption || 'Mulai bicara. Teks sementara akan muncul di sini jika browser menangkap suaramu.'}
      </p>
    </motion.div>
  )
}

function InterviewTopBar({
  seconds,
  questionIndex,
  totalQuestions,
  practiceMode,
  onEndInterview,
}: {
  seconds: number
  questionIndex: number
  totalQuestions: number
  practiceMode: PracticeMode
  onEndInterview: () => void
}) {
  const isAdaptive = practiceMode === 'adaptive_from_history'

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/[0.05] px-4 sm:px-8">
      <Logo dark />
      <div className="flex min-w-0 items-center gap-2 sm:gap-5">
        <div className="hidden items-center gap-1.5 rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 sm:flex">
          {isAdaptive ? <BrainCircuit className="h-3 w-3 text-brand-red" /> : <div className="h-1 w-1 rounded-full bg-brand-red" />}
          <span className="font-mono text-[0.62rem] font-semibold tracking-wide text-brand-red">
            {isAdaptive ? 'Sesi Adaptif' : 'Sesi Pertama'}
          </span>
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

function speakHrdQuestion(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    return waitForQuestionReading(text)
  }

  return new Promise<void>(resolve => {
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const indonesianVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('id'))
      ?? voices.find(voice => voice.name.toLowerCase().includes('indonesia'))

    if (indonesianVoice) utterance.voice = indonesianVoice
    utterance.lang = indonesianVoice?.lang ?? 'id-ID'
    utterance.rate = 0.94
    utterance.pitch = 1
    utterance.volume = 1

    let resolved = false
    const finish = () => {
      if (resolved) return
      resolved = true
      window.clearTimeout(timeoutId)
      window.clearInterval(keepAliveId)
      resolve()
    }
    const timeoutId = window.setTimeout(finish, estimateSpeechDuration(text) + 5000)
    const keepAliveId = window.setInterval(() => {
      if (!window.speechSynthesis.speaking) return
      window.speechSynthesis.resume()
    }, 1200)

    utterance.onend = finish
    utterance.onerror = finish

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  })
}

function stopHrdSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

function waitForQuestionReading(text: string) {
  return new Promise<void>(resolve => {
    window.setTimeout(resolve, estimateSpeechDuration(text))
  })
}

function estimateSpeechDuration(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(2200, Math.min(28000, words * 520))
}
