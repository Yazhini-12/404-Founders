import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Building2, MapPin } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function RoleRecommendationCard({ role, onViewDetails }) {
  const {
    id,
    title,
    department,
    location,
    type,
    matchScore,
    matchedSkills = [],
    missingSkills = [],
    partialSkills = []
  } = role;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {department}
              </span>
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {location}
                </span>
              )}
            </div>
          </div>

          <div className="text-right shrink-0 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1.5">
            <span className="text-xl font-extrabold text-indigo-600 block">{matchScore}%</span>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Match</span>
          </div>
        </div>

        {/* Matched Skills */}
        <div className="mt-4">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Matched Skills
          </span>
          <div className="flex flex-wrap gap-1">
            {matchedSkills.map((sk, idx) => (
              <Badge key={idx} variant="success" size="sm">
                {sk}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing / Gap Skills */}
        {(missingSkills.length > 0 || partialSkills.length > 0) && (
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Skills to Develop
            </span>
            <div className="flex flex-wrap gap-1">
              {missingSkills.map((sk, idx) => (
                <Badge key={idx} variant="danger" size="sm">
                  {sk}
                </Badge>
              ))}
              {partialSkills.map((sk, idx) => (
                <Badge key={`p-${idx}`} variant="warning" size="sm">
                  {sk}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">{type || 'Full-time'}</span>
        <Button
          variant="primary"
          size="sm"
          icon={ArrowRight}
          onClick={() => onViewDetails(role)}
        >
          View Role Details
        </Button>
      </div>
    </div>
  );
}
