// Notification Service Layer
// TODO: Replace with Supabase database queries & Realtime channels

import { mockNotifications } from '../data/mockNotifications';

export const notificationService = {
  async getNotifications(userId = 'emp-101') {
    await new Promise(res => setTimeout(res, 100));
    return [...mockNotifications];
  },

  async markAsRead(notificationId) {
    await new Promise(res => setTimeout(res, 100));
    const notif = mockNotifications.find(n => n.id === notificationId);
    if (notif) notif.read = true;
    return true;
  },

  async subscribeToNotifications(userId, callback) {
    // TODO: Supabase Realtime channel subscription
    return () => {};
  }
};
