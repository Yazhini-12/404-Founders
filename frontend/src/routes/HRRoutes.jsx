import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HRLayout } from '../layouts/HRLayout';
import { Dashboard } from '../pages/hr/Dashboard';
import { Employees } from '../pages/hr/Employees';
import { HREmployeeDetails } from '../pages/hr/HREmployeeDetails';
import { SkillIntelligence } from '../pages/hr/SkillIntelligence';
import { InternalRoles } from '../pages/hr/InternalRoles';
import { CreateRole } from '../pages/hr/CreateRole';
import { TalentSearch } from '../pages/hr/TalentSearch';
import { RoleMatches } from '../pages/hr/RoleMatches';
import { SkillHeatmapPage } from '../pages/hr/SkillHeatmapPage';
import { WorkforceSkillGap } from '../pages/hr/WorkforceSkillGap';
import { EmergingSkills } from '../pages/hr/EmergingSkills';
import { HRLearningPage } from '../pages/hr/HRLearningPage'; // Updated HR Learning & Consistency
import { MobilityAnalytics } from '../pages/hr/MobilityAnalytics';

export function HRRoutes() {
  return (
    <Routes>
      <Route element={<HRLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/:id" element={<HREmployeeDetails />} />
        <Route path="skills" element={<SkillIntelligence />} />
        <Route path="roles" element={<InternalRoles />} />
        <Route path="create-role" element={<CreateRole />} />
        <Route path="talent-search" element={<TalentSearch />} />
        <Route path="role-matches" element={<RoleMatches />} />
        <Route path="skill-gap" element={<WorkforceSkillGap />} />
        <Route path="skill-heatmap" element={<SkillHeatmapPage />} />
        <Route path="emerging-skills" element={<EmergingSkills />} />
        <Route path="learning" element={<HRLearningPage />} />
        <Route path="mobility" element={<MobilityAnalytics />} />
      </Route>
    </Routes>
  );
}
