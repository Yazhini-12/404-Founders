import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export function TalentMatchCard({ matchItem }) {
  const { employee, matchScore, matchedSkills = [], missingSkills = [], experienceMatch } = matchItem;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <Avatar name={employee.fullName} src={employee.avatarUrl} size="lg" />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{employee.fullName}</h3>
            <span className="text-xs text-slate-500 font-medium">({employee.role} • {employee.department})</span>
          </div>
          <span className="text-xs text-slate-500 block mt-0.5">{employee.experienceYears} Years Experience • {experienceMatch}</span>

          <div className="mt-3 flex flex-wrap gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">Matched Skills</span>
              <div className="flex flex-wrap gap-1">
                {matchedSkills.map((sk, idx) => (
                  <Badge key={idx} variant="success" size="sm">
                    {sk}
                  </Badge>
                ))}
              </div>
            </div>
            {missingSkills.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-700 block mb-1">Gaps / Needs Training</span>
                <div className="flex flex-wrap gap-1">
                  {missingSkills.map((sk, idx) => (
                    <Badge key={idx} variant="danger" size="sm">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-right shrink-0 bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
        <span className="text-2xl font-extrabold text-indigo-700 block">{matchScore}%</span>
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">AI Role Match</span>
      </div>
    </div>
  );
}
