import { Button, Flex, HStack, Text, chakra } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { t } from 'i18next';
import useCountdown from '../../hooks/useCountdown';
import formatMilliseconds from '../../utils/formatMilliseconds';
import ProgressCircle from './ProgressCircle';
import ActionButton from '../ui-kit/ActionButton/ActionButton';
import { IconRestart, IconSkip } from '../../theme/foundations/icons';
import { Stage } from '../../typings/enums';
import useGetStageColor from '../../hooks/useGetStageColor';
import getTextColor from '../../utils/getTextColor';
import getPercent from '../../utils/getPercent';
import StageSwitcher from '../StageSwitcher/StageSwitcher';

const _Timer: FC = () => {
  const { settings, session, setSession } = useSettings();
  const stageColor = useGetStageColor();

  const {
    countdown: countdownPomodoro,
    startTimer: startPomodoro,
    isPlaying: isPlayingPomodoro,
    pauseTimer: pausePomodoro,
    resetTimer: resetPomodoro,
  } = useCountdown({
    maxMilliseconds: settings.duration,
    currentMilliseconds: session.pomodoroCurrentTime,
    onComplete: () => {
      setSession('pomodoroCurrentTime', 0);
      if (session.sessionCount >= settings.count) {
        setSession('stage', Stage.LongBreak);
      } else {
        setSession('stage', Stage.ShortBreak);
      }
    },
  });

  const {
    countdown: countdownShortBreak,
    startTimer: startShortBreak,
    isPlaying: isPlayingShortBreak,
    pauseTimer: pauseShortBreak,
    resetTimer: resetShortBreak,
  } = useCountdown({
    maxMilliseconds: settings.shortBreak,
    currentMilliseconds: session.shortBrakeCurrentTime,
    onComplete: () => {
      setSession('shortBrakeCurrentTime', 0);
      if (session.sessionCount <= settings.count) {
        setSession('sessionCount', session.sessionCount + 1);
        setSession('stage', Stage.Pomodoro);
      }
    },
  });

  const {
    countdown: countdownLongBreak,
    startTimer: startLongBreak,
    isPlaying: isPlayingLongBreak,
    pauseTimer: pauseLongBreak,
    resetTimer: resetLongBreak,
  } = useCountdown({
    maxMilliseconds: settings.longBreak,
    currentMilliseconds: session.longBrakeCurrentTime,
    onComplete: () => {
      setSession('longBrakeCurrentTime', 0);
      setSession('sessionCount', 1);
      setSession('stage', Stage.Pomodoro);
    },
  });

  useEffect(() => {
    if (countdownPomodoro > 0 && isPlayingPomodoro) {
      setSession('pomodoroCurrentTime', countdownPomodoro);
    }
  }, [countdownPomodoro, isPlayingPomodoro]);

  useEffect(() => {
    if (countdownShortBreak > 0 && isPlayingShortBreak) {
      setSession('shortBrakeCurrentTime', countdownShortBreak);
    }
  }, [countdownShortBreak, isPlayingShortBreak]);

  useEffect(() => {
    if (countdownLongBreak > 0 && isPlayingLongBreak) {
      setSession('longBrakeCurrentTime', countdownLongBreak);
    }
  }, [countdownLongBreak, isPlayingLongBreak]);

  const onSkipButtonClickHandler = () => {
    if (session.stage === Stage.Pomodoro) {
      if (session.sessionCount >= settings.count) {
        setSession('stage', Stage.LongBreak);
      } else {
        resetPomodoro();
        setSession('stage', Stage.ShortBreak);
      }
    } else if (session.stage === Stage.ShortBreak) {
      resetShortBreak();
      if (session.sessionCount <= settings.count) {
        setSession('sessionCount', session.sessionCount + 1);
        setSession('stage', Stage.Pomodoro);
      }
    } else {
      resetLongBreak();
      setSession('sessionCount', 1);
      setSession('stage', Stage.Pomodoro);
    }
  };

  const onResetButtonClickHandler = () => {
    if (session.stage === Stage.Pomodoro) {
      resetPomodoro();
      setSession('pomodoroCurrentTime', settings.duration);
    } else if (session.stage === Stage.ShortBreak) {
      resetShortBreak();
      setSession('shortBrakeCurrentTime', settings.shortBreak);
    } else {
      resetLongBreak();
      setSession('longBrakeCurrentTime', settings.longBreak);
    }
  };

  const onToggleButtonClickHandler = () => {
    if (session.stage === Stage.Pomodoro) {
      isPlayingPomodoro ? pausePomodoro() : startPomodoro();
    } else if (session.stage === Stage.ShortBreak) {
      isPlayingShortBreak ? pauseShortBreak() : startShortBreak();
    } else {
      isPlayingLongBreak ? pauseLongBreak() : startLongBreak();
    }
  };

  const getCurrentCountdown = () => {
    if (session.stage === Stage.Pomodoro) {
      return countdownPomodoro;
    } else if (session.stage === Stage.ShortBreak) {
      return countdownShortBreak;
    } else {
      return countdownLongBreak;
    }
  };

  const getCurrentPercent = () => {
    if (session.stage === Stage.Pomodoro) {
      return getPercent(session.pomodoroCurrentTime, settings.duration);
    } else if (session.stage === Stage.ShortBreak) {
      return getPercent(session.shortBrakeCurrentTime, settings.shortBreak);
    } else {
      return getPercent(session.longBrakeCurrentTime, settings.longBreak);
    }
  };

  const getIsCurrentPlaying = () => {
    if (session.stage === Stage.Pomodoro) {
      return isPlayingPomodoro;
    } else if (session.stage === Stage.ShortBreak) {
      return isPlayingShortBreak;
    } else {
      return isPlayingLongBreak;
    }
  };

  const getToggleButtonStyles = () => {
    if (getIsCurrentPlaying()) {
      return {
        bgColor: stageColor,
        color: getTextColor(session.stage),
      };
    }
  };

  return (
    <Flex flexDirection="column" paddingBlockStart="gap.30">
      <StageSwitcher
        pos="absolute"
        top={{ base: 'gap.16', md: 'gap.30' }}
        left="0"
        right="0"
        mx="auto"
        stageColor={stageColor}
        stages={[
          {
            text: t('pomodoro'),
            onClick: () => {
              resetPomodoro();
              setSession('pomodoroCurrentTime', 0);
              setSession('stage', Stage.Pomodoro);
            },
            isActive: session.stage === Stage.Pomodoro,
          },
          {
            text: t('short_break'),
            onClick: () => {
              resetShortBreak();
              setSession('shortBrakeCurrentTime', 0);
              setSession('stage', Stage.ShortBreak);
            },
            isActive: session.stage === Stage.ShortBreak,
          },
          {
            text: t('long_break'),
            onClick: () => {
              resetLongBreak();
              setSession('longBrakeCurrentTime', 0);
              setSession('stage', Stage.LongBreak);
            },
            isActive: session.stage === Stage.LongBreak,
          },
        ]}
        display={{ base: 'none', md: 'flex' }}
      />
      <Flex alignItems="center" justifyContent="center" pos="relative" w="fit-content" m="auto">
        <ProgressCircle isActive={getIsCurrentPlaying()} fillPercentage={getCurrentPercent()} />
        <Flex pos="absolute" w="fit-content" flexDirection="column" justifyContent="center" alignItems="center">
          <Text textStyle="text.xl" fontWeight="400" marginBlockEnd="65px">
            {session.sessionCount} {t('of')} {settings.count}
          </Text>
          <Text textStyle="title.lg" marginBlockEnd="35px" minW="340px">
            {formatMilliseconds(getCurrentCountdown())}
          </Text>
          <HStack spacing="20px">
            <ActionButton icon={IconRestart} onClick={onResetButtonClickHandler} />
            <Button variant="circle" size="lg" sx={getToggleButtonStyles()} onClick={onToggleButtonClickHandler}>
              {getIsCurrentPlaying() ? t('pause') : t('start')}
            </Button>
            <ActionButton icon={IconSkip} isDisabled={!getIsCurrentPlaying()} onClick={onSkipButtonClickHandler} />
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Timer = chakra(_Timer);
export default Timer;
