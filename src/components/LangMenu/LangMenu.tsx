import { Drawer, Portal, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import { LangMenuProps } from './types';
import LangButton from './LangButton/LangButton';
import useLocales from '../../hooks/useLocales';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { IconArrow, IconClose } from '../../theme/foundations/icons';

const LangMenu = ({ isOpen, onClose, onLocaleChange }: LangMenuProps) => {
  const { t } = useTranslation();
  const locales = useLocales();
  const handlers = useSwipeable({ onSwipedRight: onClose, delta: 50, trackMouse: true });

  return (
    <Drawer.Root open={isOpen} placement="end" lazyMount unmountOnExit onOpenChange={({ open }) => !open && onClose()}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxW={{ base: '100%', md: '300px' }} {...handlers}>
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
              <ActionButton
                aria-label={t('close')}
                size="xs"
                display={{ base: 'none', md: 'flex' }}
                variant="fill"
                icon={IconClose}
                onClick={onClose}
              />
              <ActionButton
                aria-label={t('close')}
                size="xs"
                display={{ base: 'flex', md: 'none' }}
                icon={IconArrow}
                onClick={onClose}
              />
            </Drawer.Header>
            <Drawer.Body p="15px">
              <VStack gap="4px">
                {locales.map(({ id, name, isActive, onSelect }) => (
                  <LangButton
                    key={id}
                    name={name}
                    isActive={isActive}
                    onClick={() => {
                      onClose();
                      onLocaleChange?.();
                      onSelect();
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
