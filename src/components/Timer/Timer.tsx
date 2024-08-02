import { Button, Flex, HStack, Text, chakra, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { t } from 'i18next';
import useCountdown from '../../hooks/useCountdown';
import { formatMilliseconds } from '../../utils';
import ProgressCircle from './ProgressCircle';
import ActionButton from '../ui-kit/ActionButton/ActionButton';
import { IconRestart, IconSkip } from '../../theme/foundations/icons';
import { AlarmSound, Stage } from '../../typings/enums';
import useGetStageColor from '../../hooks/useGetStageColor';
import { getTextColor } from '../../utils';
import { getPercent } from '../../utils';
import StageSwitcher from '../StageSwitcher/StageSwitcher';
import { useSession } from '../../contexts/SessionContext/SessionContext';
import StageSelect from '../StageSelect/StageSelect';
import StageModal from '../StageModal/StageModal';

const _Timer: FC = () => {
  const { settings } = useSettings();
  const { session, setSession, resetSession } = useSession();
  const stageColor = useGetStageColor();
  const {
    isOpen: isStageModalOpen,
    onClose: onStageModalClose,
    onOpen: onStageModalOpen,
  } = useDisclosure();

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
        if (settings.hasAutoStart) {
          startLongBreak();
        }
      } else {
        setSession('stage', Stage.ShortBreak);
        if (settings.hasAutoStart) {
          startShortBreak();
        }
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
        if (settings.hasAutoStart) {
          startPomodoro();
        }
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
      resetSession();
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

  useEffect(() => {
    setAudio(`/sounds/${AlarmSound.Bell}.mp3`);
  }, []);

  const onSkipButtonClickHandler = () => {
    if (session.stage === Stage.Pomodoro) {
      resetPomodoro();
      if (session.sessionCount >= settings.count) {
        setSession('stage', Stage.LongBreak);
      } else {
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

  const getTitleStyle = () => {
    if (getCurrentCountdown() > 60 * 60 * 1000) {
      return 'title.md';
    }
    return 'title.lg';
  };

  const stages = [
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
  ];

  return (
    <Flex flexDirection="column" paddingBlockStart={{ md: '170px', lg: 'gap.30' }}>
      <StageSwitcher
        left="0"
        right="0"
        mx="auto"
        stageColor={stageColor}
        pos={{ md: 'absolute' }}
        top={{ base: '140px', lg: 'gap.30' }}
        stages={stages}
        display={{ base: 'none', md: 'flex' }}
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
        <ProgressCircle isActive={getIsCurrentPlaying()} fillPercentage={getCurrentPercent()} />
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
            {formatMilliseconds(getCurrentCountdown())}
          </Text>
          <HStack
            spacing="20px"
            justifyContent="center"
            left="0"
            right="0"
            bottom="-96px"
            pos={{ base: 'absolute', md: 'static' }}
          >
            <ActionButton icon={IconRestart} onClick={onResetButtonClickHandler} />
            <Button
              variant="circle"
              size="lg"
              sx={getToggleButtonStyles()}
              onClick={onToggleButtonClickHandler}
            >
              {getIsCurrentPlaying() ? t('pause') : t('start')}
            </Button>
            <ActionButton
              icon={IconSkip}
              isDisabled={!getIsCurrentPlaying()}
              onClick={onSkipButtonClickHandler}
            />
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Timer = chakra(_Timer);
export default Timer;
function setAudio(arg0: string) {
  throw new Error('Function not implemented.');
}
