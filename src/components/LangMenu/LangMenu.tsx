import { Drawer, Portal, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import { LangMenuProps } from './types';
import LangButton from './LangButton/LangButton';
import useGetLocales from '../../hooks/useGetLocales';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { IconArrow, IconClose } from '../../theme/foundations/icons';

const LangMenu = ({ isOpen, onClose }: LangMenuProps) => {
  const { t, i18n } = useTranslation();
  const locales = useGetLocales();
  const handlers = useSwipeable({ onSwipedRight: onClose, delta: 50, trackMouse: true });

  return (
    <Drawer.Root
      open={isOpen}
      placement="end"
      lazyMount
      unmountOnExit
      onOpenChange={({ open }) => !open && onClose()}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            aria-hidden={!isOpen}
            maxW={{ base: '100%', md: '300px' }}
            {...handlers}
          >
            <Drawer.Header
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px"
              borderBottom="1px solid"
              borderColor="border"
            >
              <Drawer.Title asChild>
                <Text
                  color="primary"
                  textStyle="text.xl"
                  pos={{ base: 'absolute', md: 'static' }}
                  left="50%"
                  transform={{ base: 'translateX(-50%)', md: 'none' }}
                >
                  {t('lang_selection')}
                </Text>
              </Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <ActionButton
                  boxSize="40px"
                  display={{ base: 'none', md: 'flex' }}
                  variant="fill"
                  onClick={onClose}
                >
                  <IconClose boxSize="12px" />
                </ActionButton>
              </Drawer.CloseTrigger>
              <ActionButton boxSize="40px" display={{ base: 'flex', md: 'none' }} icon={IconArrow} onClick={onClose} />
            </Drawer.Header>
            <Drawer.Body p="15px">
              <VStack gap="4px">
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
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default LangMenu;
