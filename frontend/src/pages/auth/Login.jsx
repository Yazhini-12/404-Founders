import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const { loginAs, loading } = useAuth();
  const navigate = useNavigate();

  const handleDemoEmployee = async () => {
    await loginAs('employee', 'ananya.r@skillsync.ai', 'password');
    navigate('/employee/dashboard');
  };

  const handleDemoHR = async () => {
    await loginAs('hr', 'hr.admin@skillsync.ai', 'password');
    navigate('/hr/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAs('employee', email || 'ananya.r@skillsync.ai', password);
    navigate('/employee/dashboard');
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-indigo-600 items-center justify-center font-black text-white text-2xl mb-3 shadow-lg shadow-indigo-200">
          S
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{APP_NAME}</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">{APP_TAGLINE}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ananya.r@skillsync.ai"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remember me
          </label>
          <a href="#forgot" onClick={(e) => e.preventDefault()} className="font-semibold text-indigo-600 hover:text-indigo-800">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Demo Persona Switcher Section */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
          Explore Demo Personas
        </span>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleDemoEmployee}
            disabled={loading}
          >
            Continue as Employee
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDemoHR}
            disabled={loading}
          >
            Continue as HR
          </Button>
        </div>
      </div>
    </div>
  );
}
