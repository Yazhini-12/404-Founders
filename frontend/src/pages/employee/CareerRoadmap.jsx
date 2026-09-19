import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { CareerRoadmapWidget } from '../../components/employee/CareerRoadmapWidget';
import { Button } from '../../components/common/Button';
import { careerService } from '../../services/careerService';

export function CareerRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await careerService.getCareerRoadmap('emp-101');
      setRoadmap(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !roadmap) {
    return <div className="p-8 text-center text-slate-500">Generating Career Path Roadmap...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Career Roadmap"
        subtitle="Step-by-step career progression trajectory towards your target goal."
        badgeText={`Readiness: ${roadmap.readinessScore}% (Demo Score)`}
      />

      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Target Role Path</span>
          <h2 className="text-2xl font-extrabold text-white mt-1">Backend Developer → Cloud Engineer</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Complete the 4 designated milestones to increase role match readiness from 74% to 92%.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 text-center">
          <span className="text-3xl font-extrabold text-emerald-400">74%</span>
          <span className="block text-[11px] text-slate-300 font-semibold uppercase tracking-wider mt-0.5">Role Readiness Score</span>
        </div>
      </div>

      <CareerRoadmapWidget
        steps={roadmap.steps}
        currentRole={roadmap.currentRole}
        targetRole={roadmap.targetRole}
        readinessScore={roadmap.readinessScore}
      />
    </div>
  );
}
