import React from 'react';

export function MonthlyConsistencyCalendar({ data = [] }) {
  const getIntensityColor = (level) => {
    switch (level) {
      case 3: return 'bg-indigo-600 hover:bg-indigo-700'; // >60 min
      case 2: return 'bg-indigo-400 hover:bg-indigo-500'; // 30-60 min
      case 1: return 'bg-indigo-200 hover:bg-indigo-300'; // <30 min
      default: return 'bg-slate-100 hover:bg-slate-200';   // 0 min
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Monthly Learning Consistency Grid</h3>
          <p className="text-xs text-slate-500">Daily learning session activity intensity</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Less</span>
          <span className="w-3 h-3 rounded-xs bg-slate-100 inline-block" />
          <span className="w-3 h-3 rounded-xs bg-indigo-200 inline-block" />
          <span className="w-3 h-3 rounded-xs bg-indigo-400 inline-block" />
          <span className="w-3 h-3 rounded-xs bg-indigo-600 inline-block" />
          <span>More</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-between">
        {data.map((item, idx) => (
          <div
            key={idx}
            title={`${item.date}: ${item.minutes > 0 ? `${item.minutes} minutes` : 'No learning'}`}
            className={`w-7 h-7 rounded-md ${getIntensityColor(item.level)} transition-colors cursor-pointer flex items-center justify-center text-[10px] font-medium text-slate-600 hover:scale-105 transform`}
          >
            {item.date.split('-')[2]}
          </div>
        ))}
      </div>
    </div>
  );
}
