import { AppError, http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { ApiSuccess, CreateProfilePayload, ManualProfilePayload, Profile, ShortProfilePayload, UpdateProfilePayload } from '@/types/api-contract'

export const profileService = {
  createProfile(payload: CreateProfilePayload) {
    if (useMockApi) return mockRoad2WorkApi.createProfile(payload)
    return http.post<ApiSuccess<{ profile: Profile }>, CreateProfilePayload>(endpoints.profiles.create, payload)
  },

  getProfile(profileId: string) {
    if (useMockApi) return mockRoad2WorkApi.getProfile()
    return http.get<ApiSuccess<{ profile: Profile }>>(endpoints.profiles.getById(profileId))
  },

  uploadCV(profileId: string, formData: FormData) {
    if (useMockApi) return mockRoad2WorkApi.uploadCv(profileId)
    return http.post<ApiSuccess<{ profile: Profile; extraction: { status: string; source: 'cv' } }>, FormData>(
      endpoints.profiles.uploadCv(profileId),
      formData,
    )
  },

  async uploadCvForExtraction(formData: FormData) {
    if (useMockApi) return mockRoad2WorkApi.uploadCvForExtraction(formData)
    try {
      return await http.post<ApiSuccess<{ profile: Profile; extraction: { status: string; source: 'cv' } }>, FormData>(
        endpoints.profiles.uploadCvV2,
        formData,
      )
    } catch (error) {
      if (!(error instanceof AppError) || error.status !== 404) throw error

      const targetRoleId =
        typeof window !== 'undefined'
          ? (window.sessionStorage.getItem('road2work:selected-role-id') ?? 'role_data_analyst')
          : 'role_data_analyst'
      const created = await this.createProfile({ targetRoleId })

      return this.uploadCV(created.data.profile.id, formData)
    }
  },

  async createManualProfile(payload: ManualProfilePayload) {
    if (useMockApi) return mockRoad2WorkApi.createManualProfile(payload)
    try {
      return await http.post<ApiSuccess<{ profile: Profile; extraction: { status: string; source: 'manual' } }>, ManualProfilePayload>(
        endpoints.profiles.createManual,
        payload,
      )
    } catch (error) {
      if (!(error instanceof AppError) || error.status !== 404) throw error

      const created = await this.createProfile({ targetRoleId: payload.targetRoleId })

      return this.submitShortProfile(created.data.profile.id, {
        mostRelevantExperience: payload.mostRelevantExperience,
        skillsAndTools: payload.skillsAndTools,
        projectExperience: payload.projectExperience,
        achievementOrImpact: payload.achievementOrImpact,
      })
    }
  },

  updateProfile(profileId: string, payload: UpdateProfilePayload) {
    if (useMockApi) return mockRoad2WorkApi.updateProfile(profileId, payload)
    return http.patch<ApiSuccess<{ profile: Profile }>, UpdateProfilePayload>(endpoints.profiles.update(profileId), payload)
  },

  confirmProfile(profileId: string) {
    if (useMockApi) return mockRoad2WorkApi.confirmProfile(profileId)
    return http.post<ApiSuccess<{ profile: Profile }>>(endpoints.profiles.confirm(profileId))
  },

  submitShortProfile(profileId: string, payload: ShortProfilePayload) {
    if (useMockApi) return mockRoad2WorkApi.submitShortProfile(profileId, payload)
    return http.post<ApiSuccess<{ profile: Profile; extraction: { status: string; source: 'short_profile' } }>, ShortProfilePayload>(
      endpoints.profiles.submitContext(profileId),
      payload,
    )
  },
}
