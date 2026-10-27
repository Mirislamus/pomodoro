import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '../typings/types';
import { defaultSettings } from '../consts/settings';
import { sanitizeSettings } from '../utils/sanitizeSettings';

interface SettingsStore {
  settings: Settings;
  setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  patchSettings: (patch: Partial<Settings>) => void;
  resetSettings: () => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      settings: { ...defaultSettings },
      setSettings: (key, value) =>
        set(state => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      patchSettings: patch => set(state => ({ settings: { ...state.settings, ...patch } })),
      resetSettings: () => set({ settings: { ...defaultSettings } }),
    }),
    {
      name: 'settings-storage',
      // Fill in settings added after the user's data was saved and drop corrupted values
      merge: (persisted, current) => {
        const stored = (persisted as Partial<SettingsStore> | undefined)?.settings ?? {};
        return { ...current, settings: { ...defaultSettings, ...sanitizeSettings(stored, { clampToLimits: false }) } };
      },
    }
  )
);

export default useSettingsStore;
