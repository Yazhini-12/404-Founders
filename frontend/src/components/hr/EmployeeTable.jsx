import React from 'react';
import { Eye, Award } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export function EmployeeTable({ employees = [], onViewEmployee }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4">Current Role</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Experience</th>
              <th className="py-3.5 px-4">Top Skills</th>
              <th className="py-3.5 px-4 text-center">Mobility Readiness</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
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
                <td className="py-3.5 px-4 text-slate-600">{emp.experienceYears} yrs</td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {emp.topSkills.map((sk, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 text-xs">
                    {emp.readiness}%
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => onViewEmployee(emp.id)}
                  >
                    View Details
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
