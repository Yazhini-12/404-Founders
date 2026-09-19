import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Building2,
  MapPin,
  Briefcase,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { matchingService } from '../../services/matchingService';
import { roleService } from '../../services/roleService';

export function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const r = await roleService.getRoleDetails(id || 'role-1');
      const m = await matchingService.calculateRoleMatch('emp-101', r.id);
      setRole(r);
      setMatchDetails(m);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading || !role) {
    return <div className="p-8 text-center text-slate-500">Loading opportunity analysis...</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/employee/opportunities')}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Opportunities
      </button>

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary" size="sm">
              {role.type || 'Full-time Internal Role'}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Min Experience: {role.minExperience} Yrs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{role.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {role.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {role.location}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-slate-700 text-center shrink-0">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider block">AI Match Score</span>
          <span className="text-3xl font-black text-white block mt-0.5">{role.matchScore}%</span>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">High Fit Candidate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Why You Match & Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Why You Match */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Why You Match</h3>
            </div>
            <div className="space-y-2.5">
              {matchDetails?.whyMatch.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matched vs Missing Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="font-bold text-slate-900 text-sm block mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Matched Skills ({role.matchedSkills.length})
              </span>
              <div className="space-y-2">
                {role.matchedSkills.map((sk, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-100 text-xs font-semibold text-emerald-900">
                    <span>{sk}</span>
                    <Badge variant="success" size="sm">Verified</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="font-bold text-slate-900 text-sm block mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Missing / Gap Skills ({role.missingSkills.length + (role.partialSkills?.length || 0)})
              </span>
              <div className="space-y-2">
                {role.missingSkills.map((sk, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-rose-50/60 rounded-lg border border-rose-100 text-xs font-semibold text-rose-900">
                    <span>{sk}</span>
                    <Badge variant="danger" size="sm">Major Gap</Badge>
                  </div>
                ))}
                {role.partialSkills?.map((sk, idx) => (
                  <div key={`p-${idx}`} className="flex items-center justify-between p-2.5 bg-amber-50/60 rounded-lg border border-amber-100 text-xs font-semibold text-amber-900">
                    <span>{sk}</span>
                    <Badge variant="warning" size="sm">Needs Improvement</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Experience Match & Recommended Next Steps */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Experience Match Analysis</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Experience Score</span>
                  <span className="text-indigo-600">90%</span>
                </div>
                <ProgressBar value={90} color="indigo" size="sm" />
              </div>
              <p className="text-xs text-slate-500">
                Your 3.5 years of experience in Backend Engineering exceeds the minimum required threshold of 3 years.
              </p>
            </div>
          </div>

          <div className="bg-indigo-50/80 p-6 rounded-2xl border border-indigo-100 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Recommended Next Steps</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white rounded-lg border border-indigo-200 flex items-center justify-between">
                <span>1. Complete Kubernetes Course</span>
                <span className="text-emerald-600 font-bold">+6% Match</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-indigo-200 flex items-center justify-between">
                <span>2. Complete Terraform Basics</span>
                <span className="text-emerald-600 font-bold">+7% Match</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="w-full"
              onClick={() => navigate('/employee/learning')}
            >
              Start Skill Gap Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
