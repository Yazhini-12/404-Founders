import React from 'react';
import { Users, Sparkles, Building2, MapPin } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function RoleCard({ role, onViewMatches }) {
  const {
    id,
    title,
    department,
    location,
    candidatesCount = 0,
    topMatch = 0,
    matchedSkills = []
  } = role;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
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
          <Badge variant="primary" size="sm">
            Top Match: {topMatch}%
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/60">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <Users className="w-4 h-4 text-indigo-600" />
            Internal Candidates
          </span>
          <span className="font-bold text-slate-900 text-sm">{candidatesCount} Matched</span>
        </div>

        {matchedSkills.length > 0 && (
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Required Skills</span>
            <div className="flex flex-wrap gap-1">
              {matchedSkills.map((sk, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
        <Button variant="secondary" size="sm" onClick={() => onViewMatches(role)}>
          View Candidate Matches →
        </Button>
      </div>
    </div>
  );
}
