// HR Analytics Service Layer
// TODO: Replace with Supabase analytics queries & views

import { mockHRAnalytics } from '../data/mockHRAnalytics';

export const analyticsService = {
  async getWorkforceOverview() {
    await new Promise(res => setTimeout(res, 150));
    return { ...mockHRAnalytics.summary };
  },

  async getSkillAnalytics() {
    await new Promise(res => setTimeout(res, 150));
    return {
      distribution: mockHRAnalytics.skillDistribution,
      workforceGap: mockHRAnalytics.workforceSkillGap,
      emerging: mockHRAnalytics.emergingSkills,
      heatmap: mockHRAnalytics.heatmapMatrix
    };
  },

  async getLearningInsights() {
    await new Promise(res => setTimeout(res, 150));
    return { ...mockHRAnalytics.learningInsights };
  },

  async getMobilityAnalytics() {
    await new Promise(res => setTimeout(res, 150));
    return { ...mockHRAnalytics.mobilityAnalytics };
  }
};
