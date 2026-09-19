// Employee Service Layer
// TODO: Replace with Supabase database queries ('employees', 'experiences', 'work_history')

import { mockEmployee } from '../data/mockEmployee';
import { mockHRAnalytics } from '../data/mockHRAnalytics';

export const employeeService = {
  async getEmployeeProfile(id = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    if (id === 'emp-101') return { ...mockEmployee };
    const emp = mockHRAnalytics.employeesDirectory.find(e => e.id === id);
    return emp ? { ...mockEmployee, ...emp } : mockEmployee;
  },

  async updateProfile(updates) {
    // TODO: supabase.from('employees').update(updates).eq('id', updates.id)
    await new Promise(res => setTimeout(res, 200));
    return { ...mockEmployee, ...updates };
  },

  async addExperience(experience) {
    // TODO: supabase.from('experiences').insert(experience)
    await new Promise(res => setTimeout(res, 200));
    return { id: `exp-${Date.now()}`, ...experience };
  },

  async addWorkHistory(history) {
    // TODO: supabase.from('work_history').insert(history)
    await new Promise(res => setTimeout(res, 200));
    return { id: `wh-${Date.now()}`, ...history };
  },

  async getEmployees(filters = {}) {
    await new Promise(res => setTimeout(res, 150));
    let list = [...mockHRAnalytics.employeesDirectory];
    if (filters.department) {
      list = list.filter(e => e.department === filters.department);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(e => e.fullName.toLowerCase().includes(q) || e.role.toLowerCase().includes(q));
    }
    return list;
  }
};
