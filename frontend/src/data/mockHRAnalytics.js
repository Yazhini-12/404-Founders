export const mockHRAnalytics = {
  summary: {
    totalEmployees: 4250,
    skillsIdentified: 1890,
    openInternalRoles: 48,
    criticalSkillGaps: 12,
    readyForMobility: 620
  },
  skillDistribution: [
    { name: 'Python', count: 980 },
    { name: 'Java', count: 1250 },
    { name: 'AWS', count: 720 },
    { name: 'Docker', count: 680 },
    { name: 'Machine Learning', count: 410 },
    { name: 'Generative AI', count: 180 }
  ],
  workforceSkillGap: [
    { skill: 'Generative AI', required: 500, available: 180, gap: 320 },
    { skill: 'Kubernetes', required: 620, available: 340, gap: 280 },
    { skill: 'Cybersecurity', required: 400, available: 210, gap: 190 },
    { skill: 'Cloud AI', required: 350, available: 170, gap: 180 },
    { skill: 'Terraform', required: 450, available: 290, gap: 160 }
  ],
  emergingSkills: [
    { skill: 'Generative AI', growth: 72, supply: 180, demand: 500, status: 'High Gap' },
    { skill: 'RAG Architecture', growth: 55, supply: 95, demand: 280, status: 'Critical Shortage' },
    { skill: 'Cloud AI Services', growth: 48, supply: 170, demand: 350, status: 'Moderate Gap' },
    { skill: 'Kubernetes Orchestration', growth: 36, supply: 340, demand: 620, status: 'Moderate Gap' },
    { skill: 'MLOps Pipelines', growth: 31, supply: 120, demand: 240, status: 'Moderate Gap' }
  ],
  learningInsights: {
    mostLearnedSkills: [
      { skill: 'AWS Cloud', learners: 280, completionRate: 88 },
      { skill: 'Kubernetes', learners: 190, completionRate: 64 },
      { skill: 'Generative AI', learners: 170, completionRate: 78 },
      { skill: 'Docker Containerization', learners: 210, completionRate: 92 }
    ],
    courseCompletionTrend: [
      { month: 'May', completed: 145 },
      { month: 'Jun', completed: 180 },
      { month: 'Jul', completed: 210 },
      { month: 'Aug', completed: 265 },
      { month: 'Sep', completed: 310 }
    ],
    highDemandLowSupply: [
      { skill: 'RAG & Vector DBs', demand: 310, supply: 65, activeLearners: 42 },
      { skill: 'Cybersecurity Incident Response', demand: 280, supply: 90, activeLearners: 35 }
    ]
  },
  mobilityAnalytics: {
    internalMovesThisMonth: 42,
    successfulRoleMatches: 31,
    employeesReadyForTransition: 128,
    topTransitions: [
      { path: 'Backend Developer → Cloud Engineer', count: 18 },
      { path: 'Software Developer → DevOps Engineer', count: 14 },
      { path: 'Data Analyst → Analytics Engineer', count: 12 },
      { path: 'QA Engineer → Automation Lead', count: 9 }
    ]
  },
  employeesDirectory: [
    {
      id: 'emp-101',
      fullName: 'Ananya R',
      email: 'ananya.r@skillsync.ai',
      role: 'Backend Developer',
      department: 'Engineering',
      experienceYears: 3.5,
      topSkills: ['Python', 'Docker', 'AWS', 'SQL'],
      readiness: 87,
      targetRole: 'Cloud Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-102',
      fullName: 'Rahul K',
      email: 'rahul.k@skillsync.ai',
      role: 'Software Engineer',
      department: 'Engineering',
      experienceYears: 4.0,
      topSkills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
      readiness: 88,
      targetRole: 'Cloud Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-103',
      fullName: 'Priya S',
      email: 'priya.s@skillsync.ai',
      role: 'DevOps Engineer',
      department: 'Platform',
      experienceYears: 5.2,
      topSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD'],
      readiness: 85,
      targetRole: 'Platform Lead',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-104',
      fullName: 'Dev M',
      email: 'dev.m@skillsync.ai',
      role: 'Data Engineer',
      department: 'AI & Data',
      experienceYears: 2.8,
      topSkills: ['Python', 'Spark', 'SQL', 'PostgreSQL'],
      readiness: 76,
      targetRole: 'AI Backend Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-105',
      fullName: 'Sneha P',
      email: 'sneha.p@skillsync.ai',
      role: 'Frontend Engineer',
      department: 'Engineering',
      experienceYears: 3.0,
      topSkills: ['React', 'TypeScript', 'Tailwind', 'REST API'],
      readiness: 82,
      targetRole: 'UI Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
    }
  ],
  heatmapMatrix: [
    { department: 'Engineering', python: 'High', aws: 'High', ai: 'Medium', kubernetes: 'Medium' },
    { department: 'Analytics', python: 'High', aws: 'Medium', ai: 'High', kubernetes: 'Low' },
    { department: 'Operations', python: 'Low', aws: 'Medium', ai: 'Low', kubernetes: 'Medium' },
    { department: 'Cloud Team', python: 'Medium', aws: 'High', ai: 'Low', kubernetes: 'High' }
  ]
};
