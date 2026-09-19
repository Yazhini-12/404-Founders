import React from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { NotificationCard } from '../../components/employee/NotificationCard';
import { useNotifications } from '../../hooks/useNotifications';

export function Notifications() {
  const { notifications, unreadCount, markRead } = useNotifications();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Notifications Center"
        subtitle="Skill updates, role match alerts, and learning recommendations."
        badgeText={`${unreadCount} Unread`}
      />

      <div className="space-y-3">
        {notifications.map((notif) => (
          <NotificationCard
            key={notif.id}
            notification={notif}
            onMarkRead={markRead}
          />
        ))}
      </div>
    </div>
  );
}
