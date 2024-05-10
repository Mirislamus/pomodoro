import { AlarmSound } from '../typings/enums';
import { getMsFromMin } from '../utils';

export const defaultSettings = {
  count: 2,
  duration: getMsFromMin(0.1),
  shortBreak: getMsFromMin(0.2),
  longBreak: getMsFromMin(0.3),
  hasAutoStart: true,
  alarmSound: AlarmSound.Bell,
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
