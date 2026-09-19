import React from 'react';
import { Outlet } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Left panel branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-extrabold text-white text-xl shadow-lg shadow-indigo-500/30">
              S
            </div>
            <span className="text-2xl font-black tracking-tight">{APP_NAME}</span>
          </div>
          <p className="mt-2 text-indigo-200/80 text-sm font-medium">{APP_TAGLINE}</p>
        </div>

        <div className="relative z-10 my-auto">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            AI-Powered Talent Intelligence & Internal Career Mobility
          </h1>
          <p className="mt-4 text-slate-300 text-base max-w-lg leading-relaxed">
            Continuously analyze employee experience, discover transferable skills, match talent to internal roles, and provide automated career roadmaps.
          </p>
        </div>

        <div className="text-xs text-slate-500">
          © 2026 {APP_NAME}. Enterprise Talent Intelligence.
        </div>
      </div>

      {/* Right panel form content */}
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
