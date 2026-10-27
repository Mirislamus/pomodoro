import { useEffect, useState } from 'react';
import { getNotificationPermission } from '../utils';

/** Tracks the browser notification permission, including changes made in site settings. */
const useNotificationPermission = (): NotificationPermission => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    const sync = () => setPermission(getNotificationPermission());
    let status: PermissionStatus | null = null;
    let isActive = true;

    sync();
    window.addEventListener('focus', sync);
    window.addEventListener('notification-permission-change', sync);

    navigator.permissions
      ?.query({ name: 'notifications' })
      .then(result => {
        if (!isActive) return;
        status = result;
        status.addEventListener('change', sync);
      })
      .catch(() => {});

    return () => {
      isActive = false;
      window.removeEventListener('focus', sync);
      window.removeEventListener('notification-permission-change', sync);
      status?.removeEventListener('change', sync);
    };
  }, []);

  return permission;
};

export default useNotificationPermission;
