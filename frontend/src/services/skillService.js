// Skill Service Layer
// TODO: Replace with Supabase pgvector skill store & Edge Function AI extraction logic

import { mockSkills } from '../data/mockSkills';

export const skillService = {
  async getEmployeeSkills(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return [...mockSkills];
  },

  async extractSkills(sourceData) {
    // TODO: Invoke AI Edge Function for skill extraction from text/resume/project description
    await new Promise(res => setTimeout(res, 300));
    return [
      { name: 'Python', confidence: 0.95 },
      { name: 'Docker', confidence: 0.90 }
    ];
  },

  async subscribeToSkillUpdates(employeeId, callback) {
    // TODO: Implement Supabase Realtime channel subscription
    // supabase.channel('skills').on('postgres_changes', ...)
    return () => {};
  }
};
