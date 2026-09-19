// Career Roadmap Service Layer
// TODO: Replace with AI Career Path Generator Edge Function

export const careerService = {
  async getCareerRoadmap(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 200));
    return {
      currentRole: 'Backend Developer',
      targetRole: 'Cloud Engineer',
      overallProgress: 74,
      readinessScore: 74, // Demo score
      steps: [
        {
          stepNumber: 1,
          title: 'Complete AWS Certification',
          description: 'Obtain AWS Certified Cloud Practitioner / Solutions Architect Associate.',
          status: 'Completed',
          completedDate: 'Apr 2026'
        },
        {
          stepNumber: 2,
          title: 'Learn Kubernetes & Container Orchestration',
          description: 'Master pod scaling, cluster networking, and Helm deployment charts.',
          status: 'In Progress',
          progress: 65
        },
        {
          stepNumber: 3,
          title: 'Join Cloud Deployment Project',
          description: 'Participate as co-lead on upcoming infrastructure migration project.',
          status: 'Recommended',
          recommendedDate: 'Q4 2026'
        },
        {
          stepNumber: 4,
          title: 'Master Terraform & Infrastructure as Code',
          description: 'Write declaratively managed cloud environments using HashiCorp HCL.',
          status: 'Upcoming'
        }
      ]
    };
  }
};
