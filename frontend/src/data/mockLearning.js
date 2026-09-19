export const mockLearningProviders = [
  { id: 'p-1', name: 'Udemy', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-udemy-logo-icon-download-in-svg-png-gif-file-formats--brand-social-media-card-pack-logos-icons-2974959.png', type: 'External', integrationStatus: 'Connected - Demo' },
  { id: 'p-2', name: 'Coursera', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-coursera-logo-icon-download-in-svg-png-gif-file-formats--brand-social-media-pack-logos-icons-2974960.png', type: 'External', integrationStatus: 'Integration Ready' },
  { id: 'p-3', name: 'LinkedIn Learning', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-linkedin-logo-icon-download-in-svg-png-gif-file-formats--social-media-social-media-icons-pack-logos-icons-2974961.png', type: 'External', integrationStatus: 'Integration Ready' },
  { id: 'p-4', name: 'Internal LMS', logo: '', type: 'Internal', integrationStatus: 'Connected - Demo' },
  { id: 'p-5', name: 'Company Training Portal', logo: '', type: 'Internal', integrationStatus: 'Connected - Demo' }
];

export const mockCourses = [
  {
    id: 'course-1',
    title: 'Kubernetes Fundamentals (CKAD Prep)',
    provider: 'Udemy',
    providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg',
    targetSkill: 'Kubernetes',
    reason: 'Required for Cloud Engineer role match',
    description: 'Master pod scaling, cluster networking, volume mounts, and Helm deployment charts for cloud workloads.',
    courseUrl: 'https://www.udemy.com',
    duration: '6 Hours',
    difficulty: 'Beginner',
    progress: 52,
    status: 'In Progress',
    lastAccessed: 'Today at 10:30 AM',
    startedAt: '2026-09-01',
    completedAt: null,
    learningMinutes: 215, // ~3.5 hours
    sessions: 7,
    currentSkillLevel: 52,
    requiredSkillLevel: 75,
    recommendedForRole: 'Cloud Engineer'
  },
  {
    id: 'course-2',
    title: 'Terraform for Beginners: Infrastructure as Code',
    provider: 'Coursera',
    providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg',
    targetSkill: 'Terraform',
    reason: 'Critical gap for Cloud Engineer role',
    description: 'Declarative cloud infrastructure provisioning, state file management, and AWS module reusability.',
    courseUrl: 'https://www.coursera.org',
    duration: '8 Hours',
    difficulty: 'Beginner',
    progress: 0,
    status: 'Not Started',
    lastAccessed: 'Never',
    startedAt: null,
    completedAt: null,
    learningMinutes: 0,
    sessions: 0,
    currentSkillLevel: 20,
    requiredSkillLevel: 65,
    recommendedForRole: 'Cloud Engineer'
  },
  {
    id: 'course-3',
    title: 'AWS Solutions Architect Associate Lab',
    provider: 'Udemy',
    providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg',
    targetSkill: 'AWS',
    reason: 'Boost AWS proficiency from Intermediate to Advanced',
    description: 'Deep dive into VPC peering, IAM role policies, DynamoDB auto-scaling, and ECS Fargate microservices.',
    courseUrl: 'https://www.udemy.com',
    duration: '12 Hours',
    difficulty: 'Intermediate',
    progress: 65,
    status: 'In Progress',
    lastAccessed: 'Today at 09:15 AM',
    startedAt: '2026-08-15',
    completedAt: null,
    learningMinutes: 515, // ~8h 35m
    sessions: 11,
    currentSkillLevel: 78,
    requiredSkillLevel: 85,
    recommendedForRole: 'Cloud Engineer'
  },
  {
    id: 'course-4',
    title: 'Docker & Containerization Masterclass',
    provider: 'Udemy',
    providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg',
    targetSkill: 'Docker',
    reason: 'Core microservices foundation',
    description: 'Building multi-stage Dockerfiles, docker-compose microservices stacks, and container security optimization.',
    courseUrl: 'https://www.udemy.com',
    duration: '7h 20m',
    difficulty: 'Intermediate',
    progress: 100,
    status: 'Completed',
    lastAccessed: '12 Sep 2026',
    startedAt: '2026-08-01',
    completedAt: '2026-09-12',
    learningMinutes: 440, // 7h 20m
    sessions: 9,
    currentSkillLevel: 84,
    requiredSkillLevel: 75,
    recommendedForRole: 'Cloud Engineer',
    skillAdded: 'Docker',
    evidenceType: 'Course Completion Certificate'
  },
  {
    id: 'course-5',
    title: 'Machine Learning Basics for Backend Engineers',
    provider: 'Internal LMS',
    providerLogo: '',
    targetSkill: 'Generative AI Tools',
    reason: 'Internal upskilling program',
    description: 'Integrating LLM endpoints, prompt engineering, and vector database embeddings in Python services.',
    courseUrl: '#',
    duration: '5 Hours',
    difficulty: 'Beginner',
    progress: 100,
    status: 'Completed',
    lastAccessed: '05 Sep 2026',
    startedAt: '2026-08-20',
    completedAt: '2026-09-05',
    learningMinutes: 300,
    sessions: 6,
    currentSkillLevel: 55,
    requiredSkillLevel: 50,
    recommendedForRole: 'AI Backend Engineer',
    skillAdded: 'Generative AI Tools',
    evidenceType: 'Internal Assessment Passed'
  }
];

export const mockLearningConsistencyData = {
  score: 86,
  statusLabel: 'Highly Consistent',
  currentStreakDays: 5,
  longestStreakDays: 12,
  activeDaysThisMonth: 18,
  plannedDaysThisMonth: 22,
  weeklyMinutesCompleted: 275, // 4h 35m
  weeklyMinutesTarget: 300,   // 5h 00m
  averageSessionMinutes: 38,
  coursesInProgressCount: 2,
  coursesCompletedCount: 5,
  totalLearningHours: 18.5,
  weeklyActivity: [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 55 },
    { day: 'Thu', minutes: 0 },
    { day: 'Fri', minutes: 35 },
    { day: 'Sat', minutes: 60 },
    { day: 'Sun', minutes: 25 }
  ],
  monthlyTrend: [
    { month: 'May', consistencyScore: 64, hours: 10.5 },
    { month: 'Jun', consistencyScore: 71, hours: 12.0 },
    { month: 'Jul', consistencyScore: 76, hours: 14.8 },
    { month: 'Aug', consistencyScore: 82, hours: 16.2 },
    { month: 'Sep', consistencyScore: 86, hours: 18.5 }
  ],
  calendarHeatmap: [
    // Past 28 days intensity: 0 (No), 1 (<30m), 2 (30-60m), 3 (>60m)
    { date: '2026-08-23', minutes: 0, level: 0 },
    { date: '2026-08-24', minutes: 45, level: 2 },
    { date: '2026-08-25', minutes: 30, level: 1 },
    { date: '2026-08-26', minutes: 60, level: 2 },
    { date: '2026-08-27', minutes: 75, level: 3 },
    { date: '2026-08-28', minutes: 40, level: 2 },
    { date: '2026-08-29', minutes: 0, level: 0 },
    { date: '2026-08-30', minutes: 20, level: 1 },
    { date: '2026-08-31', minutes: 50, level: 2 },
    { date: '2026-09-01', minutes: 45, level: 2 },
    { date: '2026-09-02', minutes: 90, level: 3 },
    { date: '2026-09-03', minutes: 35, level: 2 },
    { date: '2026-09-04', minutes: 0, level: 0 },
    { date: '2026-09-05', minutes: 60, level: 2 },
    { date: '2026-09-06', minutes: 40, level: 2 },
    { date: '2026-09-07', minutes: 30, level: 1 },
    { date: '2026-09-08', minutes: 70, level: 3 },
    { date: '2026-09-09', minutes: 25, level: 1 },
    { date: '2026-09-10', minutes: 0, level: 0 },
    { date: '2026-09-11', minutes: 45, level: 2 },
    { date: '2026-09-12', minutes: 60, level: 2 },
    { date: '2026-09-13', minutes: 0, level: 0 },
    { date: '2026-09-14', minutes: 45, level: 2 },
    { date: '2026-09-15', minutes: 30, level: 1 },
    { date: '2026-09-16', minutes: 55, level: 2 },
    { date: '2026-09-17', minutes: 0, level: 0 },
    { date: '2026-09-18', minutes: 35, level: 2 },
    { date: '2026-09-19', minutes: 60, level: 2 }
  ],
  historyTimeline: [
    {
      id: 'hist-1',
      date: 'Today',
      time: '10:30 AM',
      title: 'Continued AWS Solutions Architect Associate Lab',
      duration: '42 min',
      provider: 'Udemy',
      type: 'Session'
    },
    {
      id: 'hist-2',
      date: 'Yesterday',
      time: '7:15 PM',
      title: 'Kubernetes Fundamentals (CKAD Prep)',
      duration: '35 min',
      provider: 'Udemy',
      type: 'Session'
    },
    {
      id: 'hist-3',
      date: '17 Sep 2026',
      time: '5:00 PM',
      title: 'Practiced Docker Compose multi-container setup',
      duration: '50 min',
      provider: 'Udemy',
      type: 'Session'
    },
    {
      id: 'hist-4',
      date: '12 Sep 2026',
      time: '4:30 PM',
      title: 'Completed Docker & Containerization Masterclass',
      duration: 'Course Completion',
      provider: 'Udemy',
      type: 'Milestone'
    },
    {
      id: 'hist-5',
      date: '01 Sep 2026',
      time: '10:00 AM',
      title: 'Started Kubernetes Fundamentals (CKAD Prep)',
      duration: 'Course Enrollment',
      provider: 'Udemy',
      type: 'Enrollment'
    }
  ]
};

export const mockHROrgLearning = {
  activeLearners: 3180,
  averageConsistency: 78,
  totalLearningHoursMonth: 12450,
  coursesInProgress: 2860,
  coursesCompleted: 1240,
  streak7PlusDays: 860,
  departmentConsistency: [
    { department: 'Engineering', consistency: 82, activeLearners: 1240, avgHours: 19.2 },
    { department: 'Analytics', consistency: 79, activeLearners: 680, avgHours: 16.5 },
    { department: 'Operations', consistency: 68, activeLearners: 420, avgHours: 11.8 },
    { department: 'Cloud Team', consistency: 86, activeLearners: 840, avgHours: 22.4 }
  ],
  weeklyHoursTrend: [
    { week: 'Week 1', hours: 2850 },
    { week: 'Week 2', hours: 3100 },
    { week: 'Week 3', hours: 3250 },
    { week: 'Week 4', hours: 3250 }
  ],
  mostLearnedSkills: [
    { skill: 'AWS Cloud Architecture', count: 780, category: 'Cloud' },
    { skill: 'Kubernetes Orchestration', count: 620, category: 'DevOps' },
    { skill: 'Generative AI & LLMs', count: 540, category: 'AI' },
    { skill: 'Python Microservices', count: 490, category: 'Backend' },
    { skill: 'Cybersecurity Practices', count: 320, category: 'Security' }
  ],
  providerDistribution: [
    { name: 'Udemy', value: 45, count: 1430 },
    { name: 'Coursera', value: 25, count: 795 },
    { name: 'Internal LMS', value: 20, count: 636 },
    { name: 'LinkedIn Learning', value: 10, count: 319 }
  ],
  employeeLearningRows: [
    {
      id: 'emp-101',
      fullName: 'Ananya R',
      role: 'Backend Developer',
      department: 'Engineering',
      consistency: 86,
      streakDays: 5,
      learningHours: 18.5,
      coursesInProgress: 2,
      coursesCompleted: 5,
      lastActive: 'Today at 10:30 AM',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-102',
      fullName: 'Rahul K',
      role: 'Software Engineer',
      department: 'Engineering',
      consistency: 72,
      streakDays: 2,
      learningHours: 11.2,
      coursesInProgress: 3,
      coursesCompleted: 2,
      lastActive: 'Yesterday at 04:15 PM',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-103',
      fullName: 'Priya S',
      role: 'Data Analyst',
      department: 'Analytics',
      consistency: 91,
      streakDays: 9,
      learningHours: 22.4,
      coursesInProgress: 1,
      coursesCompleted: 7,
      lastActive: 'Today at 11:45 AM',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-104',
      fullName: 'Dev M',
      role: 'Data Engineer',
      department: 'AI & Data',
      consistency: 65,
      streakDays: 1,
      learningHours: 9.5,
      coursesInProgress: 2,
      coursesCompleted: 3,
      lastActive: '3 days ago',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 'emp-105',
      fullName: 'Sneha P',
      role: 'Frontend Engineer',
      department: 'Engineering',
      consistency: 84,
      streakDays: 6,
      learningHours: 15.0,
      coursesInProgress: 1,
      coursesCompleted: 4,
      lastActive: 'Today at 08:30 AM',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
    }
  ]
};
