import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { ApiSuccess, CreateProfilePayload, Profile, ShortProfilePayload } from '@/types/api-contract'

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

  submitShortProfile(profileId: string, payload: ShortProfilePayload) {
    if (useMockApi) return mockRoad2WorkApi.submitShortProfile(profileId, payload)
    return http.post<ApiSuccess<{ profile: Profile; extraction: { status: string; source: 'short_profile' } }>, ShortProfilePayload>(
      endpoints.profiles.submitContext(profileId),
      payload,
    )
  },
}
