import { chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { LangMenuProps } from './types';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LangButton from './LangButton/LangButton';
import { useSwipeable } from 'react-swipeable';
import useGetLocales from '../../hooks/useGetLocales';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { IconArrow } from '../../theme/foundations/icons';

const _LangMenu: FC<LangMenuProps> = ({ onClose, ...rest }) => {
  const { t, i18n } = useTranslation();
  const locales = useGetLocales();

  const handlers = useSwipeable({
    onSwipedRight: () => onClose(),
    delta: 50,
    trackMouse: true,
  });

  return (
    <Drawer placement="right" onClose={onClose} {...rest}>
      <DrawerOverlay />
      <DrawerContent maxW={{ base: '100%', md: '300px' }} {...handlers}>
        <DrawerHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="15px"
          borderBottom="1px solid"
          borderColor="border"
        >
          <Text
            color="primary"
            textStyle="text.xl"
            pos={{ base: 'absolute', md: 'static' }}
            left="50%"
            transform={{ base: 'translateX(-50%)', md: 'none' }}
          >
            {t('lang_selection')}
          </Text>
          <DrawerCloseButton display={{ base: 'none', md: 'flex' }} />
          <ActionButton boxSize="40px" display={{ base: 'flex', md: 'none' }} icon={IconArrow} onClick={onClose} />
        </DrawerHeader>
        <DrawerBody p="15px">
          <VStack spacing="4px">
            {Object.entries(locales).map(([key, { id, name, onChangeLang }]) => (
              <LangButton
                key={key}
                lang={name}
                isActive={i18n.resolvedLanguage === id}
                onClick={() => {
                  onClose();
                  onChangeLang();
                }}
              />
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const LangMenu = chakra(_LangMenu);
export default LangMenu;
