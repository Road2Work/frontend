import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type { ApiSuccess, CareerReadinessDashboard } from '@/types/api-contract'

export const dashboardService = {
  getDashboard() {
    if (useMockApi) return mockRoad2WorkApi.getDashboard()
    return http.get<ApiSuccess<{ dashboard: CareerReadinessDashboard }>>(endpoints.dashboard.get)
  },

  refreshDashboard(payload: { profileId: string }) {
    if (useMockApi) return mockRoad2WorkApi.getDashboard()
    return http.post<ApiSuccess<{ dashboard: CareerReadinessDashboard }>, typeof payload>(endpoints.dashboard.refresh, payload)
  },

  downloadSummary() {
    if (useMockApi) return mockRoad2WorkApi.downloadCareerSummary()
    return http.get<ApiSuccess<{ downloadUrl: string }>>(endpoints.dashboard.downloadSummary)
  },
}
