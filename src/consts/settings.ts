import { AlarmSound, TickSound } from '../typings/enums';
import { Settings } from '../typings/types';
import { getMsFromMin } from '../utils/getMsFromMin';

export const defaultSettings: Settings = {
  count: 5,
  duration: getMsFromMin(25),
  shortBreak: getMsFromMin(5),
  longBreak: getMsFromMin(20),
  hasAutoStart: false,
  alarmSound: AlarmSound.Bell,
  alarmSoundVolume: 0.5,
  tickSound: TickSound.None,
  tickSoundVolume: 0.5,
  allowNotifications: true,
};

/** Count is in pomodoros, durations are in minutes. */
export const minSettingsLimits = {
  count: 2,
  duration: 10,
  shortBreak: 5,
  longBreak: 10,
};

export const maxSettingsLimits = {
  count: 10,
  duration: 120,
  shortBreak: 20,
  longBreak: 40,
};

/** Changing any of these invalidates the running cycle. */
export const sessionSettingKeys: (keyof Settings)[] = ['count', 'duration', 'shortBreak', 'longBreak'];
