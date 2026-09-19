import { Flex, Text, chakra } from '@chakra-ui/react';
import { StateItemProps } from './types';
import { IconTickLg } from '../../../theme/foundations/icons';
import { ease, easeIn } from '../../../theme/foundations/transitions';
import { useTranslation } from 'react-i18next';
import { Stage } from '../../../typings/enums';

const stageKeyMap: Record<Stage, 'pomodoro' | 'short_break' | 'long_break'> = {
  [Stage.Pomodoro]: 'pomodoro',
  [Stage.ShortBreak]: 'short_break',
  [Stage.LongBreak]: 'long_break',
};

const _StageItem = ({ stage, isActive, onClick, ...props }: StateItemProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      w="100%"
      h="50px"
      px="20px"
      borderRadius="100px"
      alignItems="center"
      justifyContent="space-between"
      transition={ease}
      textTransform="uppercase"
      bgColor={isActive ? 'background.stageItem.active' : 'background.stageItem.default'}
      {...props}
      asChild
    >
      <button onClick={onClick}>
        <Text textStyle="text.md" color={isActive ? 'white' : 'primary'}>
          {t(stageKeyMap[stage] || 'pomodoro')}
        </Text>
        <IconTickLg transition={easeIn} boxSize="24px" color="background.stageItem.tick" isActive={isActive} />
      </button>
    </Flex>
  );
};

const StageItem = chakra(_StageItem);
export default StageItem;
