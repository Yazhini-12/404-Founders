import React from 'react';
import { Activity, ArrowRight, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function MobilityAnalytics() {
  const { mobilityAnalytics } = mockHRAnalytics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal Mobility Analytics"
        subtitle="Tracking internal talent movement, match conversions, and transition pathways."
        badgeText="42 Moves This Month"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Internal Moves This Month"
          value={mobilityAnalytics.internalMovesThisMonth}
          subtitle="Successful placements"
          icon={Activity}
          iconBg="bg-emerald-50 text-emerald-600"
          trend="+12%"
        />
        <StatCard
          title="Successful Role Matches"
          value={mobilityAnalytics.successfulRoleMatches}
          subtitle="Skill Passport driven"
          icon={CheckCircle2}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Employees Ready for Transition"
          value={mobilityAnalytics.employeesReadyForTransition}
          subtitle="80%+ match rate"
          icon={Users}
          iconBg="bg-sky-50 text-sky-600"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Top Internal Transition Pathways</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mobilityAnalytics.topTransitions.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                {item.path}
              </span>
              <span className="bg-indigo-100 text-indigo-800 font-extrabold px-3 py-1 rounded-full text-xs">
                {item.count} Moves
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
