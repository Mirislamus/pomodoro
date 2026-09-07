import { Box, Drawer, Portal, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import { MobileMenuProps } from './types';
import CircleButton from '../../shared/ui/CircleButton/CircleButton';
import { IconChevron } from '../../theme/foundations/icons';
import ColorModeButton from '../../shared/ui/ColorModeButton/ColorModeButton';

const MobileMenu = ({ isOpen, onClose, onLangMenuOpen, colorMode, onColorModeClick }: MobileMenuProps) => {
  const { t, i18n } = useTranslation();
  const handlers = useSwipeable({ onSwipedRight: onClose, delta: 50, trackMouse: true });

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
          <Drawer.Content maxW="280px" {...handlers}>
            <Drawer.Body
              px="15px"
              py="4px"
              css={{
                '& button': {
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  py: '16px',
                },
              }}
            >
              <CircleButton onClick={onLangMenuOpen}>
                <Text>
                  {t('lang')}
                  <Box color="grey.3">{t(`${i18n.resolvedLanguage}`)}</Box>
                </Text>
                <IconChevron color="primary" w="7px" h="13px" />
              </CircleButton>
              <ColorModeButton colorMode={colorMode} onClick={onColorModeClick} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileMenu;
