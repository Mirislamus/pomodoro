import { FC } from 'react';
import { LangButtonProps } from './types';
import { chakra, Fade, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IconTickLg } from '../../../../theme/foundations/icons';
import { ease } from '../../../../theme/foundations/transitions';

const _LangButton: FC<LangButtonProps> = ({ lang, onClick, isActive, ...rest }) => {
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
      bgColor={isActive ? 'background.button.default' : 'none'}
      _hover={{
        bgColor: 'background.button.hover',
      }}
      _focusVisible={{
        bgColor: 'background.button.focus',
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
