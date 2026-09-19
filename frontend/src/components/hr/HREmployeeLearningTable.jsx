import React from 'react';
import { Flame, Clock, Award, Eye, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';

export function HREmployeeLearningTable({ employees = [], onViewEmployee }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4">Current Role</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4 text-center">Learning Consistency</th>
              <th className="py-3.5 px-4 text-center">Streak</th>
              <th className="py-3.5 px-4 text-center">Hours</th>
              <th className="py-3.5 px-4 text-center">In Progress</th>
              <th className="py-3.5 px-4 text-center">Completed</th>
              <th className="py-3.5 px-4">Last Activity</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-3">
                  <Avatar name={emp.fullName} src={emp.avatarUrl} size="sm" />
                  <div>
                    <span className="block font-bold text-slate-900">{emp.fullName}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{emp.email}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium">{emp.role}</td>
                <td className="py-3.5 px-4 text-slate-600">{emp.department}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 text-xs">
                    {emp.consistency}%
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Flame className="w-3.5 h-3.5" />
                    {emp.streakDays} Days
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center font-medium text-slate-700">{emp.learningHours}h</td>
                <td className="py-3.5 px-4 text-center text-slate-700 font-semibold">{emp.coursesInProgress}</td>
                <td className="py-3.5 px-4 text-center text-emerald-600 font-semibold">{emp.coursesCompleted}</td>
                <td className="py-3.5 px-4 text-slate-500 text-xs">{emp.lastActive}</td>
                <td className="py-3.5 px-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => onViewEmployee(emp.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
