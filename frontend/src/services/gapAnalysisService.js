// Skill Gap Analysis Service Layer
// TODO: Replace with AI Skill Gap Engine Edge Function

export const gapAnalysisService = {
  async analyzeSkillGap(employeeId = 'emp-101', targetRoleId = 'role-1') {
    await new Promise(res => setTimeout(res, 200));
    return {
      targetRole: 'Cloud Engineer',
      overallReadiness: 74,
      skillsComparison: [
        { skill: 'AWS', current: 78, required: 80, status: 'Ready' },
        { skill: 'Docker', current: 84, required: 75, status: 'Ready' },
        { skill: 'Python', current: 92, required: 80, status: 'Ready' },
        { skill: 'Linux', current: 80, required: 75, status: 'Ready' },
        { skill: 'Kubernetes', current: 52, required: 75, status: 'Needs Improvement' },
        { skill: 'Terraform', current: 20, required: 65, status: 'Major Gap' },
        { skill: 'Cloud Security', current: 40, required: 70, status: 'Major Gap' }
      ],
      prioritySkills: [
        { name: 'Terraform', gap: 45, impact: 'High', estimatedHours: 12 },
        { name: 'Kubernetes', gap: 23, impact: 'High', estimatedHours: 15 },
        { name: 'Cloud Security', gap: 30, impact: 'Medium', estimatedHours: 8 }
      ],
      recommendations: [
        {
          id: 'rec-1',
          title: 'Kubernetes Fundamentals (CKAD Prep)',
          targetSkill: 'Kubernetes',
          difficulty: 'Intermediate',
          estimatedDuration: '6 Hours',
          provider: 'CNCF / SkillSync'
        },
        {
          id: 'rec-2',
          title: 'Terraform Basics & Infrastructure as Code',
          targetSkill: 'Terraform',
          difficulty: 'Beginner',
          estimatedDuration: '8 Hours',
          provider: 'HashiCorp'
        },
        {
          id: 'rec-3',
          title: 'AWS Security Architecture Hands-On Lab',
          targetSkill: 'Cloud Security',
          difficulty: 'Intermediate',
          estimatedDuration: '5 Hours',
          provider: 'AWS Training'
        }
      ]
    };
  }
};
