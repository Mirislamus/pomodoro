import { Stage } from '../typings/enums';
import { DurationSettingKey, Session, SessionTimeKey, Settings, TranslationKey } from '../typings/types';

interface StageConfig {
  labelKey: TranslationKey;
  /** Accent color token used for the active stage. */
  color: string;
  /** Text color token that stays readable on top of `color`. */
  textColor: string;
  durationKey: DurationSettingKey;
  timeKey: SessionTimeKey;
}

export const STAGES = [Stage.Pomodoro, Stage.ShortBreak, Stage.LongBreak] as const;

export const stageConfig: Record<Stage, StageConfig> = {
  [Stage.Pomodoro]: {
    labelKey: 'pomodoro',
    color: 'accent.red',
    textColor: 'white',
    durationKey: 'duration',
    timeKey: 'pomodoroCurrentTime',
  },
  [Stage.ShortBreak]: {
    labelKey: 'short_break',
    color: 'accent.yellow',
    textColor: 'black.1',
    durationKey: 'shortBreak',
    timeKey: 'shortBreakCurrentTime',
  },
  [Stage.LongBreak]: {
    labelKey: 'long_break',
    color: 'accent.green',
    textColor: 'black.1',
    durationKey: 'longBreak',
    timeKey: 'longBreakCurrentTime',
  },
};

export const getStageDuration = (stage: Stage, settings: Settings): number => settings[stageConfig[stage].durationKey];

export const getStageRemainingTime = (stage: Stage, session: Session): number => session[stageConfig[stage].timeKey];

/** Stage that follows the current one in a classic pomodoro cycle. */
export const getNextStage = (
  { stage, sessionCount }: Session,
  { count }: Settings
): { stage: Stage; sessionCount: number } => {
  if (stage === Stage.Pomodoro) {
    return { stage: sessionCount >= count ? Stage.LongBreak : Stage.ShortBreak, sessionCount };
  }
  if (stage === Stage.ShortBreak) {
    return { stage: Stage.Pomodoro, sessionCount: sessionCount + 1 };
  }
  return { stage: Stage.Pomodoro, sessionCount: 1 };
};

export const getStageCompleteMessageKey = (stage: Stage, nextStage: Stage): TranslationKey => {
  if (stage === Stage.Pomodoro) {
    return nextStage === Stage.LongBreak ? 'pomodoro_notification_long' : 'pomodoro_notification_short';
  }
  return stage === Stage.ShortBreak ? 'short_break_notification' : 'long_break_notification';
};
