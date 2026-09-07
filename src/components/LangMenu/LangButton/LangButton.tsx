import { LangButtonProps } from './types';
import { chakra, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ease } from '../../../theme/foundations/transitions';
import { IconTickLg } from '../../../theme/foundations/icons';

const _LangButton = ({ lang, onClick, isActive, ...rest }: LangButtonProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      w="100%"
      p="15px"
      textAlign="left"
      justifyContent="space-between"
      borderRadius="10px"
      transition={ease}
      bgColor={isActive ? 'button.fill.default' : 'none'}
      _hover={{
        bgColor: 'button.fill.hover',
      }}
      _active={{
        bgColor: 'button.fill.active',
      }}
      {...rest}
      asChild
    >
      <button onClick={onClick}>
        {t(lang)}
        <Flex opacity={isActive ? 1 : 0} transition={ease}>
          <IconTickLg boxSize="24px" color="accent.red" />
        </Flex>
      </button>
    </Flex>
  );
};

const LangButton = chakra(_LangButton);

export default LangButton;
