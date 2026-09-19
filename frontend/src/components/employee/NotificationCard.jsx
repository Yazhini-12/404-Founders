import React from 'react';
import { Bell, Sparkles, Briefcase, BookOpen, Award, Check } from 'lucide-react';

export function NotificationCard({ notification, onMarkRead }) {
  const { id, title, message, timestamp, type, read, link } = notification;

  const getIcon = () => {
    switch (type) {
      case 'skill': return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'opportunity': return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'learning': return <BookOpen className="w-4 h-4 text-sky-600" />;
      default: return <Award className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className={`p-4 rounded-xl border transition-all ${read ? 'bg-white border-slate-200/80 opacity-75' : 'bg-indigo-50/40 border-indigo-200 shadow-xs'}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
            <span className="text-[11px] text-slate-400">{timestamp}</span>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{message}</p>
          {!read && onMarkRead && (
            <button
              onClick={() => onMarkRead(id)}
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
