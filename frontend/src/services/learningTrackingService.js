/**
 * Learning Tracking & Gateway Service Layer
 * 
 * FUTURE PROVIDER INTEGRATION FLOW:
 * 1. SkillSync AI identifies skill gap & recommends course.
 * 2. Employee clicks "Start Learning" -> startLearningSession() records launch.
 * 3. External learning platform (Udemy/Coursera/xAPI/Internal LMS) opens.
 * 4. External Provider API or xAPI / LTI webhook sends progress events.
 * 5. Supabase Edge Function processes progress/completion events.
 * 6. SkillSync AI recalculates Learning Consistency score.
 * 7. Skill Evidence created -> Skill Passport updated -> Target Role Match recalculated.
 * 
 * INTENDED SUPABASE DB TABLES:
 * - learning_resources
 * - employee_learning
 * - learning_sessions
 * - learning_events
 * - learning_goals
 * - learning_provider_sync
 * - learning_consistency
 */

import { mockCourses, mockLearningConsistencyData, mockHROrgLearning, mockLearningProviders } from '../data/mockLearning';

let localCoursesState = [...mockCourses];

export const learningTrackingService = {
  async getRecommendedCourses(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return localCoursesState.filter(c => c.status === 'Not Started' || c.status === 'In Progress');
  },

  async getCourses(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return [...localCoursesState];
  },

  async startLearningSession(employeeId = 'emp-101', courseId) {
    // TODO: Send event to Supabase Edge Function '/functions/v1/learning-launch'
    await new Promise(res => setTimeout(res, 200));
    const now = new Date().toISOString();
    localCoursesState = localCoursesState.map(c => {
      if (c.id === courseId || c.title.toLowerCase().includes(String(courseId).toLowerCase())) {
        return {
          ...c,
          status: 'In Progress',
          startedAt: c.startedAt || now.split('T')[0],
          lastAccessed: 'Just now',
          sessions: (c.sessions || 0) + 1,
          progress: c.progress === 0 ? 15 : c.progress
        };
      }
      return c;
    });
    return {
      success: true,
      message: 'Learning session launched via provider gateway',
      timestamp: now
    };
  },

  async endLearningSession(employeeId = 'emp-101', courseId, sessionMinutes = 30) {
    // TODO: Receive session telemetry from Provider API / xAPI
    await new Promise(res => setTimeout(res, 200));
    return { success: true, loggedMinutes: sessionMinutes };
  },

  async getLearningProgress(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return localCoursesState.map(c => ({
      courseId: c.id,
      title: c.title,
      progress: c.progress,
      status: c.status
    }));
  },

  async getLearningHistory(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return [...mockLearningConsistencyData.historyTimeline];
  },

  async getLearningConsistency(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return { ...mockLearningConsistencyData };
  },

  async getEmployeeLearningAnalytics(employeeId = 'emp-101') {
    await new Promise(res => setTimeout(res, 150));
    return {
      consistency: { ...mockLearningConsistencyData },
      courses: [...localCoursesState],
      skillsImpact: [
        { skill: 'AWS', before: 65, current: 78, target: 85, course: 'AWS Solutions Architect' },
        { skill: 'Kubernetes', before: 30, current: 52, target: 75, course: 'Kubernetes Fundamentals' },
        { skill: 'Docker', before: 60, current: 84, target: 75, course: 'Docker Masterclass' }
      ]
    };
  },

  async getOrganizationLearningAnalytics() {
    await new Promise(res => setTimeout(res, 150));
    return { ...mockHROrgLearning };
  },

  async getProviderProgress(employeeId = 'emp-101', courseId) {
    // TODO: Call external provider REST API endpoint
    await new Promise(res => setTimeout(res, 200));
    return { providerStatus: 'Active', syncedProgress: 65 };
  },

  async syncLearningProviderProgress() {
    // TODO: Trigger background sync with external providers (Udemy/Coursera API)
    await new Promise(res => setTimeout(res, 300));
    return { syncedCount: 5, lastSync: new Date().toISOString() };
  }
};
