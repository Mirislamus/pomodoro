import { AlarmSound, Stage } from './enums';

export type Settings = {
  count: number;
  duration: number;
  shortBreak: number;
  longBreak: number;
  hasAutoStart: boolean;
  alarmSound: AlarmSound;
  allowNotifications: boolean;
};

export type Session = {
  sessionCount: number;
  pomodoroCurrentTime: number;
  shortBrakeCurrentTime: number;
  longBrakeCurrentTime: number;
  stage: Stage;
};
