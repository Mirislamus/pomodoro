import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '../typings/types';
import { defaultSettings } from '../consts/settings';

interface SettingsStore {
  settings: Settings;
  setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      settings: { ...defaultSettings },
      setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) =>
        set(state => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      resetSettings: () => set({ settings: { ...defaultSettings } }),
    }),
    {
      name: 'settings-storage',
    }
  )
);

export default useSettingsStore;
