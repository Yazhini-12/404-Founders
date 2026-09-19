import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillsync_user');
    return saved ? JSON.parse(saved) : {
      id: 'emp-101',
      fullName: 'Ananya R',
      email: 'ananya.r@skillsync.ai',
      role: 'employee',
      jobTitle: 'Backend Developer',
      department: 'Engineering',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250'
    };
  });
  const [loading, setLoading] = useState(false);

  const loginAs = async (role = 'employee', email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password, role);
      setUser(res.user);
      localStorage.setItem('skillsync_user', JSON.stringify(res.user));
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('skillsync_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginAs, logout, loading, isHR: user?.role === 'hr' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
}
