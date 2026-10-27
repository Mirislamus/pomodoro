import { Flex, Text, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { StageItemProps } from './types';
import { IconTickLg } from '../../../theme/foundations/icons';
import { ease, easeIn } from '../../../theme/foundations/transitions';
import { stageConfig } from '../../../consts/stages';

const _StageItem = ({ stage, isActive = false, onClick, ...props }: StageItemProps) => {
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
      _hover={isActive ? undefined : { bgColor: 'button.fill.hover' }}
      {...props}
      asChild
    >
      <button type="button" aria-pressed={isActive} onClick={onClick}>
        <Text as="span" textStyle="text.md" color={isActive ? 'white' : 'primary'}>
          {t(stageConfig[stage].labelKey)}
        </Text>
        <IconTickLg transition={easeIn} boxSize="24px" color="background.stageItem.tick" isActive={isActive} />
      </button>
    </Flex>
  );
};

const StageItem = chakra(_StageItem);
export default StageItem;
