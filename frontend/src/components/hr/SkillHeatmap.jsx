import React from 'react';

export function SkillHeatmap({ matrix = [] }) {
  const getIntensityBadge = (val) => {
    switch (val) {
      case 'High':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md">High</span>;
      case 'Medium':
      case 'Med':
        return <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-md">Medium</span>;
      case 'Low':
        return <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">Low</span>;
      default:
        return <span className="text-xs text-slate-400">{val}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden p-5">
      <h3 className="font-bold text-slate-900 text-base mb-1">Organization Skill Density Matrix</h3>
      <p className="text-xs text-slate-500 mb-4">Cross-department skill competency levels</p>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600">
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4">Python</th>
              <th className="py-3 px-4">AWS</th>
              <th className="py-3 px-4">AI / GenAI</th>
              <th className="py-3 px-4">Kubernetes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {matrix.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 text-left font-bold text-slate-900">{row.department}</td>
                <td className="py-3.5 px-4">{getIntensityBadge(row.python)}</td>
                <td className="py-3.5 px-4">{getIntensityBadge(row.aws)}</td>
                <td className="py-3.5 px-4">{getIntensityBadge(row.ai)}</td>
                <td className="py-3.5 px-4">{getIntensityBadge(row.kubernetes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
