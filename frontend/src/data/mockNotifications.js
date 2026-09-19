export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Skill Updated',
    message: 'AWS skill proficiency increased from 65% to 78% based on recent project & certification evidence.',
    timestamp: '2 hours ago',
    type: 'skill',
    read: false,
    link: '/employee/skills'
  },
  {
    id: 'notif-2',
    title: 'New Role Opportunity Match',
    message: 'Cloud Engineer role in Engineering is now an 87% match for your profile!',
    timestamp: '1 day ago',
    type: 'opportunity',
    read: false,
    link: '/employee/opportunities/role-1'
  },
  {
    id: 'notif-3',
    title: 'Learning Recommendation Added',
    message: 'Kubernetes Fundamentals course added to your Career Roadmap to close your Cloud Engineer skill gap.',
    timestamp: '2 days ago',
    type: 'learning',
    read: true,
    link: '/employee/career-roadmap'
  },
  {
    id: 'notif-4',
    title: 'Career Milestone Achieved',
    message: 'Your overall Cloud Engineer readiness score increased to 74%.',
    timestamp: '4 days ago',
    type: 'career',
    read: true,
    link: '/employee/career-roadmap'
  }
];
