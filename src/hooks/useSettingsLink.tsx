import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import { Settings } from '../typings/types';
import { usePomodoroToast } from '../components/ui-kit/toast/usePomodoroToast';
import { t } from 'i18next';

export const useSettingsLink = () => {
  const { settings, setSettings } = useSettings();
  const toast = usePomodoroToast();

  const createSettingsLink = (): string => {
    const settingsParams = new URLSearchParams();
    for (const [key, value] of Object.entries(settings)) {
      settingsParams.set(key, String(value));
    }
    return `${window.location.origin}${window.location.pathname}?${settingsParams.toString()}`;
  };

  const onSettingsLinkCopy = () => {
    navigator.clipboard.writeText(createSettingsLink()).then(() => {
      toast({
        id: 'settings-copied-toast-info',
        title: t('settings_copied_toast_info'),
        status: 'info',
        duration: 5000,
        isClosable: false,
      });
    });
  };

  const applySettingsFromURL = (): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    for (const [key, value] of Object.entries(params)) {
      if (key in settings) {
        const typedKey = key as keyof Settings;
        const setting = settings[typedKey];
        if (typeof setting === 'boolean') {
          setSettings(typedKey, value === 'true');
        } else if (typeof setting === 'number') {
          setSettings(typedKey, Number(value));
        }
      }
    }
  };

  useEffect(() => {
    applySettingsFromURL();
  }, []);

  return onSettingsLinkCopy;
};
