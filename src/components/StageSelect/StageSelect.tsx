import { Flex, Text, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { StageSelectProps } from './types';
import { IconChevronDown } from '../../theme/foundations/icons';
import { ease } from '../../theme/foundations/transitions';
import { stageConfig } from '../../consts/stages';

const _StageSelect = ({ stage, isOpen = false, onClick, ...props }: StageSelectProps) => {
  const { t } = useTranslation();
  const { color, textColor, labelKey } = stageConfig[stage];

  return (
    <Flex
      w="100%"
      h="50px"
      px="25px"
      alignItems="center"
      justifyContent="space-between"
      bgColor={color}
      color={textColor}
      borderRadius="100px"
      transition={ease}
      _active={{ transform: 'scale(0.98)' }}
      {...props}
      asChild
    >
      <button type="button" aria-haspopup="dialog" aria-expanded={isOpen} onClick={onClick}>
        <Text as="span" textTransform="uppercase" textStyle="text.md">
          {t(labelKey)}
        </Text>
        <IconChevronDown transition={ease} transform={isOpen ? 'scaleY(-1)' : undefined} w="14px" h="8px" />
      </button>
    </Flex>
  );
};

const StageSelect = chakra(_StageSelect);
export default StageSelect;
