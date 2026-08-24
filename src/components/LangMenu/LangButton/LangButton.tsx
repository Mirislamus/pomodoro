import { LangButtonProps } from './types';
import { chakra, Fade, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ease } from '../../../theme/foundations/transitions';
import { IconTickLg } from '../../../theme/foundations/icons';

const _LangButton = ({ lang, onClick, isActive, ...rest }: LangButtonProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      as="button"
      w="100%"
      p="15px"
      textAlign="left"
      justifyContent="space-between"
      borderRadius="10px"
      transition={ease}
      onClick={onClick}
      bgColor={isActive ? 'button.fill.default' : 'none'}
      _hover={{
        bgColor: 'button.fill.hover',
      }}
      _active={{
        bgColor: 'button.fill.active',
      }}
      {...rest}
    >
      {t(lang)}
      <Fade in={isActive}>
        <IconTickLg boxSize="24px" color="accent.red" />
      </Fade>
    </Flex>
  );
};

const LangButton = chakra(_LangButton);

export default LangButton;
