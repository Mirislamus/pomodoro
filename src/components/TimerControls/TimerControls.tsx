import { Box, Button, HStack, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TimerControlsProps } from './types';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import PomodoroTooltip from '../../shared/ui/PomodoroTooltip/PomodoroTooltip';
import { IconRestart, IconSkip } from '../../theme/foundations/icons';
import { animations, ease } from '../../theme/foundations/transitions';
import { stageConfig } from '../../consts/stages';

const _TimerControls = ({ stage, isPlaying, onToggle, onReset, onSkip, onResetCycle, ...rest }: TimerControlsProps) => {
  const { t } = useTranslation();
  const { color, textColor } = stageConfig[stage];

  return (
    <HStack gap="20px" justifyContent="center" {...rest}>
      <PomodoroTooltip label={t('reset_current_step')}>
        <ActionButton
          css={{
            '& svg': { transition: ease },
            _hover: { '& svg': { transform: 'rotate(90deg)' } },
          }}
          icon={IconRestart}
          onClick={onReset}
          aria-label={t('reset_current_step')}
        />
      </PomodoroTooltip>
      <Box pos="relative" display="flex" justifyContent="center">
        <PomodoroTooltip label={t('skip_all_steps')}>
          <Button
            variant="ghost"
            size="xs"
            h={{ base: '26px', md: '22px' }}
            px={{ base: '12px', md: '10px' }}
            fontSize="11px"
            fontWeight="600"
            letterSpacing="0.08em"
            pos="absolute"
            top={{ base: '-32px', md: '-30px' }}
            left="50%"
            transform="translateX(-50%)"
            color="secondary"
            whiteSpace="nowrap"
            zIndex="2"
            // Extends the hit area beyond the small visual pill
            _before={{ content: '""', pos: 'absolute', inset: '-6px -8px' }}
            _hover={{ color: 'primary', bgColor: 'button.fill.hover' }}
            _active={{ color: 'primary', bgColor: 'button.fill.active', transform: 'translateX(-50%) scale(0.96)' }}
            onClick={onResetCycle}
            aria-label={t('skip_all_steps')}
          >
            {t('skip')}
          </Button>
        </PomodoroTooltip>
        <Button
          variant="circle"
          size="lg"
          bgColor={isPlaying ? color : undefined}
          color={isPlaying ? textColor : undefined}
          onClick={onToggle}
        >
          <chakra.span key={String(isPlaying)} animation={animations.contentEnter}>
            {isPlaying ? t('pause') : t('start')}
          </chakra.span>
        </Button>
      </Box>
      <PomodoroTooltip label={t('skip_current_step')}>
        <ActionButton icon={IconSkip} onClick={onSkip} aria-label={t('skip_current_step')} />
      </PomodoroTooltip>
    </HStack>
  );
};

const TimerControls = chakra(_TimerControls);
export default TimerControls;
