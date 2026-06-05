import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type { ApiSuccess, ConfirmRolePayload, GenerateRoleFitRankingPayload, RoleFitResult, RoleFitScorePayload } from '@/types/api-contract'

type RankingData = {
  recommendations?: RoleFitResult[]
  recommendedRoles?: RoleFitResult[]
}

export function normalizeRoleFit(item: Partial<RoleFitResult> | null | undefined, fallback?: Partial<RoleFitResult>): RoleFitResult {
  const source = { ...fallback, ...item }
  const strengths = source.strengths ?? []
  const gaps = source.gaps ?? []
  const roleId = source.roleId ?? fallback?.roleId ?? ''

  return {
    id: source.id ?? `role_fit_${roleId || 'selected'}`,
    profileId: source.profileId ?? fallback?.profileId ?? '',
    roleId,
    roleName: source.roleName ?? fallback?.roleName ?? 'Role terpilih',
    fitScore: source.fitScore ?? fallback?.fitScore ?? 0,
    rank: source.rank ?? fallback?.rank ?? null,
    reason: source.reason ?? fallback?.reason ?? 'Role ini dipilih sebagai target latihan interview kamu.',
    strengths,
    gaps,
    skillOverlap: source.skillOverlap ?? {
      matched: strengths.length,
      total: strengths.length + gaps.length,
      matchedSkills: strengths,
      missingSkills: gaps,
    },
    createdAt: source.createdAt ?? fallback?.createdAt ?? new Date().toISOString(),
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
        recommendations: (response.data.recommendations ?? response.data.recommendedRoles ?? []).map(item => normalizeRoleFit(item)),
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

  async confirmRole(payload: ConfirmRolePayload, fallbackRoleFit?: Partial<RoleFitResult>) {
    if (useMockApi) return mockRoad2WorkApi.confirmRole(payload)
    const response = await http.post<ApiSuccess<{ selectedRoleId?: string; roleFit?: RoleFitResult }>, ConfirmRolePayload>(
      endpoints.roleFit.confirm,
      payload,
    )

    return {
      ...response,
      data: {
        ...response.data,
        selectedRoleId: response.data.selectedRoleId ?? payload.roleId,
        roleFit: normalizeRoleFit(response.data.roleFit, {
          ...fallbackRoleFit,
          profileId: fallbackRoleFit?.profileId ?? payload.profileId,
          roleId: fallbackRoleFit?.roleId ?? payload.roleId,
        }),
      },
    }
  },
}
