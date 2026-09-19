// Matching Service Layer
// TODO: Replace mock scoring with AI pgvector similarity & match engine Edge Function

import { mockRoles } from '../data/mockRoles';
import { mockHRAnalytics } from '../data/mockHRAnalytics';

export const matchingService = {
  async getRecommendedRoles(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 200));
    return [...mockRoles];
  },

  async calculateRoleMatch(employeeId, roleId) {
    // TODO: Call AI Edge Function '/functions/v1/role-matching'
    await new Promise(res => setTimeout(res, 250));
    const role = mockRoles.find(r => r.id === roleId) || mockRoles[0];
    return {
      matchScore: role.matchScore,
      whyMatch: [
        'Strong AWS project experience in microservices deployment.',
        'Proven Docker containerization skills across 3 core initiatives.',
        '3.5+ years of solid Python backend REST API development.',
        'Familiar with Linux terminal and production script environments.'
      ],
      matchedSkills: role.matchedSkills,
      partialSkills: role.partialSkills,
      missingSkills: role.missingSkills,
      experienceMatchScore: 90
    };
  },

  async getRoleMatchesForHR(roleId = 'role-1') {
    // TODO: Query candidate-role matching pipeline
    await new Promise(res => setTimeout(res, 200));
    return [
      {
        employee: mockHRAnalytics.employeesDirectory[0], // Ananya R
        matchScore: 91,
        matchedSkills: ['Python', 'AWS', 'Docker', 'Linux'],
        missingSkills: ['Kubernetes', 'Terraform'],
        experienceMatch: 'Exceeds minimum (3.5 yrs)'
      },
      {
        employee: mockHRAnalytics.employeesDirectory[1], // Rahul K
        matchScore: 88,
        matchedSkills: ['Java', 'AWS', 'Docker'],
        missingSkills: ['Python', 'Kubernetes'],
        experienceMatch: 'Exceeds minimum (4.0 yrs)'
      },
      {
        employee: mockHRAnalytics.employeesDirectory[2], // Priya S
        matchScore: 84,
        matchedSkills: ['Linux', 'Docker', 'Kubernetes'],
        missingSkills: ['Python', 'AWS'],
        experienceMatch: 'Exceeds minimum (5.2 yrs)'
      }
    ];
  }
};
