import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Flame, Clock, Award, CheckCircle, Search, Filter } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { HREmployeeLearningTable } from '../../components/hr/HREmployeeLearningTable';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { SearchBar } from '../../components/common/SearchBar';
import { learningTrackingService } from '../../services/learningTrackingService';

export function HRLearningPage() {
  const [orgData, setOrgData] = useState(null);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await learningTrackingService.getOrganizationLearningAnalytics();
      setOrgData(res);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !orgData) {
    return <div className="p-8 text-center text-slate-500">Loading Organization Learning Analytics...</div>;
  }

  const filteredEmployees = orgData.employeeLearningRows.filter((emp) => {
    const matchesSearch = emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          emp.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning & Consistency Analytics"
        subtitle="Track organization-wide learning gateway engagement and employee skill development."
        badgeText="Factual Telemetry"
      />

      {/* Top 6 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Active Learners"
          value={orgData.activeLearners.toLocaleString()}
          subtitle="75% of workforce"
          icon={Users}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Avg Consistency"
          value={`${orgData.averageConsistency}%`}
          subtitle="Highly consistent"
          icon={GraduationCap}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Total Hours"
          value={orgData.totalLearningHoursMonth.toLocaleString()}
          subtitle="This month"
          icon={Clock}
          iconBg="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="In Progress"
          value={orgData.coursesInProgress.toLocaleString()}
          subtitle="Active courses"
          icon={BookOpenIcon}
          iconBg="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Completed"
          value={orgData.coursesCompleted.toLocaleString()}
          subtitle="Verified evidence"
          icon={Award}
          iconBg="bg-violet-50 text-violet-600"
        />
        <StatCard
          title="7+ Day Streak"
          value={orgData.streak7PlusDays}
          subtitle="Dedicated learners"
          icon={Flame}
          iconBg="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Employee Learning & Consistency Table Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Employee Learning Consistency Directory</h3>
            <p className="text-xs text-slate-500">
              Factual engagement metrics based on active learning days, weekly goals, and course completions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search employee name or role..."
              className="w-full sm:w-64"
            />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Analytics">Analytics</option>
              <option value="Operations">Operations</option>
              <option value="Cloud Team">Cloud Team</option>
              <option value="AI & Data">AI & Data</option>
            </select>
          </div>
        </div>

        <HREmployeeLearningTable
          employees={filteredEmployees}
          onViewEmployee={(id) => navigate(`/hr/employees/${id}`)}
        />
      </div>

      {/* Organization Learning Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Average Learning Consistency by Department (%)"
          subtitle="Cross-departmental engagement metrics"
          data={orgData.departmentConsistency}
          dataKey="consistency"
          nameKey="department"
          colors={['#4f46e5', '#10b981', '#f59e0b', '#3b82f6']}
        />

        <AnalyticsChart
          title="Most Learned Skills Across Workforce"
          subtitle="Highest course enrollment volume"
          data={orgData.mostLearnedSkills}
          dataKey="count"
          nameKey="skill"
          colors={['#4f46e5', '#0ea5e9', '#10b981', '#8b5cf6', '#f43f5e']}
        />

        <AnalyticsChart
          title="Learning Provider Distribution"
          subtitle="Course enrollments by platform"
          data={orgData.providerDistribution}
          dataKey="count"
          nameKey="name"
          colors={['#e11d48', '#2563eb', '#059669', '#7c3aed']}
        />

        <AnalyticsChart
          title="Weekly Workforce Learning Hours Trend"
          subtitle="Total hours completed per week"
          data={orgData.weeklyHoursTrend}
          dataKey="hours"
          nameKey="week"
          type="line"
          colors={['#4f46e5']}
        />
      </div>
    </div>
  );
}

function BookOpenIcon(props) {
  return <Award {...props} />;
}
