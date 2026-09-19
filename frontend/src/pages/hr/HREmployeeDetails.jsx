import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Briefcase,
  Award,
  GraduationCap,
  Flame,
  Clock,
  CheckCircle2,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LearningActivityChart } from '../../components/employee/LearningActivityChart';
import { AnalyticsChart } from '../../components/hr/AnalyticsChart';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';
import { mockEmployee } from '../../data/mockEmployee';
import { mockSkills } from '../../data/mockSkills';
import { mockLearningConsistencyData, mockCourses } from '../../data/mockLearning';

export function HREmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Skill Passport');

  const empDir = mockHRAnalytics.employeesDirectory.find(e => e.id === id) || mockHRAnalytics.employeesDirectory[0];
  const profile = { ...mockEmployee, ...empDir };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/hr/employees')}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Employee Directory
      </button>

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar name={profile.fullName} src={profile.avatarUrl} size="xl" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{profile.fullName}</h1>
            <p className="text-xs font-semibold text-indigo-600 mt-0.5">{profile.role} • {profile.department}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span>Exp: {profile.experienceYears} Yrs</span>
              <span>Target: <strong className="text-slate-800">{profile.targetRole || 'Cloud Engineer'}</strong></span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center shrink-0">
          <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider block">Mobility Readiness</span>
          <span className="text-2xl font-extrabold text-indigo-700 block my-0.5">{profile.readiness}%</span>
          <span className="text-[10px] text-emerald-600 font-bold">High Mobility Fit</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6">
        {['Skill Passport', 'Learning & Consistency', 'Projects', 'Career Target'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Skill Passport */}
      {activeTab === 'Skill Passport' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Verified Skill Passport</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSkills.map((sk) => (
              <div key={sk.id} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-sm">{sk.name}</span>
                  <Badge variant={sk.verified ? 'success' : 'neutral'} size="sm">
                    {sk.level}
                  </Badge>
                </div>
                <span className="text-[11px] text-slate-500 block mb-2">{sk.category}</span>
                <div className="text-xs font-semibold text-indigo-600">Proficiency: {sk.proficiency}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Learning & Consistency */}
      {activeTab === 'Learning & Consistency' && (
        <div className="space-y-6">
          {/* Consistency Metrics Bar */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-300">Learning Telemetry</span>
                <h3 className="text-xl font-bold text-white">Employee Learning Consistency: 86%</h3>
                <p className="text-xs text-slate-300 mt-0.5">Status: Highly Consistent • Active 18/22 planned days this month</p>
              </div>

              <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1.5 rounded-xl text-amber-400 font-bold text-xs">
                <Flame className="w-5 h-5 animate-pulse" />
                5 Day Streak (Longest: 12 Days)
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-400 block">This Week</span>
                <span className="text-lg font-bold text-white">4h 35m</span>
              </div>
              <div>
                <span className="text-slate-400 block">This Month</span>
                <span className="text-lg font-bold text-white">18h 30m</span>
              </div>
              <div>
                <span className="text-slate-400 block">Courses Completed</span>
                <span className="text-lg font-bold text-emerald-400">5 Courses</span>
              </div>
              <div>
                <span className="text-slate-400 block">Last Learning Activity</span>
                <span className="text-sm font-semibold text-white">Today at 10:30 AM</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LearningActivityChart data={mockLearningConsistencyData.weeklyActivity} />

            <AnalyticsChart
              title="Monthly Learning Consistency Trend (%)"
              subtitle="Quarterly consistency score evolution"
              data={mockLearningConsistencyData.monthlyTrend}
              dataKey="consistencyScore"
              nameKey="month"
              type="line"
              colors={['#10b981']}
            />
          </div>

          {/* Course Details for HR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Enrolled Courses & Telemetry</h3>
            <div className="space-y-3">
              {mockCourses.map((c) => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{c.title}</span>
                      <Badge variant={c.status === 'Completed' ? 'success' : 'primary'} size="sm">
                        {c.status}
                      </Badge>
                    </div>
                    <span className="text-slate-500 text-[11px] block mt-0.5">Provider: {c.provider} • Target Skill: <strong>{c.targetSkill}</strong></span>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-indigo-600 block">{c.progress}% Completed</span>
                    <span className="text-slate-400 text-[11px]">Last Active: {c.lastAccessed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Impact Section */}
          <div className="bg-indigo-50/80 p-6 rounded-2xl border border-indigo-100 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Learning Skill Development Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-indigo-200">
                <span className="text-slate-400 block text-[11px]">Skill: AWS</span>
                <span className="font-bold text-slate-900 block mt-0.5">65% → 78% Growth</span>
                <span className="text-indigo-600 font-medium text-[11px]">Course: AWS Solutions Architect</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-indigo-200">
                <span className="text-slate-400 block text-[11px]">Skill: Kubernetes</span>
                <span className="font-bold text-slate-900 block mt-0.5">30% → 52% Growth</span>
                <span className="text-indigo-600 font-medium text-[11px]">Course: K8s Fundamentals</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-indigo-200">
                <span className="text-slate-400 block text-[11px]">Skill: Docker</span>
                <span className="font-bold text-slate-900 block mt-0.5">60% → 84% Growth</span>
                <span className="text-emerald-600 font-medium text-[11px]">Course Completed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === 'Projects' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Project History & Contributions</h3>
          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-900 text-sm block">Cloud Migration Platform</span>
            <p className="text-slate-600 mt-1">Developed FastAPI REST endpoints and containerized microservices on AWS.</p>
          </div>
        </div>
      )}

      {/* Tab: Career Target */}
      {activeTab === 'Career Target' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-base">Career Mobility Goal</h3>
          <p className="text-xs text-slate-600">Target Role: <strong>Cloud Engineer</strong> in Engineering Department.</p>
          <p className="text-xs text-slate-500">Current Match: 87% • Projected Match after learning completion: 92%</p>
        </div>
      )}
    </div>
  );
}
