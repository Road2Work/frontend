import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { ApiSuccess, InterviewHistoryItem, InterviewResult } from '@/types/api-contract'

export const resultService = {
  getResult(sessionId: string) {
    if (useMockApi) return mockRoad2WorkApi.getResult(sessionId)
    return http.get<ApiSuccess<{ result: InterviewResult }>>(endpoints.interviews.getResult(sessionId))
  },

  getHistory(params?: { profileId?: string; roleId?: string }) {
    if (useMockApi) return mockRoad2WorkApi.getHistory(params)
    return http.get<ApiSuccess<{ history: InterviewHistoryItem[] }>>(
      endpoints.interviews.history,
      { params },
    )
  },
}
