import { useEffect, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import { getNotificationPermission } from '../utils';

const useNotificationPermission = () => {
  const [permission, setPermission] = useState('default');
  const { settings } = useSettings();

  useEffect(() => {
    setPermission(getNotificationPermission());
  }, [settings.allowNotifications]);

  return permission;
};

export default useNotificationPermission;
