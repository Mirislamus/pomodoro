import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TimerDisplayProps } from './types';
import { formatMilliseconds } from '../../utils';
import { animations } from '../../theme/foundations/transitions';

const ONE_HOUR = 60 * 60 * 1000;

const TimerDisplay = ({ stage, countdown, sessionCount, sessionTotal }: TimerDisplayProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Text
        fontWeight="400"
        textStyle={{ base: 'text.lg', md: 'text.xl' }}
        fontVariantNumeric="tabular-nums"
        marginBlockEnd={{ base: '45px', md: '65px' }}
      >
        {sessionCount} {t('of')} {sessionTotal}
      </Text>
      <Text
        // Remounting on stage change replays the entrance animation
        key={stage}
        animation={animations.contentEnter}
        role="timer"
        aria-live="off"
        textStyle={countdown > ONE_HOUR ? 'title.md' : 'title.lg'}
        textAlign="center"
        fontVariantNumeric="tabular-nums"
        w="full"
        marginBlockEnd={{ base: '65px', md: '35px' }}
      >
        {formatMilliseconds(countdown)}
      </Text>
    </>
  );
};

export default TimerDisplay;
