// Internal Role Service Layer
// TODO: Replace with Supabase database queries ('internal_roles') and Edge Function matching triggers

import { mockRoles } from '../data/mockRoles';

export const roleService = {
  async getInternalRoles(filters = {}) {
    await new Promise(res => setTimeout(res, 150));
    let roles = [...mockRoles];
    if (filters.department) {
      roles = roles.filter(r => r.department === filters.department);
    }
    if (filters.minMatch) {
      roles = roles.filter(r => r.matchScore >= filters.minMatch);
    }
    return roles;
  },

  async getRoleDetails(roleId) {
    await new Promise(res => setTimeout(res, 150));
    const role = mockRoles.find(r => r.id === roleId || r.id === `role-${roleId}`);
    return role || mockRoles[0];
  },

  async createRole(roleData) {
    // TODO: supabase.from('internal_roles').insert(roleData)
    await new Promise(res => setTimeout(res, 250));
    const newRole = {
      id: `role-${Date.now()}`,
      ...roleData,
      matchScore: 85,
      candidatesCount: 0,
      topMatch: 85,
      matchedSkills: roleData.requirements?.map(r => r.skill) || []
    };
    mockRoles.unshift(newRole);
    return newRole;
  }
};
