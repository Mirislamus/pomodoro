import { Box, Drawer, Portal, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import { MobileMenuProps } from './types';
import MenuItemButton from '../../shared/ui/MenuItemButton/MenuItemButton';
import ColorModeButton from '../../shared/ui/ColorModeButton/ColorModeButton';
import { IconChevron } from '../../theme/foundations/icons';
import { DEFAULT_LOCALE, isLocale } from '../../consts/locales';

const MobileMenu = ({ isOpen, onClose, onLangMenuOpen, colorMode, onColorModeClick }: MobileMenuProps) => {
  const { t, i18n } = useTranslation();
  const handlers = useSwipeable({ onSwipedRight: onClose, delta: 50, trackMouse: true });
  const locale = isLocale(i18n.resolvedLanguage) ? i18n.resolvedLanguage : DEFAULT_LOCALE;

  return (
    <Drawer.Root
      open={isOpen}
      placement="end"
      lazyMount
      unmountOnExit
      initialFocusEl={() => null}
      onOpenChange={({ open }) => !open && onClose()}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxW="280px" aria-label={t('menu')} {...handlers}>
            <Drawer.Body px="15px" py="4px">
              <MenuItemButton onClick={onLangMenuOpen}>
                <Text as="span">
                  {t('lang')}
                  <Box as="span" display="block" color="grey.3">
                    {t(locale)}
                  </Box>
                </Text>
                <IconChevron w="7px" h="13px" />
              </MenuItemButton>
              <ColorModeButton colorMode={colorMode} onClick={onColorModeClick} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileMenu;
