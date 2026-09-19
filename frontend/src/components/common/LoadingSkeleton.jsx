import React from 'react';

export function LoadingSkeleton({ count = 3, height = 'h-24', className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-slate-200/70 animate-pulse rounded-xl ${height} w-full`} />
      ))}
    </div>
  );
}
