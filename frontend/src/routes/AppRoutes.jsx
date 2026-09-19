import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/auth/Login';
import { EmployeeRoutes } from './EmployeeRoutes';
import { HRRoutes } from './HRRoutes';
import { NotFound } from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="employee/*" element={<EmployeeRoutes />} />
      <Route path="hr/*" element={<HRRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
