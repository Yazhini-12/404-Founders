import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xl text-center max-w-md">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
          404
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The route you are trying to access does not exist or has been moved.
        </p>
        <Button variant="primary" icon={Home} onClick={() => navigate('/employee/dashboard')} className="w-full">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
