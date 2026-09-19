import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = 'No data found',
  description = 'There are no items to display at this time.',
  icon: Icon = Inbox,
  actionText,
  onAction
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-10 text-center flex flex-col items-center justify-center my-4">
      <div className="p-3.5 bg-slate-100 text-slate-400 rounded-full mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-slate-800 text-base">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" className="mt-4" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
