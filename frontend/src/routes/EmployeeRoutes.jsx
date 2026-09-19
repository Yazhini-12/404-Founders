import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeLayout } from '../layouts/EmployeeLayout';
import { Dashboard } from '../pages/employee/Dashboard';
import { Profile } from '../pages/employee/Profile';
import { Experience } from '../pages/employee/Experience';
import { Projects } from '../pages/employee/Projects';
import { WorkHistory } from '../pages/employee/WorkHistory';
import { LearningHub } from '../pages/employee/LearningHub'; // Updated LearningHub
import { SkillPassport } from '../pages/employee/SkillPassport';
import { Opportunities } from '../pages/employee/Opportunities';
import { OpportunityDetails } from '../pages/employee/OpportunityDetails';
import { SkillGap } from '../pages/employee/SkillGap';
import { CareerRoadmap } from '../pages/employee/CareerRoadmap';
import { Assistant } from '../pages/employee/Assistant';
import { Notifications } from '../pages/employee/Notifications';

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route element={<EmployeeLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="work-history" element={<WorkHistory />} />
        <Route path="learning" element={<LearningHub />} />
        <Route path="skills" element={<SkillPassport />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="opportunities/:id" element={<OpportunityDetails />} />
        <Route path="skill-gap" element={<SkillGap />} />
        <Route path="career-roadmap" element={<CareerRoadmap />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}
