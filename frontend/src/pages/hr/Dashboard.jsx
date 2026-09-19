import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BrainCircuit, Briefcase, AlertTriangle, ArrowRight, GraduationCap, Flame, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { Button } from '../../components/common/Button';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function Dashboard() {
  const navigate = useNavigate();
  const { summary, skillDistribution, workforceSkillGap, emergingSkills } = mockHRAnalytics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Workforce Intelligence Dashboard"
        subtitle="Organization-wide talent visibility, skill gaps, and mobility analytics."
      />

      {/* Top 5 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Employees"
          value={summary.totalEmployees.toLocaleString()}
          subtitle="100% cataloged"
          icon={Users}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Skills Identified"
          value={summary.skillsIdentified.toLocaleString()}
          subtitle="Taxonomy mapped"
          icon={BrainCircuit}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Open Internal Roles"
          value={summary.openInternalRoles}
          subtitle="Active openings"
          icon={Briefcase}
          iconBg="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Critical Skill Gaps"
          value={summary.criticalSkillGaps}
          subtitle="High priority"
          icon={AlertTriangle}
          iconBg="bg-rose-50 text-rose-600"
        />
        <StatCard
          title="Ready for Mobility"
          value={summary.readyForMobility}
          subtitle="80%+ match rate"
          icon={TrendingUp}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Learning & Consistency HR Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-indigo-600/30 border border-indigo-500/30 rounded-2xl text-indigo-400">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Learning Gateway Analytics</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Factual Engagement
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5">Average Workforce Consistency: 78%</h3>
            <p className="text-xs text-slate-300 mt-1">
              3,180 active learners • 12,450 total learning hours this month • 860 employees with 7+ day streaks.
            </p>
          </div>
        </div>

        <Button variant="primary" size="md" icon={ArrowRight} onClick={() => navigate('/hr/learning')}>
          View Learning Analytics
        </Button>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Skill Distribution Across Workforce"
          subtitle="Total employees possessing key tech capabilities"
          data={skillDistribution}
          dataKey="count"
          nameKey="name"
          colors={['#4f46e5', '#3b82f6', '#0ea5e9', '#06b6d4', '#10b981', '#8b5cf6']}
        />

        <AnalyticsChart
          title="Workforce Skill Gap (Required vs Available)"
          subtitle="Critical enterprise talent shortages"
          data={workforceSkillGap}
          dataKey="gap"
          nameKey="skill"
          colors={['#f43f5e', '#fb7185', '#fda4af', '#f43f5e']}
        />
      </div>
    </div>
  );
}
