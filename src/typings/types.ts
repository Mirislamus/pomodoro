import { AlarmSound, Stage, TickSound } from './enums';

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

export type Session = {
  sessionCount: number;
  pomodoroCurrentTime: number;
  shortBrakeCurrentTime: number;
  longBrakeCurrentTime: number;
  stage: Stage;
};

export type Sound = {
  id: AlarmSound | TickSound;
  name: string;
  onClick: () => void;
};
