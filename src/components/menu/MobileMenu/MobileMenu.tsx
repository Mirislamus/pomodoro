import { Box, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MobileMenuProps } from './types';
import { useSwipeable } from 'react-swipeable';
import { IconChevron } from '../../../theme/foundations/icons';
import CircleButton from '../../ui-kit/CircleButton/CircleButton';
import ColorModeButton from '../../ui-kit/ColorModeButton/ColorModeButton';

const _MobileMenu: FC<MobileMenuProps> = ({
  onClose,
  onLangMenuOpen,
  colorMode,
  onColorModeClick,
  ...rest
}) => {
  const { t, i18n } = useTranslation();

  const handlers = useSwipeable({
    onSwipedRight: () => onClose(),
    delta: 50,
    trackMouse: true,
  });

  return (
    <Drawer placement="right" onClose={onClose} {...rest}>
      <DrawerOverlay />
      <DrawerContent maxW="280px" {...handlers}>
        <DrawerBody
          px="15px"
          py="4px"
          sx={{ button: { borderBottom: '1px solid', borderColor: 'border', py: '16px' } }}
        >
          <CircleButton onClick={onLangMenuOpen}>
            <Text>
              {t('lang')}
              <Box color="grey.3">{t(`${i18n.resolvedLanguage}`)}</Box>
            </Text>
            <IconChevron color="primary" w="7px" h="13px" />
          </CircleButton>
          <ColorModeButton colorMode={colorMode} onClick={onColorModeClick} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const MobileMenu = chakra(_MobileMenu);
export default MobileMenu;
