import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePomodoroToast } from '../shared/ui/toast/usePomodoroToast';
import useSettingsStore from '../stores/useSettingsStore';
import useSessionStore from '../stores/useSessionStore';
import { defaultSettings, sessionSettingKeys } from '../consts/settings';
import { sanitizeSettings } from '../utils';

/** Returns a handler that copies a link carrying all current settings to the clipboard. */
export const useCopySettingsLink = () => {
  const { t } = useTranslation();
  const toast = usePomodoroToast();

  return async () => {
    const { settings } = useSettingsStore.getState();
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(Object.entries(settings).map(([key, value]) => [key, String(value)])).toString();

    try {
      await navigator.clipboard.writeText(url.toString());
      toast({
        id: 'settings-copied-toast-info',
        title: t('settings_copied_toast_info'),
        status: 'info',
        duration: 5000,
        isClosable: false,
      });
    } catch {
      toast({
        id: 'settings-copy-failed-toast',
        title: t('settings_copy_failed_toast'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
};

/** Applies settings shared through a link once, then strips them from the address bar. */
export const useApplySettingsFromUrl = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const settingKeys = Object.keys(defaultSettings).filter(key => url.searchParams.has(key));
    if (settingKeys.length === 0) return;

    const patch = sanitizeSettings(Object.fromEntries(url.searchParams));
    const { settings, patchSettings } = useSettingsStore.getState();
    const changesCycle = sessionSettingKeys.some(key => key in patch && patch[key] !== settings[key]);

    if (changesCycle) useSessionStore.getState().resetSession();
    patchSettings(patch);

    // Invalid values are dropped too, so a broken link does not linger in the address bar
    settingKeys.forEach(key => url.searchParams.delete(key));
    window.history.replaceState(window.history.state, '', url);
  }, []);
};
