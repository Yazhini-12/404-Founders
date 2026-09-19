import React from 'react';
import { CheckCircle2, AlertCircle, Award, FolderKanban, BookOpen, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export function SkillCard({ skill, onViewDetails }) {
  const {
    name,
    category,
    proficiency,
    confidence,
    level,
    evidenceCount = 0,
    projectCount = 0,
    learningCount = 0,
    lastUsed,
    verified
  } = skill;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{name}</h3>
            {verified ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" title="Verified Skill" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500" title="Unverified Skill" />
            )}
          </div>
          <span className="text-xs text-slate-500 font-medium">{category}</span>
        </div>
        <Badge variant={verified ? 'success' : 'warning'} size="sm">
          {level}
        </Badge>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center text-xs font-semibold mb-1">
          <span className="text-slate-600">Proficiency Score</span>
          <span className="text-indigo-600 font-bold">{proficiency}%</span>
        </div>
        <ProgressBar value={proficiency} color="indigo" size="sm" />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1" title="Projects">
            <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
            {projectCount}
          </span>
          <span className="flex items-center gap-1" title="Learning">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            {learningCount}
          </span>
        </div>
        <span className="text-slate-400 text-[11px]">Last used: {lastUsed}</span>
      </div>

      {onViewDetails && (
        <button
          onClick={() => onViewDetails(skill)}
          className="w-full mt-3 pt-2 text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer border-t border-dashed border-slate-100"
        >
          View Evidence & Growth →
        </button>
      )}
    </div>
  );
}
