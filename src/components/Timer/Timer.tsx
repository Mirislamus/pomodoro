import { Box, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import useGetStageColor from '../../hooks/useGetStageColor';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import StageSwitcher from '../StageSwitcher/StageSwitcher';
import { t } from 'i18next';
import { Stage } from '../../typings/enums';
import useCountdown from '../../hooks/useCountdown';
import CircleTimer from './CircleTimer';
import formatMilliseconds from '../../utils/formatMilliseconds';

const _Timer: FC = () => {
  const stageColor = useGetStageColor();
  const { settings, setSettings } = useSettings();

  const {
    countdown: countdownPomodoro,
    percentElapsed: percentElapsedPomodoro,
    startTimer: startPomodoro,
  } = useCountdown(settings.duration);

  console.log(formatMilliseconds(countdownPomodoro));

  return (
    <Box marginBlockStart="-50px">
      <StageSwitcher
        mx="auto"
        marginBlockEnd="30px"
        stageColor={stageColor}
        stages={[
          {
            text: t('pomodoro'),
            onClick: () => setSettings('stage', Stage.Pomodoro),
            isActive: settings.stage === Stage.Pomodoro,
          },
          {
            text: t('short_break'),
            onClick: () => setSettings('stage', Stage.ShortBreak),
            isActive: settings.stage === Stage.ShortBreak,
          },
          {
            text: t('long_break'),
            onClick: () => setSettings('stage', Stage.LongBreak),
            isActive: settings.stage === Stage.LongBreak,
          },
        ]}
      />
      {formatMilliseconds(countdownPomodoro)}
      <CircleTimer fillPercentage={percentElapsedPomodoro} stage={settings.stage} />
      <button type="button" onClick={startPomodoro}>
        123
      </button>
    </Box>
  );
};

const Timer = chakra(_Timer);
export default Timer;
