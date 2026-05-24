import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { ApiSuccess, InterviewResult } from '@/types/api-contract'

export const resultService = {
  getResult(sessionId: string) {
    if (useMockApi) return mockRoad2WorkApi.getResult(sessionId)
    return http.get<ApiSuccess<{ result: InterviewResult }>>(endpoints.interviews.getResult(sessionId))
  },

  getHistory() {
    if (useMockApi) return mockRoad2WorkApi.getHistory()
    return http.get<ApiSuccess<{ history: Array<{ sessionId: string; resultId: string; targetRole: string; finalScore: number; readinessStatus: string; createdAt: string }> }>>(
      endpoints.interviews.history,
    )
  },
}
