import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useCountdown from './useCountdown';
import useAlarmSound from './useAlarmSound';
import useTickSound from './useTickSound';
import useLatest from './useLatest';
import useSessionStore from '../stores/useSessionStore';
import useSettingsStore from '../stores/useSettingsStore';
import {
  getNextStage,
  getStageCompleteMessageKey,
  getStageDuration,
  getStageRemainingTime,
  stageConfig,
} from '../consts/stages';
import { Stage } from '../typings/enums';
import { getPercent, requestNotificationPermission } from '../utils';
import { unlockAudio } from '../utils/audio';
import sendNotification from '../utils/sendNotification';

/**
 * Pomodoro cycle state machine: owns the countdown, stage transitions,
 * sounds, notifications and persistence of the remaining time.
 */
const usePomodoroTimer = () => {
  const { t } = useTranslation();
  const settings = useSettingsStore(state => state.settings);
  const session = useSessionStore(state => state.session);
  const patchSession = useSessionStore(state => state.patchSession);
  const resetSession = useSessionStore(state => state.resetSession);
  const alarmSound = useAlarmSound();
  const tickSound = useTickSound();
  const stopTickSound = tickSound.stop;

  const duration = getStageDuration(session.stage, settings);
  const { timeKey } = stageConfig[session.stage];

  const goToStage = (stage: Stage, sessionCount = session.sessionCount) => {
    tickSound.stop();
    patchSession({ [timeKey]: 0, [stageConfig[stage].timeKey]: 0, sessionCount, stage });
    resetTimer(getStageDuration(stage, settings));
  };

  const goToNextStage = () => {
    const next = getNextStage(session, settings);
    goToStage(next.stage, next.sessionCount);
    if (settings.hasAutoStart) {
      startTimer(getStageDuration(next.stage, settings));
    }
    return next;
  };

  const { countdown, isPlaying, startTimer, pauseTimer, resetTimer } = useCountdown({
    maxMilliseconds: duration,
    currentMilliseconds: getStageRemainingTime(session.stage, session),
    onStart: tickSound.play,
    onPause: tickSound.stop,
    onComplete: () => {
      alarmSound.play();
      const next = goToNextStage();
      if (settings.allowNotifications) {
        sendNotification(t(getStageCompleteMessageKey(session.stage, next.stage)));
      }
    },
  });

  // Remaining time is persisted only on pause, tab hide, unload and unmount
  // instead of on every tick, to keep localStorage writes rare.
  const latest = useLatest({ countdown, isPlaying, timeKey });
  useEffect(() => {
    const persist = () => {
      const { isPlaying, countdown, timeKey } = latest.current;
      if (isPlaying) patchSession({ [timeKey]: countdown });
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') persist();
    };

    window.addEventListener('pagehide', persist);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      persist();
      window.removeEventListener('pagehide', persist);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [latest, patchSession]);

  // Durations or the pomodoro count changed (settings, shared link): the running cycle is stale
  const cycleSignature = [settings.count, settings.duration, settings.shortBreak, settings.longBreak].join();
  const cycleSignatureRef = useRef(cycleSignature);
  useEffect(() => {
    if (cycleSignatureRef.current === cycleSignature) return;
    cycleSignatureRef.current = cycleSignature;
    stopTickSound();
    resetTimer(duration);
  }, [cycleSignature, duration, resetTimer, stopTickSound]);

  const toggle = () => {
    unlockAudio();
    if (settings.allowNotifications && 'Notification' in window && Notification.permission === 'default') {
      requestNotificationPermission().catch(() => {});
    }

    if (isPlaying) {
      patchSession({ [timeKey]: countdown });
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const reset = () => {
    tickSound.stop();
    patchSession({ [timeKey]: 0 });
    resetTimer(duration);
  };

  const skip = () => {
    goToNextStage();
  };

  const resetCycle = () => {
    tickSound.stop();
    resetSession();
    resetTimer(settings.duration);
  };

  const selectStage = (stage: Stage) => {
    if (stage !== session.stage) goToStage(stage);
  };

  return {
    stage: session.stage,
    sessionCount: session.sessionCount,
    sessionTotal: settings.count,
    countdown,
    duration,
    progress: getPercent(countdown, duration),
    isPlaying,
    toggle,
    reset,
    skip,
    resetCycle,
    selectStage,
  };
};

export default usePomodoroTimer;
