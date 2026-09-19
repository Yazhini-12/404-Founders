import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Filter, Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { RoleRecommendationCard } from '../../components/employee/RoleRecommendationCard';
import { SearchBar } from '../../components/common/SearchBar';
import { useRoles } from '../../hooks/useRoles';

export function Opportunities() {
  const { roles, loading } = useRoles();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [minMatch, setMinMatch] = useState(0);
  const navigate = useNavigate();

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(search.toLowerCase()) ||
                          role.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = departmentFilter === 'All' || role.department === departmentFilter;
    const matchesScore = role.matchScore >= minMatch;
    return matchesSearch && matchesDept && matchesScore;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal Career Opportunities"
        subtitle="AI-matched roles based on your verified Skill Passport."
        badgeText={`${filteredRoles.length} Openings`}
      />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by role title, department..."
          className="w-full md:w-80"
        />

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Platform">Platform</option>
            <option value="AI & Data">AI & Data</option>
          </select>

          <select
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={0}>All Match Scores</option>
            <option value={80}>80%+ Match Only</option>
            <option value={70}>70%+ Match Only</option>
          </select>
        </div>
      </div>

      {/* Roles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <RoleRecommendationCard
            key={role.id}
            role={role}
            onViewDetails={(r) => navigate(`/employee/opportunities/${r.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
