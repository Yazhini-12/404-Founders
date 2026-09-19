import React from 'react';
import { Grid } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { SkillHeatmap } from '../../components/hr/SkillHeatmap';
import { mockHRAnalytics } from '../../data/mockHRAnalytics';

export function SkillHeatmapPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Skill Matrix Heatmap"
        subtitle="Visual representation of competency distribution across organizational units."
        badgeText="Matrix Intelligence"
      />

      <SkillHeatmap matrix={mockHRAnalytics.heatmapMatrix} />
    </div>
  );
}
