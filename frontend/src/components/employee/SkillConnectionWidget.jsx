import React from 'react';
import { ArrowRight, Zap, Award, Sparkles } from 'lucide-react';

export function SkillConnectionWidget() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-white to-blue-50 rounded-xl border border-indigo-100 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Learning → Skill Growth Linkage</h3>
        </div>
        <span className="text-[11px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
          AI Passport Integration
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Course */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase text-slate-400 block">Enrolled Learning</span>
          <span className="font-bold text-slate-900 text-sm block mt-0.5">AWS Solutions Architect</span>
          <span className="text-xs text-indigo-600 font-medium mt-1 inline-block">Udemy • 65% Progress</span>
        </div>

        {/* Skill Impact */}
        <div className="bg-white p-3.5 rounded-lg border border-indigo-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">Target Skill: AWS</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-400 line-through">65%</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-base font-extrabold text-indigo-600">78%</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Target Level</span>
            <span className="text-xs font-bold text-emerald-600">85% Expert</span>
          </div>
        </div>

        {/* Outcome */}
        <div className="bg-emerald-50/80 p-3.5 rounded-lg border border-emerald-200 flex items-center gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-900 block">Skill Passport Updated</span>
            <span className="text-[11px] text-emerald-700">Verified evidence created on course completion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
