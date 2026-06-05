import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type {
  AdaptivePracticeMemory,
  ApiSuccess,
  CreateSessionPayload,
  InterviewQuestion,
  InterviewSession,
  SubmitVoiceAnswerPayload,
  SubmitVoiceAnswerResponse,
} from '@/types/api-contract'

export type InterviewQuotaResponse = {
  freeInterviewQuota?: number
  usedInterviewCount?: number
  remainingQuota?: number
  remainingInterviewCount?: number
  quota?: {
    total: number
    used: number
    remaining: number
    isExceeded?: boolean
  }
}

export const interviewService = {
  createSession(payload: CreateSessionPayload) {
    if (useMockApi) return mockRoad2WorkApi.createSession(payload)
    return http.post<ApiSuccess<{ session: InterviewSession; adaptiveMemory?: AdaptivePracticeMemory; currentQuestion: InterviewQuestion; quota?: { freeInterviewQuota: number; usedInterviewCount: number; remainingInterviewCount: number } }>, CreateSessionPayload>(
      endpoints.interviews.createSession,
      payload,
    )
  },

  getSession(sessionId: string) {
    if (useMockApi) {
      return mockRoad2WorkApi.createSession({ profileId: 'profile_001', roleId: 'role_data_analyst', questionCount: 5 })
    }
    return http.get<ApiSuccess<{ session: InterviewSession; currentQuestion: InterviewQuestion; answers: unknown[] }>>(
      endpoints.interviews.getSession(sessionId),
    )
  },

  submitVoiceAnswer(sessionId: string, payload: FormData | SubmitVoiceAnswerPayload) {
    if (useMockApi) return mockRoad2WorkApi.submitVoiceAnswer(sessionId, payload)
    const formData = payload instanceof FormData ? payload : createVoiceAnswerFormData(payload)
    return http.post<ApiSuccess<SubmitVoiceAnswerResponse>, FormData>(
      endpoints.interviews.submitVoiceAnswer(sessionId),
      formData,
    )
  },

  cancelSession(sessionId: string) {
    if (useMockApi) {
      return Promise.resolve({ success: true as const, message: 'Interview session cancelled successfully', data: { session: { id: sessionId, status: 'cancelled' } } })
    }
    return http.patch<ApiSuccess<{ session: { id: string; status: 'cancelled' } }>>(endpoints.interviews.cancelSession(sessionId))
  },

  getQuota() {
    if (useMockApi) return mockRoad2WorkApi.getQuota()
    return http.get<ApiSuccess<InterviewQuotaResponse>>(endpoints.interviews.quota)
  },

  getPracticeMemory(params: { profileId: string; roleId: string }) {
    if (useMockApi) return mockRoad2WorkApi.getPracticeMemory(params)
    return http.get<ApiSuccess<{ adaptiveMemory: AdaptivePracticeMemory }>>(endpoints.interviews.practiceMemory, { params })
  },
}

function createVoiceAnswerFormData(payload: SubmitVoiceAnswerPayload) {
  const formData = new FormData()
  const audioFilename = getAudioFilename(payload.audioFile)
  formData.append('questionId', payload.questionId)
  formData.append('questionType', payload.questionType)
  formData.append('audioFile', payload.audioFile, audioFilename)
  formData.append('recordingStartedAt', payload.recordingStartedAt)
  formData.append('recordingEndedAt', payload.recordingEndedAt)
  formData.append('answerDurationSec', String(payload.answerDurationSec))
  formData.append('maxDurationSec', String(payload.maxDurationSec))
  formData.append('stopReason', payload.stopReason)
  formData.append('autoMicStarted', String(payload.autoMicStarted))
  formData.append('silenceAutoStopEnabled', String(payload.silenceAutoStopEnabled))
  return formData
}

function getAudioFilename(audioFile: Blob) {
  const extensionByMime: Record<string, string> = {
    'audio/webm': 'webm',
    'audio/webm;codecs=opus': 'webm',
    'audio/mp4': 'mp4',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/x-wav': 'wav',
    'audio/ogg': 'ogg',
  }

  const extension = extensionByMime[audioFile.type] ?? 'webm'
  return `answer.${extension}`
}
