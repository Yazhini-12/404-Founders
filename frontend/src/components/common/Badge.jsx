import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon: Icon,
  className = ''
}) {
  const base = 'inline-flex items-center font-medium rounded-full border';

  const variants = {
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    purple: 'bg-violet-50 text-violet-700 border-violet-200',
    blue: 'bg-sky-50 text-sky-700 border-sky-200'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1 text-sm gap-1.5'
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
