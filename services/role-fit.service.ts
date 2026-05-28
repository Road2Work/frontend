import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type { ApiSuccess, ConfirmRolePayload, GenerateRoleFitRankingPayload, RoleFitResult, RoleFitScorePayload } from '@/types/api-contract'

type RankingData = {
  recommendations?: RoleFitResult[]
  recommendedRoles?: RoleFitResult[]
}

function normalizeRoleFit(item: RoleFitResult): RoleFitResult {
  const strengths = item.strengths ?? []
  const gaps = item.gaps ?? []

  return {
    ...item,
    strengths,
    gaps,
    skillOverlap: item.skillOverlap ?? {
      matched: strengths.length,
      total: strengths.length + gaps.length,
      matchedSkills: strengths,
      missingSkills: gaps,
    },
  }
}

export const roleFitService = {
  async generateRanking(payload: GenerateRoleFitRankingPayload) {
    if (useMockApi) return mockRoad2WorkApi.generateRoleFitRanking(payload)
    const response = await http.post<ApiSuccess<RankingData>, GenerateRoleFitRankingPayload>(
      endpoints.roleFit.generateRanking,
      payload,
    )

    return {
      ...response,
      data: {
        ...response.data,
        recommendations: (response.data.recommendations ?? response.data.recommendedRoles ?? []).map(normalizeRoleFit),
      },
    }
  },

  async calculateScore(payload: RoleFitScorePayload) {
    if (useMockApi) return mockRoad2WorkApi.calculateRoleFitScore(payload)
    const response = await http.post<ApiSuccess<{ roleFit: RoleFitResult }>, RoleFitScorePayload>(endpoints.roleFit.score, payload)

    return {
      ...response,
      data: {
        roleFit: normalizeRoleFit(response.data.roleFit),
      },
    }
  },

  async confirmRole(payload: ConfirmRolePayload) {
    if (useMockApi) return mockRoad2WorkApi.confirmRole(payload)
    const response = await http.post<ApiSuccess<{ selectedRoleId?: string; roleFit: RoleFitResult }>, ConfirmRolePayload>(
      endpoints.roleFit.confirm,
      payload,
    )

    return {
      ...response,
      data: {
        ...response.data,
        selectedRoleId: response.data.selectedRoleId ?? payload.roleId,
        roleFit: normalizeRoleFit(response.data.roleFit),
      },
    }
  },
}
