import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Compass,
  GraduationCap,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Flame,
  Clock,
  Play
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-400/30">
                Backend Developer • Engineering
              </span>
              <span className="text-xs text-slate-400">3.5 Years Exp</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Good morning, Ananya</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Target Goal: <span className="text-indigo-300 font-bold">Cloud Engineer</span>. Your profile is 92% complete and skill growth is accelerating nicely!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-xs text-slate-300 block font-medium">Profile Completion</span>
              <span className="text-2xl font-extrabold text-white">92%</span>
            </div>
            <div className="w-16">
              <ProgressBar value={92} color="indigo" size="sm" />
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/employee/profile')}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Profile Completion"
          value="92%"
          subtitle="All core sections verified"
          icon={Award}
          iconBg="bg-emerald-50 text-emerald-600"
          trend="+4%"
        />
        <StatCard
          title="Skills Identified"
          value="18"
          subtitle="12 Technical, 4 Soft, 2 Emerging"
          icon={Sparkles}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Recommended Roles"
          value="5"
          subtitle="Top Match: Cloud Engineer (87%)"
          icon={Compass}
          iconBg="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Learning In Progress"
          value="3"
          subtitle="Consistency: 86% (5 Day Streak)"
          icon={GraduationCap}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Best Match & Top Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Best Role Match Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Top Recommended Match</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Cloud Engineer — 87% Match</h3>
              </div>
              <Button variant="primary" size="sm" icon={ArrowRight} onClick={() => navigate('/employee/opportunities/role-1')}>
                View Match
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">Matched Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {['AWS (78%)', 'Docker (84%)', 'Python (92%)', 'Linux (80%)'].map((sk, idx) => (
                    <Badge key={idx} variant="success" size="sm">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block mb-2">Needs Improvement / Missing</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Kubernetes (52%)', 'Terraform (20%)'].map((sk, idx) => (
                    <Badge key={idx} variant="danger" size="sm">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Skills & Skill Growth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Top Verified Skills</h3>
                <button onClick={() => navigate('/employee/skills')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                  View All Passport →
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Python', level: '92%', val: 92 },
                  { name: 'SQL', level: '86%', val: 86 },
                  { name: 'Docker', level: '84%', val: 84 },
                  { name: 'AWS', level: '78%', val: 78 }
                ].map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{sk.name}</span>
                      <span className="text-indigo-600">{sk.level}</span>
                    </div>
                    <ProgressBar value={sk.val} color="indigo" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Skill Growth */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Recent Skill Growth</h3>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="space-y-3">
                {[
                  { name: 'AWS', from: 65, to: 78, change: '+13%' },
                  { name: 'Kubernetes', from: 30, to: 52, change: '+22%' },
                  { name: 'Leadership', from: 45, to: 60, change: '+15%' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{item.name}</span>
                      <span className="text-[11px] text-slate-500">{item.from}% → {item.to}%</span>
                    </div>
                    <Badge variant="success" size="sm">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Learning Gateway Summary & Activity */}
        <div className="space-y-6">
          {/* Learning Consistency Summary Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Learning Hub Gateway</h3>
              </div>
              <button onClick={() => navigate('/employee/learning')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Open Hub →
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 rounded-xl mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-300 uppercase">Consistency Score</span>
                  <div className="text-2xl font-extrabold text-white">86%</div>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-500/20 px-2.5 py-1 rounded-full text-amber-400 text-xs font-bold">
                  <Flame className="w-4 h-4 animate-pulse" />
                  5 Day Streak
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-300 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                This week: 4h 35m (83% of 5h goal)
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
              <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Continue Learning</span>
              <h4 className="font-bold text-slate-900 text-xs line-clamp-1">AWS Solutions Architect Associate Lab</h4>
              <span className="text-[11px] text-indigo-600 font-medium">Udemy • 65% Completed</span>
              <Button variant="primary" size="sm" icon={Play} className="w-full mt-2.5" onClick={() => navigate('/employee/learning')}>
                Continue Learning
              </Button>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Recent Activity</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800">AWS skill updated</span>
                  <p className="text-slate-500 text-[11px]">Increased from 65% to 78% after lab submission.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800">New Role Match</span>
                  <p className="text-slate-500 text-[11px]">Cloud Engineer matched at 87%.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800">Kubernetes course completed</span>
                  <p className="text-slate-500 text-[11px]">Module 4 Kubernetes networking completed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
