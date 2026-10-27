import useSettingsStore from '../stores/useSettingsStore';
import useSessionStore from '../stores/useSessionStore';
import { sessionSettingKeys } from '../consts/settings';
import { Settings } from '../typings/types';

/** Updates a setting and restarts the cycle when the change makes it stale. */
const useUpdateSetting = () => {
  const setSettings = useSettingsStore(state => state.setSettings);
  const resetSession = useSessionStore(state => state.resetSession);

  return <K extends keyof Settings>(key: K, value: Settings[K]) => {
    if (sessionSettingKeys.includes(key) && useSettingsStore.getState().settings[key] !== value) {
      resetSession();
    }
    setSettings(key, value);
  };
};

export default useUpdateSetting;
