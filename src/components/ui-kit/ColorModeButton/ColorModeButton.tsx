import { chakra, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ColorModeButtonProps } from './types';
import CircleButton from '../CircleButton/CircleButton';
import { IconDark, IconLight } from '../../../theme/foundations/icons';
import { t } from 'i18next';

const _ColorModeButton: FC<ColorModeButtonProps> = ({ colorMode, onClick, ...props }) => {
  return (
    <CircleButton onClick={onClick} {...props}>
      <Text>{t(`${colorMode === 'light' ? 'dark_mode' : 'light_mode'}`)}</Text>
      <Flex bgColor="button.fill.default" alignItems="center" justifyContent="center" boxSize="36px" borderRadius="50%">
        {colorMode === 'light' ? <IconDark boxSize="20px" /> : <IconLight boxSize="20px" />}
      </Flex>
    </CircleButton>
  );
};

const ColorModeButton = chakra(_ColorModeButton);
export default ColorModeButton;
