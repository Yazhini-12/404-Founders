import React, { useState } from 'react';
import { Search, Filter, Award, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function TalentSearch() {
  const [search, setSearch] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');

  const filteredEmployees = mockHRAnalytics.employeesDirectory.filter(emp => {
    const q = search.toLowerCase();
    const matchesQuery = emp.fullName.toLowerCase().includes(q) ||
                         emp.role.toLowerCase().includes(q) ||
                         emp.topSkills.some(s => s.toLowerCase().includes(q));
    const matchesSkill = selectedSkillFilter === 'All' || emp.topSkills.includes(selectedSkillFilter);
    return matchesQuery && matchesSkill;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Internal Talent Search"
        subtitle="Search workforce by skill taxonomy, experience, and role readiness."
        badgeText="Real-time Semantic Index"
      />

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by skill (e.g. Python, AWS, Docker) or candidate name..."
          className="w-full"
        />

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Quick Skill Filter:</span>
          {['All', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Java'].map((sk) => (
            <button
              key={sk}
              onClick={() => setSelectedSkillFilter(sk)}
              className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                selectedSkillFilter === sk
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sk}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredEmployees.map((emp) => (
          <div key={emp.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <Avatar name={emp.fullName} src={emp.avatarUrl} size="lg" />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{emp.fullName}</h3>
                <span className="text-xs text-slate-500 font-medium">{emp.role} • {emp.department} • {emp.experienceYears} yrs exp</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {emp.topSkills.map((sk, idx) => (
                    <Badge key={idx} variant="primary" size="sm">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-indigo-600 block">Target Match</span>
              <span className="text-xl font-extrabold text-indigo-700">{emp.readiness}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
