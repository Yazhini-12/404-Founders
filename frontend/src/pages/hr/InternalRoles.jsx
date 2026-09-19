import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { RoleCard } from '../../components/hr/RoleCard';
import { Button } from '../../components/common/Button';
import { useRoles } from '../../hooks/useRoles';

export function InternalRoles() {
  const { roles, loading } = useRoles();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal Job Roles & Openings"
        subtitle="Manage active internal postings and review automated AI candidate matching."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => navigate('/hr/create-role')}>
            Create Internal Role
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onViewMatches={() => navigate('/hr/role-matches')}
          />
        ))}
      </div>
    </div>
  );
}
