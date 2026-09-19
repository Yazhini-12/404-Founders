// Project Service Layer
// TODO: Replace with Supabase database queries ('projects') and Edge Function triggers

import { mockProjects } from '../data/mockProjects';

export const projectService = {
  async getEmployeeProjects(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return [...mockProjects];
  },

  async addProject(projectData) {
    // TODO: supabase.from('projects').insert(projectData)
    // TODO: Trigger Edge Function for AI skill extraction from project description
    await new Promise(res => setTimeout(res, 250));
    const newProject = {
      id: `proj-${Date.now()}`,
      ...projectData,
      detectedSkills: projectData.technologies || ['Python', 'Cloud Services'],
      status: projectData.status || 'Completed'
    };
    return newProject;
  }
};
