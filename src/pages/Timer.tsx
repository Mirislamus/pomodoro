import { Box, Button, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { t } from 'i18next';
import useCountdown from '../hooks/useCountdown';
import { formatMilliseconds, requestNotificationPermission, getTextColor, getPercent } from '../utils';
import { ease } from '../theme/foundations/transitions';
import sendNotification from '../utils/sendNotification';
import PomodoroTooltip from '../shared/ui/PomodoroTooltip/PomodoroTooltip';
import ProgressCircle from '../components/ProgressCircle/ProgressCircle';
import ActionButton from '../shared/ui/ActionButton/ActionButton';
import { IconRestart, IconSkip } from '../theme/foundations/icons';
import { Stage, TickSound } from '../typings/enums';
import useGetStageColor from '../hooks/useGetStageColor';
import useTickSound from '../hooks/useTickSound';
import StageSwitcher from '../components/StageSwitcher/StageSwitcher';
import StageSelect from '../components/StageSelect/StageSelect';
import useAlarmSound from '../hooks/useAlarmSound';
import StageModal from '../components/StageModal/StageModal';
import useSessionStore from '../stores/useSessionStore';
import useSettingsStore from '../stores/useSettingsStore';

const Timer = () => {
  const stageColor = useGetStageColor();
  const settings = useSettingsStore(state => state.settings);
  const { play: playAlarmSound } = useAlarmSound();
  const { play: playTickSound, stop: stopTickSound, pause: pauseTickSound } = useTickSound();
  const allowTickSound = settings.tickSound !== TickSound.None;

  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const resetSession = useSessionStore(state => state.resetSession);

  const alarmAndTickSoundControl = () => {
    playAlarmSound();
    if (allowTickSound) {
      stopTickSound();
    }
  };

  const { isOpen: isStageModalOpen, onClose: onStageModalClose, onOpen: onStageModalOpen } = useDisclosure();

  const getStageMaxTime = () => {
    if (session.stage === Stage.Pomodoro) return settings.duration;
    if (session.stage === Stage.ShortBreak) return settings.shortBreak;
    return settings.longBreak;
  };

  const getStageCurrentTime = () => {
    if (session.stage === Stage.Pomodoro) return session.pomodoroCurrentTime;
    if (session.stage === Stage.ShortBreak) return session.shortBrakeCurrentTime;
    return session.longBrakeCurrentTime;
  };

  const setStageCurrentTime = (time: number) => {
    if (session.stage === Stage.Pomodoro) setSession('pomodoroCurrentTime', time);
    else if (session.stage === Stage.ShortBreak) setSession('shortBrakeCurrentTime', time);
    else setSession('longBrakeCurrentTime', time);
  };

  const { countdown, startTimer, isPlaying, pauseTimer, resetTimer } = useCountdown({
    maxMilliseconds: getStageMaxTime(),
    currentMilliseconds: getStageCurrentTime(),
    onStart: () => playTickSound(),
    onPause: () => {
      pauseTickSound();
    },
    onComplete: () => {
      alarmAndTickSoundControl();
      setStageCurrentTime(0);

      if (session.stage === Stage.Pomodoro) {
        if (session.sessionCount >= settings.count) {
          sendNotification({ body: t('pomodoro_notification_long') });
          setSession('stage', Stage.LongBreak);
        } else {
          sendNotification({ body: t('pomodoro_notification_short') });
          setSession('stage', Stage.ShortBreak);
        }
      } else if (session.stage === Stage.ShortBreak) {
        if (session.sessionCount <= settings.count) {
          setSession('sessionCount', session.sessionCount + 1);
          setSession('stage', Stage.Pomodoro);
          sendNotification({ body: t('short_break_notification') });
        }
      } else {
        resetSession();
        setSession('stage', Stage.Pomodoro);
        sendNotification({ body: t('long_break_notification') });
      }

      // Auto start handled by watching stage change if setting enabled
    },
  });

  // Handle auto-start when stage changes
  const prevStageRef = useRef(session.stage);
  useEffect(() => {
    if (prevStageRef.current !== session.stage) {
      prevStageRef.current = session.stage;
      if (settings.hasAutoStart && getStageCurrentTime() === 0) {
        // Auto start on stage change
        setTimeout(() => startTimer(), 100);
      }
    }
  }, [session.stage, settings.hasAutoStart, startTimer]);

  // Persist current time to Zustand only on unmount or visibility hidden
  // This drastically reduces LocalStorage writes compared to ticking every second
  const countdownRef = useRef(countdown);
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isPlaying) {
        setStageCurrentTime(countdownRef.current);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isPlaying) {
        setStageCurrentTime(countdownRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Also save on unmount just in case
      if (isPlaying) {
        setStageCurrentTime(countdownRef.current);
      }
    };
  }, [isPlaying, session.stage]); // Re-bind if stage changes

  // Also persist on manual pause
  const handlePause = () => {
    setStageCurrentTime(countdownRef.current);
    pauseTimer();
  };

  const onSkipButtonClickHandler = () => {
    stopTickSound();
    resetTimer(0);
    if (session.stage === Stage.Pomodoro) {
      if (session.sessionCount >= settings.count) {
        setSession('stage', Stage.LongBreak);
      } else {
        setSession('stage', Stage.ShortBreak);
      }
    } else if (session.stage === Stage.ShortBreak) {
      if (session.sessionCount <= settings.count) {
        setSession('sessionCount', session.sessionCount + 1);
        setSession('stage', Stage.Pomodoro);
      }
    } else {
      resetSession();
      setSession('sessionCount', 1);
      setSession('stage', Stage.Pomodoro);
    }
  };

  const onResetButtonClickHandler = () => {
    stopTickSound();
    setStageCurrentTime(0);
    resetTimer(getStageMaxTime());
  };

  const onToggleButtonClickHandler = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      requestNotificationPermission();
    }
    if (isPlaying) { handlePause(); } else { startTimer(); }
  };

  const getCurrentPercent = () => {
    return getPercent(countdown, getStageMaxTime());
  };

  const getToggleButtonStyles = () => {
    if (isPlaying) {
      return {
        bgColor: stageColor,
        color: getTextColor(session.stage),
      };
    }
  };

  const getTitleStyle = () => {
    if (countdown > 60 * 60 * 1000) {
      return 'title.md';
    }
    return 'title.lg';
  };

  const stages = [
    {
      text: t('pomodoro'),
      onClick: () => {
        stopTickSound();
        resetTimer(settings.duration);
        setSession('pomodoroCurrentTime', 0);
        setSession('stage', Stage.Pomodoro);
      },
      isActive: session.stage === Stage.Pomodoro,
    },
    {
      text: t('short_break'),
      onClick: () => {
        stopTickSound();
        resetTimer(settings.shortBreak);
        setSession('shortBrakeCurrentTime', 0);
        setSession('stage', Stage.ShortBreak);
      },
      isActive: session.stage === Stage.ShortBreak,
    },
    {
      text: t('long_break'),
      onClick: () => {
        stopTickSound();
        resetTimer(settings.longBreak);
        setSession('longBrakeCurrentTime', 0);
        setSession('stage', Stage.LongBreak);
      },
      isActive: session.stage === Stage.LongBreak,
    },
  ];

  return (
    <Flex flexDirection="column" paddingBlockStart={{ md: '170px', lg: 'gap.30' }}>
      <StageSwitcher
        left="0"
        right="0"
        mx="auto"
        pos={{ md: 'absolute' }}
        top={{ base: '140px', lg: 'gap.30' }}
        display={{ base: 'none', md: 'flex' }}
        stageColor={stageColor}
        stages={stages}
      />
      <StageSelect
        display={{ base: 'flex', md: 'none' }}
        maxW="328px"
        mx="auto"
        marginBlockStart="gap.20"
        marginBlockEnd="gap.16"
        isActive={true}
        stage={session.stage}
        onClick={onStageModalOpen}
      />
      <StageModal isOpen={isStageModalOpen} onClose={onStageModalClose} />
      <Flex
        alignItems="center"
        justifyContent="center"
        pos="relative"
        w="fit-content"
        m="auto"
        paddingBlockEnd={{ base: '96px', md: '0' }}
      >
        <ProgressCircle isActive={isPlaying} fillPercentage={getCurrentPercent()} />
        <Flex
          pos="absolute"
          w="fit-content"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxSize={{ base: '300px', md: '500px' }}
        >
          <Text
            fontWeight="400"
            textStyle={{ base: 'text.lg', md: 'text.xl' }}
            marginBlockEnd={{ base: '45px', md: '65px' }}
          >
            {session.sessionCount} {t('of')} {settings.count}
          </Text>
          <Text
            textStyle={getTitleStyle()}
            minW={{ base: '200px', md: '340px' }}
            marginBlockEnd={{ base: '65px', md: '35px' }}
          >
            {formatMilliseconds(countdown)}
          </Text>
          <HStack
            spacing="20px"
            justifyContent="center"
            left="0"
            right="0"
            bottom="-96px"
            pos={{ base: 'absolute', md: 'static' }}
          >
            <PomodoroTooltip label={t('reset_current_step')}>
              <Box>
                <ActionButton
                  sx={{
                    svg: {
                      transition: ease,
                    },
                    _hover: {
                      svg: {
                        transform: 'rotate(90deg)',
                      },
                    },
                  }}
                  icon={IconRestart}
                  onClick={onResetButtonClickHandler}
                />
              </Box>
            </PomodoroTooltip>
            <Button variant="circle" size="lg" sx={getToggleButtonStyles()} onClick={onToggleButtonClickHandler}>
              {isPlaying ? t('pause') : t('start')}
            </Button>
            <PomodoroTooltip {...(isPlaying ? { label: t('skip_current_step') } : {})}>
              <Box>
                <ActionButton icon={IconSkip} onClick={onSkipButtonClickHandler} />
              </Box>
            </PomodoroTooltip>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Timer;
