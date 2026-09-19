import React from 'react';
import { TrendingUp, Sparkles, Flame } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { Badge } from '../../components/common/Badge';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function EmergingSkills() {
  const { emergingSkills } = mockHRAnalytics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emerging Skills & Technology Trends"
        subtitle="Tracking rapid growth technology trends and workforce supply velocity."
        badgeText="+72% Max Growth"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergingSkills.map((sk, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">{sk.skill}</h3>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +{sk.growth}%
                </span>
              </div>

              <div className="text-xs space-y-1 mt-3 text-slate-600">
                <div className="flex justify-between"><span>Current Supply:</span><strong className="text-slate-900">{sk.supply}</strong></div>
                <div className="flex justify-between"><span>Expected Demand:</span><strong className="text-indigo-600">{sk.demand}</strong></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400">Status</span>
              <Badge variant="warning" size="sm">{sk.status}</Badge>
            </div>
          </div>
        ))}
      </div>

      <AnalyticsChart
        title="Emerging Skill Demand Growth Trend (%)"
        subtitle="Year-over-year workforce demand increase"
        data={emergingSkills}
        dataKey="growth"
        nameKey="skill"
        colors={['#10b981', '#3b82f6', '#4f46e5', '#8b5cf6', '#0ea5e9']}
      />
    </div>
  );
}
