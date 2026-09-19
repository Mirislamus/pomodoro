import { StageSelectProps } from './types';
import { Flex, Text, chakra } from '@chakra-ui/react';
import { IconChevronDown } from '../../theme/foundations/icons';
import { ease } from '../../theme/foundations/transitions';
import useGetStageColor from '../../hooks/useGetStageColor';
import { getTextColor } from '../../utils';
import { useTranslation } from 'react-i18next';
import { Stage } from '../../typings/enums';

const stageKeyMap: Record<Stage, 'pomodoro' | 'short_break' | 'long_break'> = {
  [Stage.Pomodoro]: 'pomodoro',
  [Stage.ShortBreak]: 'short_break',
  [Stage.LongBreak]: 'long_break',
};

const _StageSelect = ({ stage, isActive = false, onClick, ...props }: StageSelectProps) => {
  const stageColor = useGetStageColor();
  const { t } = useTranslation();

  return (
    <Flex
      w="100%"
      h="50px"
      px="25px"
      alignItems="center"
      justifyContent="space-between"
      bgColor={stageColor}
      borderRadius="100px"
      {...props}
      asChild
    >
      <button onClick={onClick}>
        <Text textTransform="uppercase" textStyle="text.md" color={getTextColor(stage)}>
          {t(stageKeyMap[stage] || 'pomodoro')}
        </Text>
        <IconChevronDown
          transition={ease}
          transform={isActive ? 'scaleY(-1)' : ''}
          w="14px"
          h="8px"
          color={getTextColor(stage)}
        />
      </button>
    </Flex>
  );
};

const StageSelect = chakra(_StageSelect);
export default StageSelect;
