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

const _Timer: FC = () => {
  const { settings, session, setSession } = useSettings();

  const {
    countdown: countdownPomodoro,
    percentElapsed: percentElapsedPomodoro,
    startTimer: startPomodoro,
    isPlaying: isPlayingPomodoro,
    pauseTimer: pausePomodoro,
    resetTimer: resetPomodoro,
  } = useCountdown({ milliseconds: settings.duration });

  const {
    countdown: countdownShortBreak,
    percentElapsed: percentElapsedShortBreak,
    startTimer: startShortBreak,
    isPlaying: isPlayingShortBreak,
    pauseTimer: pauseShortBreak,
    resetTimer: resetShortBreak,
  } = useCountdown({ milliseconds: settings.shortBreak });

  const {
    countdown: countdownLongBreak,
    percentElapsed: percentElapsedLongBreak,
    startTimer: startLongBreak,
    isPlaying: isPlayingLongBreak,
    pauseTimer: pauseLongBreak,
    resetTimer: resetLongBreak,
  } = useCountdown({ milliseconds: settings.longBreak });

  useEffect(() => { }, []);

  const onSkipButtonClickHandler = () => {
    if (session.stage === Stage.Pomodoro) {
      resetPomodoro();
      setSession('stage', Stage.ShortBreak);
    } else if (session.stage === Stage.ShortBreak) {
      resetShortBreak();
      if (session.sessionCount >= settings.count) {
        setSession('stage', Stage.LongBreak);
      } else {
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
    } else if (session.stage === Stage.ShortBreak) {
      resetShortBreak();
    } else {
      resetLongBreak();
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

  const getCurrentPercentElapsed = () => {
    if (session.stage === Stage.Pomodoro) {
      return percentElapsedPomodoro;
    } else if (session.stage === Stage.ShortBreak) {
      return percentElapsedShortBreak;
    } else {
      return percentElapsedLongBreak;
    }
  };

  const getCurrentPlaying = () => {
    if (session.stage === Stage.Pomodoro) {
      return isPlayingPomodoro;
    } else if (session.stage === Stage.ShortBreak) {
      return isPlayingShortBreak;
    } else {
      return isPlayingLongBreak;
    }
  };

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="center" pos="relative" w="fit-content" m="auto">
        <ProgressCircle isPlaying={isPlayingPomodoro} fillPercentage={getCurrentPercentElapsed()} />
        <Flex pos="absolute" w="fit-content" flexDirection="column" justifyContent="center" alignItems="center">
          <Text textStyle="text.xl" fontWeight="400" marginBlockEnd="65px">
            {session.sessionCount} {t('of')} {settings.count}
          </Text>
          <Text textStyle="title.lg" marginBlockEnd="35px" minW="340px">
            {formatMilliseconds(getCurrentCountdown())}
          </Text>
          <HStack spacing="20px">
            <ActionButton icon={IconRestart} onClick={onResetButtonClickHandler} />
            <Button variant="circle" size="lg" onClick={onToggleButtonClickHandler}>
              {getCurrentPlaying() ? t('pause') : t('start')}
            </Button>
            <ActionButton icon={IconSkip} onClick={onSkipButtonClickHandler} />
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Timer = chakra(_Timer);
export default Timer;
