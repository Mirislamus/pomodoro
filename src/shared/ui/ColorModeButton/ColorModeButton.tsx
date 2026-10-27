import { chakra, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ColorModeButtonProps } from './types';
import MenuItemButton from '../MenuItemButton/MenuItemButton';
import { IconDark, IconLight } from '../../../theme/foundations/icons';
import { getElementCenter } from '../../../utils';

const _ColorModeButton = ({ colorMode, onClick, ...props }: ColorModeButtonProps) => {
  const { t } = useTranslation();

  return (
    <MenuItemButton onClick={event => onClick(getElementCenter(event.currentTarget))} {...props}>
      <Text as="span">{t(colorMode === 'light' ? 'dark_mode' : 'light_mode')}</Text>
      <Flex bgColor="button.fill.default" alignItems="center" justifyContent="center" boxSize="36px" borderRadius="50%">
        {colorMode === 'light' ? <IconDark boxSize="20px" /> : <IconLight boxSize="20px" />}
      </Flex>
    </MenuItemButton>
  );
};

const ColorModeButton = chakra(_ColorModeButton);
export default ColorModeButton;
