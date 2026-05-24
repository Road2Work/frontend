import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type { ApiSuccess, Role, RoleFamily } from '@/types/api-contract'

export const roleService = {
  getRoles(roleFamily?: string) {
    if (useMockApi) return mockRoad2WorkApi.getRoles(roleFamily)
    return http.get<ApiSuccess<{ roleFamilies: RoleFamily[] }>>(endpoints.roles.getAll, {
      params: roleFamily ? { roleFamily } : undefined,
    })
  },

  getRoleDetail(roleId: string) {
    if (useMockApi) return mockRoad2WorkApi.getRoleDetail(roleId)
    return http.get<ApiSuccess<{ role: Role }>>(endpoints.roles.getById(roleId))
  },
}

export function getRoleIdByName(roleName: string) {
  return `role_${roleName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`
}
