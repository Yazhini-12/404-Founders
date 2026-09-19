import React from 'react';
import { BarChart2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function WorkforceSkillGap() {
  const { workforceSkillGap } = mockHRAnalytics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workforce Skill Gap Analysis"
        subtitle="Identifying strategic skill deficits between required capacity and current supply."
        badgeText="12 Critical Gaps"
      />

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Key Skill Deficits Across Enterprise</h3>
        <div className="space-y-3">
          {workforceSkillGap.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 text-sm block">{item.skill}</span>
                <span className="text-slate-500 text-[11px]">Required: {item.required} • Available: {item.available}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-rose-600 text-base block">-{item.gap} Deficit</span>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded">High Priority Gap</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnalyticsChart
        title="Skill Deficit Magnitude (Required vs Available)"
        subtitle="Unfilled skill capacity across organizational teams"
        data={workforceSkillGap}
        dataKey="gap"
        nameKey="skill"
        colors={['#f43f5e', '#fb7185', '#fda4af', '#f43f5e']}
      />
    </div>
  );
}
