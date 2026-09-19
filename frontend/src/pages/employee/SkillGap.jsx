import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { SkillGapCard } from '../../components/employee/SkillGapCard';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { gapAnalysisService } from '../../services/gapAnalysisService';

export function SkillGap() {
  const [analysis, setAnalysis] = useState(null);
  const [targetRole, setTargetRole] = useState('role-1');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await gapAnalysisService.analyzeSkillGap('emp-101', targetRole);
      setAnalysis(res);
      setLoading(false);
    }
    loadData();
  }, [targetRole]);

  if (loading || !analysis) {
    return <div className="p-8 text-center text-slate-500">Calculating Skill Gap Matrix...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skill Gap Analysis"
        subtitle="Compare your current capabilities against target role requirements."
        badgeText={`Readiness: ${analysis.overallReadiness}%`}
      />

      {/* Target Selector Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Target Career Role</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{analysis.targetRole}</h2>
          <p className="text-xs text-slate-500 mt-1">Overall readiness score is 74% based on 7 evaluated core skills.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="role-1">Target: Cloud Engineer</option>
            <option value="role-2">Target: DevOps Engineer</option>
            <option value="role-4">Target: AI Backend Engineer</option>
          </select>
          <Button variant="primary" size="sm" icon={BookOpen} onClick={() => navigate('/employee/learning')}>
            Start Recommendations
          </Button>
        </div>
      </div>

      {/* Skills Comparison Grid */}
      <div>
        <h3 className="font-bold text-slate-900 text-base mb-3">Skill Level Comparison (Current vs Required)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.skillsComparison.map((item, idx) => (
            <SkillGapCard
              key={idx}
              gapItem={item}
              onStartLearning={() => navigate('/employee/learning')}
            />
          ))}
        </div>
      </div>

      {/* Priority Skills & Recommended Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base mb-3">Priority Skills to Develop</h3>
          <div className="space-y-3">
            {analysis.prioritySkills.map((ps, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{ps.name}</span>
                  <span className="text-rose-600 font-semibold">-{ps.gap}% Gap • Est. {ps.estimatedHours} Hours</span>
                </div>
                <span className="bg-rose-100 text-rose-800 px-2.5 py-1 rounded font-bold">
                  {ps.impact} Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50/80 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base mb-3">Personalized Learning Gateway Recommendations</h3>
          <div className="space-y-3">
            {analysis.recommendations.map((rec) => (
              <div key={rec.id} className="p-3.5 bg-white rounded-xl border border-indigo-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{rec.title}</span>
                  <span className="text-indigo-600 font-medium">{rec.provider} • {rec.estimatedDuration}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate('/employee/learning')}>
                  Enroll Hub
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
