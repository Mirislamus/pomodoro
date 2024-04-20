import { FC } from 'react';
import { StageSelectProps } from './types';
import { Flex, Text, chakra } from '@chakra-ui/react';
import { IconChevronDown } from '../../theme/foundations/icons';
import { ease } from '../../theme/foundations/transitions';
import useGetStageColor from '../../hooks/useGetStageColor';
import getTextColor from '../../utils/getTextColor';

const _StageSelect: FC<StageSelectProps> = ({ stage, isActive = false, onClick, ...props }) => {
  const stageColor = useGetStageColor();

  return (
    <Flex
      w="100%"
      h="50px"
      px="25px"
      alignItems="center"
      justifyContent="space-between"
      bgColor={stageColor}
      borderRadius="100px"
      as="button"
      onClick={onClick}
      {...props}
    >
      <Text textTransform="uppercase" textStyle="text.md" color={getTextColor(stage)}>{`${stage}`}</Text>
      <IconChevronDown
        transition={ease}
        transform={isActive ? 'scaleY(-1)' : ''}
        w="14px"
        h="8px"
        color={getTextColor(stage)}
      />
    </Flex>
  );
};

const StageSelect = chakra(_StageSelect);
export default StageSelect;
