import { http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { useMockApi } from '@/services/api-mode'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import type { ApiSuccess, Domain, LegacyRoleFamily, Role, RoleFamily } from '@/types/api-contract'

function normalizeRole(role: Role): Role {
  const roleName = role.roleName ?? role.name ?? 'Untitled Role'

  return {
    ...role,
    name: role.name ?? roleName,
    roleName,
  }
}

export const domainService = {
  getDomains() {
    if (useMockApi) return mockRoad2WorkApi.getDomains()
    return http.get<ApiSuccess<{ domains: Domain[] }>>(endpoints.domains.getAll)
  },
}

export const roleFamilyService = {
  getRoleFamilies(domainId?: string) {
    if (useMockApi) return mockRoad2WorkApi.getRoleFamilies(domainId)
    return http.get<ApiSuccess<{ roleFamilies: RoleFamily[] }>>(endpoints.roleFamilies.getAll, {
      params: domainId ? { domainId } : undefined,
    })
  },
}

export const roleService = {
  async getRoles(roleFamily?: string) {
    if (useMockApi) return mockRoad2WorkApi.getRoles(roleFamily)
    const response = await http.get<ApiSuccess<{ roleFamilies?: LegacyRoleFamily[]; roles?: Role[] }>>(endpoints.roles.getAll, {
      params: roleFamily ? { roleFamily } : undefined,
    })

    if (response.data.roleFamilies) {
      return {
        ...response,
        data: {
          roleFamilies: response.data.roleFamilies.map(family => ({
            ...family,
            roles: family.roles.map(normalizeRole),
          })),
        },
      }
    }

    return {
      ...response,
      data: {
        roleFamilies: [
          {
            name: 'Role tersedia',
            roles: (response.data.roles ?? []).map(normalizeRole),
          },
        ],
      },
    }
  },

  async getRolesByFamily(roleFamilyId?: string) {
    if (useMockApi) return mockRoad2WorkApi.getRolesByFamily(roleFamilyId)
    const response = await http.get<ApiSuccess<{ roles: Role[] }>>(endpoints.roles.getAll, {
      params: roleFamilyId ? { roleFamilyId } : undefined,
    })

    return {
      ...response,
      data: {
        roles: response.data.roles.map(normalizeRole),
      },
    }
  },

  async getRoleDetail(roleId: string) {
    if (useMockApi) return mockRoad2WorkApi.getRoleDetail(roleId)
    const response = await http.get<ApiSuccess<{ role: Role }>>(endpoints.roles.getById(roleId))

    return {
      ...response,
      data: {
        role: normalizeRole(response.data.role),
      },
    }
  },
}

export function getRoleIdByName(roleName: string) {
  return `role_${roleName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`
}
