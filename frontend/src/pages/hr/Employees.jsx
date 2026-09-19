import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Filter, Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmployeeTable } from '../../components/hr/EmployeeTable';
import { SearchBar } from '../../components/common/SearchBar';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function Employees() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const navigate = useNavigate();

  const filteredEmployees = mockHRAnalytics.employeesDirectory.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          emp.role.toLowerCase().includes(search.toLowerCase()) ||
                          emp.topSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory"
        subtitle="Search and explore organizational talent profiles, skills, and mobility readiness."
        badgeText={`${filteredEmployees.length} Employees`}
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search employee, role, or skill..."
          className="w-full md:w-80"
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Platform">Platform</option>
          <option value="Analytics">Analytics</option>
          <option value="AI & Data">AI & Data</option>
        </select>
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        onViewEmployee={(id) => navigate(`/hr/employees/${id}`)}
      />
    </div>
  );
}
