/**
 * Learning Consistency Score Calculator
 * 
 * Formula:
 * - Active Day Ratio (50% weight): active learning days / planned learning days
 * - Weekly Goal Completion (30% weight): actual learning minutes / weekly target minutes (capped at 100%)
 * - Completion Activity (20% weight): completed learning goals / assigned learning goals (capped at 100%)
 * 
 * Score = (ActiveDayRatio * 50) + (WeeklyGoalCompletion * 30) + (CompletionActivity * 20)
 */
export function calculateLearningConsistency({
  activeDays = 18,
  plannedDays = 22,
  actualWeeklyMinutes = 275, // 4h 35m
  targetWeeklyMinutes = 300, // 5 hours
  completedGoals = 4,
  assignedGoals = 4
}) {
  const activeDayRatio = Math.min(1, Math.max(0, activeDays / plannedDays));
  const weeklyGoalCompletion = Math.min(1, Math.max(0, actualWeeklyMinutes / targetWeeklyMinutes));
  const completionActivity = Math.min(1, Math.max(0, completedGoals / assignedGoals));

  const score = Math.round(
    (activeDayRatio * 50) +
    (weeklyGoalCompletion * 30) +
    (completionActivity * 20)
  );

  return {
    score,
    activeDayRatio: Math.round(activeDayRatio * 100),
    weeklyGoalCompletion: Math.round(weeklyGoalCompletion * 100),
    completionActivity: Math.round(completionActivity * 100),
    statusLabel: getConsistencyLabel(score)
  };
}

export function getConsistencyLabel(score) {
  if (score >= 90) return 'Excellent Consistency';
  if (score >= 75) return 'Highly Consistent';
  if (score >= 60) return 'Moderately Consistent';
  return 'Needs Attention';
}

export function getConsistencyBadgeVariant(score) {
  if (score >= 90) return 'success';
  if (score >= 75) return 'primary';
  if (score >= 60) return 'warning';
  return 'neutral';
}
