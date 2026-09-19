// Auth Service Layer - Handles Authentication & Session Management
// TODO: Replace mock implementation with Supabase Auth (supabase.auth.signInWithPassword)

import { mockEmployee } from '../data/mockEmployee';

export const authService = {
  async login(email, password, role = 'employee') {
    // Artificial latency simulation
    await new Promise(res => setTimeout(res, 200));

    if (role === 'hr') {
      return {
        user: {
          id: 'hr-901',
          email: email || 'hr.admin@skillsync.ai',
          fullName: 'Sarah Jenkins',
          role: 'hr',
          jobTitle: 'VP of Talent Intelligence',
          department: 'Human Resources',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
        },
        token: 'mock-jwt-hr-token-xyz'
      };
    }

    return {
      user: {
        id: mockEmployee.id,
        email: email || mockEmployee.email,
        fullName: mockEmployee.fullName,
        role: 'employee',
        jobTitle: mockEmployee.jobTitle,
        department: mockEmployee.department,
        avatarUrl: mockEmployee.avatarUrl
      },
      token: 'mock-jwt-employee-token-abc'
    };
  },

  async logout() {
    // TODO: Call supabase.auth.signOut()
    await new Promise(res => setTimeout(res, 100));
    return true;
  },

  async getCurrentUser() {
    // TODO: Call supabase.auth.getUser()
    return null;
  }
};
