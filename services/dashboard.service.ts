import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type { ApiSuccess, CareerReadinessDashboard } from '@/types/api-contract'

export const dashboardService = {
  getDashboard() {
    if (useMockApi) return mockRoad2WorkApi.getDashboard()
    return http
      .get<ApiSuccess<{ dashboard: CareerReadinessDashboard }>>(endpoints.dashboard.get)
      .then(response => ({
        ...response,
        data: {
          ...response.data,
          dashboard: normalizeDashboard(response.data.dashboard),
        },
      }))
  },

  refreshDashboard(payload: { profileId: string }) {
    if (useMockApi) return mockRoad2WorkApi.getDashboard()
    return http
      .post<ApiSuccess<{ dashboard: CareerReadinessDashboard }>, typeof payload>(endpoints.dashboard.refresh, payload)
      .then(response => ({
        ...response,
        data: {
          ...response.data,
          dashboard: normalizeDashboard(response.data.dashboard),
        },
      }))
  },

  downloadSummary() {
    if (useMockApi) return mockRoad2WorkApi.downloadCareerSummary()
    return http.get<ApiSuccess<{ downloadUrl: string }>>(endpoints.dashboard.downloadSummary)
  },
}

type RawRecord = Record<string, unknown>

function normalizeDashboard(rawDashboard: unknown): CareerReadinessDashboard {
  const raw = isRecord(rawDashboard) ? rawDashboard : {}
  const legacyProfile = getRecord(raw.profile)
  const selectedRoleRaw = getRecord(raw.selectedRole) ?? getRecord(raw.selected_role)
  const latestResultRaw = getRecord(raw.latestResult) ?? getRecord(raw.latest_result)
  const latestInterviewRaw = getRecord(raw.latestInterviewFeedback) ?? getRecord(raw.latest_interview_feedback)
  const scoreBreakdownRaw = getRecord(latestResultRaw?.scoreBreakdown) ?? getRecord(latestResultRaw?.score_breakdown)
  const profileSummaryRaw = raw.profileSummary ?? raw.profile_summary ?? legacyProfile?.profileSummary ?? legacyProfile?.profile_summary
  const evidenceScore = clampScore(raw.evidenceScore ?? raw.evidence_score ?? legacyProfile?.evidenceScore ?? legacyProfile?.initialEvidenceScore ?? 0)
  const roleFitScore = clampScore(raw.roleFitScore ?? raw.role_fit_score ?? 0)
  const interviewReadinessScore = clampScore(raw.interviewReadinessScore ?? raw.interview_readiness_score ?? latestResultRaw?.finalScore ?? latestResultRaw?.final_score ?? 0)
  const profileCompletenessScore = clampScore(raw.profileCompletenessScore ?? raw.profile_completeness_score ?? 0)
  const careerReadinessScore = clampScore(
    raw.careerReadinessScore ??
    raw.career_readiness_score ??
    evidenceScore * 0.3 + roleFitScore * 0.3 + interviewReadinessScore * 0.25 + profileCompletenessScore * 0.15,
  )
  const selectedRoleName = getString(selectedRoleRaw?.name ?? selectedRoleRaw?.roleName ?? selectedRoleRaw?.role_name, 'Role belum dipilih')
  const userRaw = getRecord(raw.user)

  return {
    user: {
      id: getString(userRaw?.id, ''),
      name: getString(userRaw?.name ?? userRaw?.fullname, 'Road2Work User'),
      email: getString(userRaw?.email, ''),
      status: getString(userRaw?.status, 'active') as CareerReadinessDashboard['user']['status'],
    },
    profileId: getString(raw.profileId ?? raw.profile_id ?? legacyProfile?.id, ''),
    selectedRole: {
      id: getString(selectedRoleRaw?.id, ''),
      name: selectedRoleName,
    },
    careerReadinessScore,
    readinessStatus: normalizeReadinessStatus(raw.readinessStatus ?? raw.readiness_status, careerReadinessScore),
    scoreMessage: getOptionalString(raw.scoreMessage ?? raw.score_message),
    evidenceScore,
    roleFitScore,
    interviewReadinessScore,
    profileCompletenessScore,
    nextBestActions: normalizeNextBestActions(raw.nextBestActions ?? raw.next_best_actions, interviewReadinessScore),
    strengths: normalizeStringArray(raw.strengths),
    gaps: normalizeStringArray(raw.gaps),
    profileSummary: normalizeProfileSummary(profileSummaryRaw, legacyProfile),
    roleRecommendation: normalizeRoleRecommendation(raw.roleRecommendation ?? raw.role_recommendation, selectedRoleRaw, roleFitScore),
    latestInterviewFeedback: normalizeLatestInterview(latestInterviewRaw, latestResultRaw),
    adaptiveInterviewInsight: normalizeAdaptiveInsight(raw.adaptiveInterviewInsight ?? raw.adaptive_interview_insight, latestResultRaw, scoreBreakdownRaw),
    activityTimeline: normalizeTimeline(raw.activityTimeline ?? raw.activity_timeline, legacyProfile, latestResultRaw),
    canDownloadSummary: getBoolean(raw.canDownloadSummary ?? raw.can_download_summary, careerReadinessScore >= 90),
    downloadRequirement: getOptionalString(raw.downloadRequirement ?? raw.download_requirement),
    updatedAt: getString(raw.updatedAt ?? raw.updated_at, new Date().toISOString()),
  }
}

function normalizeProfileSummary(value: unknown, legacyProfile?: RawRecord): CareerReadinessDashboard['profileSummary'] {
  if (isRecord(value)) {
    return {
      text: getString(value.text, 'Profil belum lengkap.'),
      tags: normalizeStringArray(value.tags),
    }
  }

  return {
    text: getString(value, 'Profil belum lengkap. Lengkapi profil agar rekomendasi lebih akurat.'),
    tags: [
      ...normalizeStringArray(legacyProfile?.skills).slice(0, 3),
      ...normalizeStringArray(legacyProfile?.tools).slice(0, 2),
    ],
  }
}

function normalizeRoleRecommendation(value: unknown, selectedRoleRaw: RawRecord | undefined, roleFitScore: number): CareerReadinessDashboard['roleRecommendation'] {
  const raw = getRecord(value)
  if (!raw && !selectedRoleRaw) return null
  const roleName = getString(raw?.roleName ?? raw?.role_name ?? selectedRoleRaw?.name ?? selectedRoleRaw?.roleName ?? selectedRoleRaw?.role_name, 'Role target')

  return {
    id: getString(raw?.id, `role_fit_${getString(selectedRoleRaw?.id, 'role')}`),
    profileId: getString(raw?.profileId ?? raw?.profile_id, ''),
    roleId: getString(raw?.roleId ?? raw?.role_id ?? selectedRoleRaw?.id, ''),
    roleName,
    fitScore: clampScore(raw?.fitScore ?? raw?.fit_score ?? roleFitScore),
    reason: getString(raw?.reason, `Role ${roleName} dipilih berdasarkan profil dan hasil latihan terbaru.`),
    strengths: normalizeStringArray(raw?.strengths),
    gaps: normalizeStringArray(raw?.gaps),
    skillOverlap: {
      matched: clampScore(getRecord(raw?.skillOverlap ?? raw?.skill_overlap)?.matched ?? 0),
      total: clampScore(getRecord(raw?.skillOverlap ?? raw?.skill_overlap)?.total ?? 0),
      matchedSkills: normalizeStringArray(getRecord(raw?.skillOverlap ?? raw?.skill_overlap)?.matchedSkills ?? getRecord(raw?.skillOverlap ?? raw?.skill_overlap)?.matched_skills),
      missingSkills: normalizeStringArray(getRecord(raw?.skillOverlap ?? raw?.skill_overlap)?.missingSkills ?? getRecord(raw?.skillOverlap ?? raw?.skill_overlap)?.missing_skills),
    },
    createdAt: getString(raw?.createdAt ?? raw?.created_at, new Date().toISOString()),
  }
}

function normalizeLatestInterview(value: RawRecord | undefined, latestResultRaw?: RawRecord): CareerReadinessDashboard['latestInterviewFeedback'] {
  const raw = value ?? latestResultRaw
  if (!raw) return null
  const score = clampScore(raw.score ?? raw.finalScore ?? raw.final_score)
  return {
    sessionId: getString(raw.sessionId ?? raw.session_id, ''),
    score,
    summary: getString(raw.summary, `Sesi terakhir selesai dengan skor ${score}. Lanjutkan latihan dengan fokus pada bukti dan struktur jawaban.`),
    completedAt: getString(raw.completedAt ?? raw.completed_at ?? raw.createdAt ?? raw.created_at, new Date().toISOString()),
  }
}

function normalizeAdaptiveInsight(value: unknown, latestResultRaw?: RawRecord, scoreBreakdownRaw?: RawRecord): CareerReadinessDashboard['adaptiveInterviewInsight'] {
  const raw = getRecord(value)
  if (!raw && !latestResultRaw) return undefined
  return {
    lastWeaknesses: normalizeStringArray(raw?.lastWeaknesses ?? raw?.last_weaknesses).length
      ? normalizeStringArray(raw?.lastWeaknesses ?? raw?.last_weaknesses)
      : getLowestScoreKeys(scoreBreakdownRaw),
    recommendedFocus: normalizeStringArray(raw?.recommendedFocus ?? raw?.recommended_focus).length
      ? normalizeStringArray(raw?.recommendedFocus ?? raw?.recommended_focus)
      : getLowestScoreKeys(scoreBreakdownRaw),
    avoidRepeatedQuestions: getBoolean(raw?.avoidRepeatedQuestions ?? raw?.avoid_repeated_questions, true),
  }
}

function normalizeTimeline(value: unknown, legacyProfile?: RawRecord, latestResultRaw?: RawRecord): CareerReadinessDashboard['activityTimeline'] {
  if (Array.isArray(value) && value.length) {
    return value.map((item, index) => {
      const raw = getRecord(item) ?? {}
      return {
        id: getString(raw.id, `activity_${index}`),
        title: getString(raw.title, 'Aktivitas Road2Work'),
        description: getString(raw.description, ''),
        createdAt: getString(raw.createdAt ?? raw.created_at, new Date().toISOString()),
      }
    })
  }

  const timeline = []
  if (latestResultRaw) {
    timeline.push({
      id: 'latest_result',
      title: 'Interview selesai dievaluasi',
      description: `Skor terbaru: ${clampScore(latestResultRaw.finalScore ?? latestResultRaw.final_score)}.`,
      createdAt: getString(latestResultRaw.createdAt ?? latestResultRaw.created_at, new Date().toISOString()),
    })
  }
  if (legacyProfile) {
    timeline.push({
      id: 'profile_created',
      title: 'Profil profesional dibuat',
      description: 'Road2Work sudah membaca konteks awal dari CV atau profil singkatmu.',
      createdAt: getString(legacyProfile.createdAt ?? legacyProfile.created_at, new Date().toISOString()),
    })
  }

  return timeline
}

function normalizeNextBestActions(value: unknown, interviewReadinessScore: number): CareerReadinessDashboard['nextBestActions'] {
  if (Array.isArray(value) && value.length) {
    return value.map((item, index) => {
      const raw = getRecord(item) ?? {}
      return {
        id: getString(raw.id, `action_${index}`),
        title: getString(raw.title, 'Lanjutkan latihan'),
        description: getString(raw.description, 'Perkuat jawaban dengan contoh nyata dan hasil terukur.'),
        impactLabel: getString(raw.impactLabel ?? raw.impact_label, 'Tinggi') as CareerReadinessDashboard['nextBestActions'][number]['impactLabel'],
        impactScoreText: getOptionalString(raw.impactScoreText ?? raw.impact_score_text),
        actionType: getString(raw.actionType ?? raw.action_type, 'practice_interview') as CareerReadinessDashboard['nextBestActions'][number]['actionType'],
      }
    })
  }

  return [{
    id: 'practice_interview',
    title: interviewReadinessScore ? 'Latihan ulang dengan fokus area terlemah' : 'Mulai sesi interview pertama',
    description: 'Jawab dengan contoh nyata, kontribusi pribadi, tools yang dipakai, dan hasil yang terukur.',
    impactLabel: 'Tinggi',
    impactScoreText: '+12-18 pts',
    actionType: 'practice_interview',
  }]
}

function normalizeReadinessStatus(value: unknown, score: number): CareerReadinessDashboard['readinessStatus'] {
  const text = getString(value, '')
  if (text === 'Belum siap' || text === 'Mulai siap' || text === 'Hampir siap' || text === 'Siap melamar') return text
  if (score >= 90) return 'Siap melamar'
  if (score >= 75) return 'Hampir siap'
  if (score >= 55) return 'Mulai siap'
  return 'Belum siap'
}

function getLowestScoreKeys(scoreBreakdownRaw?: RawRecord) {
  if (!scoreBreakdownRaw) return []
  return Object.entries(scoreBreakdownRaw)
    .sort((a, b) => Number(a[1]) - Number(b[1]))
    .slice(0, 3)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replaceAll('_', ' ').trim())
}

function getRecord(value: unknown): RawRecord | undefined {
  return isRecord(value) ? value : undefined
}

function isRecord(value: unknown): value is RawRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.map(item => String(item)).filter(Boolean)
}

function getString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function getOptionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function getBoolean(value: unknown, fallback: boolean) {
  return typeof value === 'boolean' ? value : fallback
}

function clampScore(value: unknown) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return 0
  return Math.max(0, Math.min(100, Math.round(numberValue)))
}
