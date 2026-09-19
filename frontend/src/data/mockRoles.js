export const mockRoles = [
  {
    id: 'role-1',
    title: 'Cloud Engineer',
    department: 'Engineering',
    location: 'Bengaluru / Remote',
    type: 'Full-time Internal Role',
    minExperience: 3,
    matchScore: 87,
    description: 'Lead modern cloud infrastructure provisioning, container orchestration, and serverless architectures on AWS.',
    matchedSkills: ['AWS', 'Docker', 'Python', 'Linux', 'REST API'],
    partialSkills: ['Kubernetes'],
    missingSkills: ['Terraform', 'Cloud Security'],
    requirements: [
      { skill: 'AWS', level: 80, weight: 'High', mandatory: true },
      { skill: 'Docker', level: 75, weight: 'High', mandatory: true },
      { skill: 'Python', level: 80, weight: 'Medium', mandatory: false },
      { skill: 'Kubernetes', level: 75, weight: 'High', mandatory: true },
      { skill: 'Terraform', level: 65, weight: 'Medium', mandatory: false }
    ],
    candidatesCount: 15,
    topMatch: 91
  },
  {
    id: 'role-2',
    title: 'DevOps Engineer',
    department: 'Platform',
    location: 'Hybrid',
    type: 'Full-time Internal Role',
    minExperience: 3,
    matchScore: 82,
    description: 'Automate deployment pipelines, manage CI/CD workflows, and ensure high system availability.',
    matchedSkills: ['Docker', 'Linux', 'Python'],
    partialSkills: ['Kubernetes'],
    missingSkills: ['CI/CD Pipelines', 'Terraform'],
    requirements: [
      { skill: 'Docker', level: 80, weight: 'High', mandatory: true },
      { skill: 'Linux', level: 80, weight: 'High', mandatory: true },
      { skill: 'CI/CD Pipelines', level: 75, weight: 'High', mandatory: true },
      { skill: 'Kubernetes', level: 70, weight: 'Medium', mandatory: false }
    ],
    candidatesCount: 18,
    topMatch: 88
  },
  {
    id: 'role-3',
    title: 'Platform Engineer',
    department: 'Platform',
    location: 'Bengaluru',
    type: 'Full-time Internal Role',
    minExperience: 4,
    matchScore: 78,
    description: 'Build internal developer platforms to accelerate service delivery across engineering teams.',
    matchedSkills: ['Docker', 'Linux', 'SQL', 'REST API'],
    partialSkills: ['Kubernetes'],
    missingSkills: ['Go', 'Service Mesh'],
    requirements: [
      { skill: 'Docker', level: 80, weight: 'High', mandatory: true },
      { skill: 'Kubernetes', level: 75, weight: 'High', mandatory: true },
      { skill: 'Go', level: 70, weight: 'Medium', mandatory: false }
    ],
    candidatesCount: 10,
    topMatch: 85
  },
  {
    id: 'role-4',
    title: 'AI Backend Engineer',
    department: 'AI & Data',
    location: 'Remote',
    type: 'Full-time Internal Role',
    minExperience: 3,
    matchScore: 73,
    description: 'Deploy LLM backend services, manage vector retrieval pipelines, and optimize AI API responses.',
    matchedSkills: ['Python', 'FastAPI', 'SQL', 'REST API'],
    partialSkills: ['Generative AI Tools'],
    missingSkills: ['PyTorch', 'Vector Databases (pgvector)'],
    requirements: [
      { skill: 'Python', level: 90, weight: 'High', mandatory: true },
      { skill: 'FastAPI', level: 85, weight: 'High', mandatory: true },
      { skill: 'PyTorch', level: 70, weight: 'High', mandatory: true }
    ],
    candidatesCount: 12,
    topMatch: 94
  },
  {
    id: 'role-5',
    title: 'Technical Lead',
    department: 'Engineering',
    location: 'Bengaluru',
    type: 'Full-time Internal Role',
    minExperience: 5,
    matchScore: 69,
    description: 'Guide architecture decisions, mentor developers, and lead technical delivery for engineering initiatives.',
    matchedSkills: ['Python', 'System Architecture', 'Problem Solving'],
    partialSkills: ['Leadership & Mentorship'],
    missingSkills: ['People Management', 'Budgeting'],
    requirements: [
      { skill: 'System Architecture', level: 85, weight: 'High', mandatory: true },
      { skill: 'Leadership & Mentorship', level: 80, weight: 'High', mandatory: true }
    ],
    candidatesCount: 8,
    topMatch: 86
  }
];
