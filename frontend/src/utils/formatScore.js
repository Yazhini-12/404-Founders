export function formatPercentage(val) {
  if (val === null || val === undefined) return '0%';
  return `${Math.round(val)}%`;
}

export function getMatchBadgeColor(score) {
  if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score >= 70) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  if (score >= 50) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

export function getProficiencyColor(level) {
  switch (level?.toLowerCase()) {
    case 'expert':
    case 'advanced':
      return 'bg-indigo-600 text-white';
    case 'intermediate':
      return 'bg-blue-500 text-white';
    case 'developing':
      return 'bg-sky-400 text-white';
    default:
      return 'bg-slate-400 text-white';
  }
}
