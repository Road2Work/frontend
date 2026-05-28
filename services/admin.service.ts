import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type {
  AdminAnalytics,
  AdminUser,
  ApiSuccess,
  CreateDomainPayload,
  CreateRoleFamilyPayload,
  CreateRolePayload,
  Domain,
  InterviewCompetency,
  Role,
  RoleFamily,
} from '@/types/api-contract'

export const adminService = {
  getUsers() {
    if (useMockApi) return mockRoad2WorkApi.getAdminUsers()
    return http.get<ApiSuccess<{ users: AdminUser[] }>>(endpoints.admin.users)
  },

  getAnalytics() {
    if (useMockApi) return mockRoad2WorkApi.getAdminAnalytics()
    return http.get<ApiSuccess<{ analytics: AdminAnalytics }>>(endpoints.admin.analytics)
  },

  createDomain(payload: CreateDomainPayload) {
    if (useMockApi) return mockRoad2WorkApi.createAdminDomain(payload)
    return http.post<ApiSuccess<{ domain: Domain }>, CreateDomainPayload>(endpoints.admin.domains, payload)
  },

  updateDomain(id: string, payload: Partial<CreateDomainPayload>) {
    if (useMockApi) return mockRoad2WorkApi.updateAdminDomain(id, payload)
    return http.patch<ApiSuccess<{ domain: Domain }>, Partial<CreateDomainPayload>>(endpoints.admin.domainById(id), payload)
  },

  deleteDomain(id: string) {
    if (useMockApi) return mockRoad2WorkApi.deleteAdminDomain(id)
    return http.delete<ApiSuccess<{ id: string }>>(endpoints.admin.domainById(id))
  },

  createRoleFamily(payload: CreateRoleFamilyPayload) {
    if (useMockApi) return mockRoad2WorkApi.createAdminRoleFamily(payload)
    return http.post<ApiSuccess<{ roleFamily: RoleFamily }>, CreateRoleFamilyPayload>(endpoints.admin.roleFamilies, payload)
  },

  updateRoleFamily(id: string, payload: Partial<CreateRoleFamilyPayload>) {
    if (useMockApi) return mockRoad2WorkApi.updateAdminRoleFamily(id, payload)
    return http.patch<ApiSuccess<{ roleFamily: RoleFamily }>, Partial<CreateRoleFamilyPayload>>(endpoints.admin.roleFamilyById(id), payload)
  },

  deleteRoleFamily(id: string) {
    if (useMockApi) return mockRoad2WorkApi.deleteAdminRoleFamily(id)
    return http.delete<ApiSuccess<{ id: string }>>(endpoints.admin.roleFamilyById(id))
  },

  createRole(payload: CreateRolePayload) {
    if (useMockApi) return mockRoad2WorkApi.createAdminRole(payload)
    return http.post<ApiSuccess<{ role: Role }>, CreateRolePayload>(endpoints.admin.roles, payload)
  },

  updateRole(id: string, payload: Partial<CreateRolePayload>) {
    if (useMockApi) return mockRoad2WorkApi.updateAdminRole(id, payload)
    return http.patch<ApiSuccess<{ role: Role }>, Partial<CreateRolePayload>>(endpoints.admin.roleById(id), payload)
  },

  updateRoleCompetencyMap(id: string, payload: { competencyMap: InterviewCompetency[] }) {
    if (useMockApi) return mockRoad2WorkApi.updateAdminRoleCompetencyMap(id, payload)
    return http.patch<ApiSuccess<{ role: Role }>, typeof payload>(endpoints.admin.roleCompetencyMap(id), payload)
  },

  deleteRole(id: string) {
    if (useMockApi) return mockRoad2WorkApi.deleteAdminRole(id)
    return http.delete<ApiSuccess<{ id: string }>>(endpoints.admin.roleById(id))
  },
}
