import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export function useNotifications(userId = 'emp-101') {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    notificationService.getNotifications(userId)
      .then(data => {
        if (mounted) setNotifications(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [userId]);

  const markRead = async (id) => {
    await notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return { notifications, unreadCount, loading, markRead };
}
