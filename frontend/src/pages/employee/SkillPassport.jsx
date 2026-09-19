import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  FolderKanban,
  BookOpen,
  UserCheck,
  LineChart
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { SkillCard } from '../../components/employee/SkillCard';
import { Modal } from '../../components/common/Modal';
import { useSkills } from '../../hooks/useSkills';
import { SKILL_CATEGORIES } from '../../utils/constants';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function SkillPassport() {
  const { skills, loading } = useSkills();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', SKILL_CATEGORIES.TECHNICAL, SKILL_CATEGORIES.TRANSFERABLE, SKILL_CATEGORIES.SOFT, SKILL_CATEGORIES.EMERGING];

  const filteredSkills = categoryFilter === 'All'
    ? skills
    : skills.filter(s => s.category === categoryFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Skill Passport"
        subtitle="A continuously evolving view of your capabilities."
        badgeText="18 Skills Verified"
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Continuous AI Skill Engine</span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Skill Passport & Competency Verification</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Automatically updated from resume, project contributions, course completions, and manager validations.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/10">
          <div>
            <span className="text-2xl font-bold text-white">92%</span>
            <span className="block text-[10px] text-indigo-300 font-semibold uppercase">Avg Confidence</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div>
            <span className="text-2xl font-bold text-emerald-400">14</span>
            <span className="block text-[10px] text-slate-300 font-semibold uppercase">Verified Skills</span>
          </div>
        </div>
      </div>

      {/* Main Filter & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        {/* Sub-tabs */}
        <div className="flex gap-4">
          {['Overview', 'Skill Evidence', 'Skill Growth'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Grid */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onViewDetails={(s) => setSelectedSkill(s)}
            />
          ))}
        </div>
      )}

      {/* Skill Evidence Tab */}
      {activeTab === 'Skill Evidence' && (
        <div className="space-y-4">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{skill.name}</h3>
                  <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded">
                    {skill.level} ({skill.proficiency}%)
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{skill.evidences?.length || 0} Evidence Items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {skill.evidences?.map((ev, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs">
                    <span className="font-bold text-indigo-600 block text-[11px] uppercase tracking-wider">{ev.type}</span>
                    <span className="text-slate-800 font-medium block mt-0.5">{ev.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skill Growth Tab */}
      {activeTab === 'Skill Growth' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Python & AWS Skill Growth Timeline</h3>
            <p className="text-xs text-slate-500">Quarterly proficiency trajectory tracking</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={skills[0]?.growthHistory || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Modal Details */}
      {selectedSkill && (
        <Modal
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={`${selectedSkill.name} — Skill Passport Details`}
          subtitle={`Category: ${selectedSkill.category} • Proficiency: ${selectedSkill.proficiency}%`}
        >
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block text-[11px]">Level</span>
                <span className="font-bold text-slate-900 text-sm">{selectedSkill.level}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">AI Confidence Score</span>
                <span className="font-bold text-indigo-600 text-sm">{selectedSkill.confidence}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Projects Count</span>
                <span className="font-bold text-slate-900">{selectedSkill.projectCount} Projects</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Last Used</span>
                <span className="font-bold text-slate-900">{selectedSkill.lastUsed}</span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-sm pt-2">Verified Skill Evidence</h4>
            <div className="space-y-2">
              {selectedSkill.evidences?.map((ev, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">{ev.title}</span>
                    <span className="text-[11px] text-indigo-600 font-medium">{ev.type}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
