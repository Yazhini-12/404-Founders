import React from 'react';
import { Target, TrendingUp, Sparkles } from 'lucide-react';

export function RoleConnectionWidget() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">Career Mobility Impact</h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          Demo Projection
        </span>
      </div>

      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200/80">
        <div>
          <span className="text-xs text-slate-500 block">Target Role</span>
          <span className="font-bold text-slate-900 text-base">Cloud Engineer (Engineering)</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-xs text-slate-500 block">Current Match</span>
            <span className="text-lg font-bold text-indigo-600">87%</span>
          </div>

          <div className="flex items-center text-emerald-600 font-bold gap-1 text-sm">
            <TrendingUp className="w-4 h-4" />
            +5%
          </div>

          <div className="text-center bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">Projected Match</span>
            <span className="text-xl font-extrabold text-indigo-700">92%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
