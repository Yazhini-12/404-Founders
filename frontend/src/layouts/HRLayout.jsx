import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  Briefcase,
  PlusCircle,
  Search,
  CheckSquare,
  BarChart2,
  Grid,
  TrendingUp,
  GraduationCap,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from '../components/common/Avatar';
import { APP_NAME } from '../utils/constants';

export function HRLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/hr/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/hr/employees', icon: Users },
    { name: 'Skill Intelligence', path: '/hr/skills', icon: BrainCircuit },
    { name: 'Internal Roles', path: '/hr/roles', icon: Briefcase },
    { name: 'Create Role', path: '/hr/create-role', icon: PlusCircle },
    { name: 'Talent Search', path: '/hr/talent-search', icon: Search },
    { name: 'Role Matches', path: '/hr/role-matches', icon: CheckSquare },
    { name: 'Workforce Skill Gap', path: '/hr/skill-gap', icon: BarChart2 },
    { name: 'Skill Heatmap', path: '/hr/skill-heatmap', icon: Grid },
    { name: 'Emerging Skills', path: '/hr/emerging-skills', icon: TrendingUp },
    { name: 'Learning & Consistency', path: '/hr/learning', icon: GraduationCap }, // Updated Learning & Consistency
    { name: 'Mobility Analytics', path: '/hr/mobility', icon: Activity }
  ];

  const getPageTitle = () => {
    const item = navItems.find(n => location.pathname.startsWith(n.path));
    return item ? item.name : 'HR Talent Intelligence';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-950 text-white shrink-0 border-r border-slate-800">
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-sm">
            S
          </div>
          <div>
            <span className="font-extrabold text-white text-lg tracking-tight">{APP_NAME}</span>
            <span className="block text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">HR Intelligence</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Settings & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white transform transition-transform duration-200 ease-in-out lg:hidden flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">S</div>
            <span className="font-extrabold text-white text-base">{APP_NAME}</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-bold text-slate-900">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center relative w-64">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search workforce, skills..."
                className="w-full bg-slate-100/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Notification */}
            <div className="relative p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </div>

            {/* HR Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <Avatar name={user?.fullName || 'Sarah Jenkins'} src={user?.avatarUrl} size="sm" />
              <div className="hidden md:block text-left">
                <span className="block text-xs font-bold text-slate-900">{user?.fullName || 'Sarah Jenkins'}</span>
                <span className="block text-[11px] text-slate-500 font-medium">VP of Talent Intelligence</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
