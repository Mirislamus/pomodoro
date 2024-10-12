import { useEffect, useState } from 'react';
import { getNotificationPermission } from '../utils';
import useSettingsStore from '../stores/useSettingsStore';

const useNotificationPermission = () => {
  const [permission, setPermission] = useState('default');
  const settings = useSettingsStore(state => state.settings);

  useEffect(() => {
    setPermission(getNotificationPermission());
  }, [settings.allowNotifications]);

  return permission;
};

export default useNotificationPermission;
