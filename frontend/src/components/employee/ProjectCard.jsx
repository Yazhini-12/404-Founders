import React from 'react';
import { Sparkles, Calendar, Code, CheckCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ProjectCard({ project }) {
  const {
    title,
    role,
    description,
    contribution,
    technologies = [],
    detectedSkills = [],
    status,
    startDate,
    endDate
  } = project;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
            {role}
          </span>
        </div>
        <Badge variant={status === 'Completed' ? 'success' : 'primary'} size="sm">
          {status}
        </Badge>
      </div>

      <p className="mt-3 text-xs text-slate-600 leading-relaxed">{description}</p>

      {contribution && (
        <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Key Contribution</span>
          <p className="text-xs text-slate-700 leading-relaxed">{contribution}</p>
        </div>
      )}

      {/* Technologies */}
      <div className="mt-4">
        <span className="text-xs font-semibold text-slate-500 block mb-1.5">Technologies Used</span>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* AI Detected Skills */}
      {detectedSkills.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Detected Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {detectedSkills.map((sk, idx) => (
              <Badge key={idx} variant="primary" size="sm">
                {sk}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
