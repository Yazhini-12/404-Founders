import React, { useState, useEffect } from 'react';
import { CheckSquare, Briefcase } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { TalentMatchCard } from '../../components/hr/TalentMatchCard';
import { matchingService } from '../../services/matchingService';
import { mockRoles } from '../../data/mockRoles';

export function RoleMatches() {
  const [selectedRole, setSelectedRole] = useState('role-1');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await matchingService.getRoleMatchesForHR(selectedRole);
      setMatches(res);
      setLoading(false);
    }
    loadData();
  }, [selectedRole]);

  const currentRoleObj = mockRoles.find(r => r.id === selectedRole) || mockRoles[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Match Candidate Rankings"
        subtitle="Ranked candidate matches for internal role openings based on Skill Passport alignment."
        badgeText="Demo Score Ranking"
      />

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Select Internal Role</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{currentRoleObj.title} ({currentRoleObj.department})</h2>
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800"
        >
          {mockRoles.map(r => (
            <option key={r.id} value={r.id}>{r.title} — {r.department}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {matches.map((item, idx) => (
          <TalentMatchCard key={idx} matchItem={item} />
        ))}
      </div>
    </div>
  );
}
