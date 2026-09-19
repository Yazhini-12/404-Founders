import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export function CareerRoadmapWidget({ steps = [], currentRole, targetRole, readinessScore = 74 }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Career Path Progression</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-bold text-slate-800 text-sm">{currentRole}</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-bold text-indigo-600 text-sm">{targetRole}</span>
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg text-right">
          <span className="text-xs font-bold text-indigo-700">Estimated Readiness: {readinessScore}%</span>
        </div>
      </div>

      <div className="mt-5 relative border-l-2 border-indigo-100 ml-4 space-y-6">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'Completed';
          const isInProgress = step.status === 'In Progress';
          return (
            <div key={idx} className="relative pl-6">
              <div className={`absolute -left-2.5 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-500 text-white' : isInProgress ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-slate-200 text-slate-500'}`}>
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{step.stepNumber}</span>}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                  <Badge variant={isCompleted ? 'success' : isInProgress ? 'primary' : 'neutral'} size="sm">
                    {step.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
