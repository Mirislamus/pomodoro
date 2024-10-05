import { AlarmSound, TickSound } from '../typings/enums';
import { getMsFromMin } from '../utils';

export const defaultSettings = {
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
