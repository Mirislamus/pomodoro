import { Flex, Text, chakra } from '@chakra-ui/react';
import { StateItemProps } from './types';
import { IconTickLg } from '../../../theme/foundations/icons';
import { ease, easeIn } from '../../../theme/foundations/transitions';

const _StageItem = ({ stage, isActive, onClick, ...props }: StateItemProps) => {
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
        <Text textStyle="text.md" color={isActive ? 'white' : 'primary'}>{`${stage}`}</Text>
        <IconTickLg transition={easeIn} boxSize="24px" color="background.stageItem.tick" isActive={isActive} />
      </button>
    </Flex>
  );
};

const StageItem = chakra(_StageItem);
export default StageItem;
