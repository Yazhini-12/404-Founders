// Learning Service Layer
// TODO: Replace with Supabase database queries ('learning_activities')

import { mockLearning } from '../data/mockLearning';

export const learningService = {
  async getEmployeeLearning(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return [...mockLearning];
  },

  async addLearningActivity(activityData) {
    // TODO: supabase.from('learning_activities').insert(activityData)
    await new Promise(res => setTimeout(res, 200));
    return {
      id: `learn-${Date.now()}`,
      ...activityData,
      progress: activityData.status === 'Completed' ? 100 : Number(activityData.progress || 0)
    };
  }
};
