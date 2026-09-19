import React from 'react';
import { Flame, Calendar, Clock, Award, CheckCircle, TrendingUp, Info } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getConsistencyBadgeVariant } from '../../utils/calculateConsistency';

export function LearningConsistencyCard({ data }) {
  const {
    score = 86,
    statusLabel = 'Highly Consistent',
    currentStreakDays = 5,
    longestStreakDays = 12,
    activeDaysThisMonth = 18,
    plannedDaysThisMonth = 22,
    weeklyMinutesCompleted = 275,
    averageSessionMinutes = 38,
    coursesInProgressCount = 2,
    coursesCompletedCount = 5
  } = data || {};

  const hoursThisWeek = Math.floor(weeklyMinutesCompleted / 60);
  const minsThisWeek = weeklyMinutesCompleted % 60;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700/60 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Learning Engagement</span>
            <Badge variant={getConsistencyBadgeVariant(score)} size="sm">
              {statusLabel}
            </Badge>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Learning Consistency</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Calculated from active days ratio (50%), weekly goal completion (30%), and goal activity (20%).
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 backdrop-blur-xs">
          <div className="text-center px-2">
            <span className="text-3xl font-extrabold text-indigo-400">{score}%</span>
            <span className="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider mt-0.5">Consistency Score</span>
          </div>
          <div className="h-10 w-px bg-slate-700" />
          <div className="flex items-center gap-2 px-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">{currentStreakDays} Days</span>
              <span className="block text-[11px] text-slate-400 font-medium">Current Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/40">
          <div className="flex items-center text-slate-400 text-xs gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            Active Days
          </div>
          <div className="text-base font-bold text-white">
            {activeDaysThisMonth} <span className="text-slate-400 text-xs font-normal">/ {plannedDaysThisMonth} days</span>
          </div>
        </div>

        <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/40">
          <div className="flex items-center text-slate-400 text-xs gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Time This Week
          </div>
          <div className="text-base font-bold text-white">
            {hoursThisWeek}h {minsThisWeek}m
          </div>
        </div>

        <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/40">
          <div className="flex items-center text-slate-400 text-xs gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            Avg Session
          </div>
          <div className="text-base font-bold text-white">
            {averageSessionMinutes} mins
          </div>
        </div>

        <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/40">
          <div className="flex items-center text-slate-400 text-xs gap-1.5 mb-1">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Courses Completed
          </div>
          <div className="text-base font-bold text-white">
            {coursesCompletedCount} <span className="text-slate-400 text-xs font-normal">({coursesInProgressCount} active)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
