import React from 'react';
import { AlertCircle, CheckCircle, ArrowUpRight } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';

export function SkillGapCard({ gapItem, onStartLearning }) {
  const { skill, current, required, status } = gapItem;

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Ready': return <Badge variant="success" size="sm">Ready</Badge>;
      case 'Needs Improvement': return <Badge variant="warning" size="sm">Needs Improvement</Badge>;
      case 'Major Gap': return <Badge variant="danger" size="sm">Major Gap</Badge>;
      default: return <Badge variant="neutral" size="sm">{st}</Badge>;
    }
  };

  const gapDiff = required - current;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-slate-900 text-sm">{skill}</span>
          {getStatusBadge(status)}
        </div>

        <div className="space-y-1 mt-3">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Current: {current}%</span>
            <span>Required: {required}%</span>
          </div>
          <ProgressBar value={current} max={100} color={status === 'Ready' ? 'emerald' : status === 'Major Gap' ? 'rose' : 'amber'} size="sm" />
        </div>
      </div>

      {gapDiff > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-rose-600 font-medium">Gap: -{gapDiff}%</span>
          {onStartLearning && (
            <button
              onClick={() => onStartLearning(skill)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              Start Course <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
