import { Settings } from '../typings/types';
import { getMsFromMin } from '../utils';

export const defaultSettings: Settings = {
  count: 5,
  duration: getMsFromMin(25),
  shortBreak: getMsFromMin(5),
  longBreak: getMsFromMin(20),
};

export const minSettingsLimits: Settings = {
  count: 2,
  duration: 10,
  shortBreak: 5,
  longBreak: 10,
};

export const maxSettingsLimits: Settings = {
  count: 10,
  duration: 120,
  shortBreak: 20,
  longBreak: 40,
};
