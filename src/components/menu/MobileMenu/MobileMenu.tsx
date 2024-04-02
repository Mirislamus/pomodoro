import { Box, chakra, Flex, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MobileMenuProps } from './types';
import { useSwipeable } from 'react-swipeable';
import { IconChevron, IconDark, IconLight } from '../../../theme/foundations/icons';
import MobileMenuButton from './MobileMenuButton/MobileMenuButton';

const _MobileMenu: FC<MobileMenuProps> = ({ onClose, onLangMenuOpen, ...rest }) => {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();

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
          <MobileMenuButton onClick={onLangMenuOpen}>
            <Text>
              {t('lang')}
              <Box color="grey.3">{t(`${i18n.resolvedLanguage}`)}</Box>
            </Text>
            <IconChevron color="primary" w="7px" h="13px" />
          </MobileMenuButton>
          <MobileMenuButton onClick={toggleColorMode}>
            <Text>{t(`${colorMode === 'light' ? 'dark_mode' : 'light_mode'}`)}</Text>
            <Flex
              bgColor="button.fill.default"
              alignItems="center"
              justifyContent="center"
              boxSize="36px"
              borderRadius="50%"
            >
              {colorMode === 'light' ? <IconDark boxSize="20px" /> : <IconLight boxSize="20px" />}
            </Flex>
          </MobileMenuButton>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const MobileMenu = chakra(_MobileMenu);
export default MobileMenu;
