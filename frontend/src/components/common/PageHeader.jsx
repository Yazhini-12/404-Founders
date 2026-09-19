import React from 'react';

export function PageHeader({
  title,
  subtitle,
  actions,
  badgeText,
  className = ''
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-5 border-b border-slate-200/80 gap-4 ${className}`}>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {badgeText && (
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-200">
              {badgeText}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
    </div>
  );
}
