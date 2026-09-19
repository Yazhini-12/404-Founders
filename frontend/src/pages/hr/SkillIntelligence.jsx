import React, { useState } from 'react';
import { BrainCircuit, Search, TrendingUp, Users } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function SkillIntelligence() {
  const [search, setSearch] = useState('');
  const { skillDistribution } = mockHRAnalytics;

  const filteredSkills = skillDistribution.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Skill Intelligence"
        subtitle="Comprehensive breakdown of skills, supply counts, and workforce competency distribution."
        badgeText="1,890 Skills Cataloged"
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search skills (e.g. Python, AWS, Docker)..."
          className="w-full sm:w-80"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
              <span className="text-xs text-slate-500 block mt-0.5">{item.count} Employees Possess</span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl font-extrabold text-lg">
              {item.count}
            </div>
          </div>
        ))}
      </div>

      <AnalyticsChart
        title="Workforce Skill Supply Inventory"
        subtitle="Headcount per technical domain"
        data={skillDistribution}
        dataKey="count"
        nameKey="name"
        colors={['#4f46e5', '#3b82f6', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6']}
      />
    </div>
  );
}
