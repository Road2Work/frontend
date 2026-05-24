import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { ApiSuccess, CreateSessionPayload, InterviewQuestion, InterviewSession } from '@/types/api-contract'

export const interviewService = {
  createSession(payload: CreateSessionPayload) {
    if (useMockApi) return mockRoad2WorkApi.createSession(payload)
    return http.post<ApiSuccess<{ session: InterviewSession; currentQuestion: InterviewQuestion }>, CreateSessionPayload>(
      endpoints.interviews.createSession,
      payload,
    )
  },

  getSession(sessionId: string) {
    if (useMockApi) {
      return mockRoad2WorkApi.createSession({ profileId: 'profile_001', roleId: 'role_data_analyst', totalMainQuestions: 5 })
    }
    return http.get<ApiSuccess<{ session: InterviewSession; currentQuestion: InterviewQuestion; answers: unknown[] }>>(
      endpoints.interviews.getSession(sessionId),
    )
  },

  submitVoiceAnswer(sessionId: string, formData: FormData) {
    if (useMockApi) return mockRoad2WorkApi.submitVoiceAnswer(sessionId)
    return http.post<ApiSuccess<{ answer: unknown; nextQuestion: InterviewQuestion | null; isCompleted: boolean; resultId: string | null }>, FormData>(
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
}
