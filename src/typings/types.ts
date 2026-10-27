import { AlarmSound, Stage, TickSound } from './enums';
import type en from '../localization/locales/en';

export type TranslationKey = keyof typeof en;

export type Translation = Record<TranslationKey, string>;

export type Settings = {
  count: number;
  duration: number;
  shortBreak: number;
  longBreak: number;
  hasAutoStart: boolean;
  alarmSound: AlarmSound;
  alarmSoundVolume: number;
  tickSound: TickSound;
  tickSoundVolume: number;
  allowNotifications: boolean;
};

export type DurationSettingKey = 'duration' | 'shortBreak' | 'longBreak';

export type Session = {
  sessionCount: number;
  pomodoroCurrentTime: number;
  shortBreakCurrentTime: number;
  longBreakCurrentTime: number;
  stage: Stage;
};

export type SessionTimeKey = 'pomodoroCurrentTime' | 'shortBreakCurrentTime' | 'longBreakCurrentTime';

export type Sound<T extends AlarmSound | TickSound = AlarmSound | TickSound> = {
  id: T;
  name: string;
  onClick: () => void;
};
