import { Box, Button, Flex, Tabs, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useLatest from '../hooks/useLatest';
import { animations, easeIn, easeOutQuint } from '../theme/foundations/transitions';
import { IconClose, IconCopy } from '../theme/foundations/icons';
import { useCopySettingsLink } from '../hooks/useSettingsLink';
import useSettingsStore from '../stores/useSettingsStore';
import useSessionStore from '../stores/useSessionStore';
import Scroll from '../shared/ui/Scroll/Scroll';
import ActionButton from '../shared/ui/ActionButton/ActionButton';
import PomodoroTooltip from '../shared/ui/PomodoroTooltip/PomodoroTooltip';
import TimerSettings from '../components/TimerSettings/TimerSettings';
import SoundSettings from '../components/SoundSettings/SoundSettings';

interface SettingsViewProps {
  hidden?: boolean;
  onClose: () => void;
}

const SettingsView = ({ hidden = false, onClose }: SettingsViewProps) => {
  const { t } = useTranslation();
  const resetSettings = useSettingsStore(state => state.resetSettings);
  const resetSession = useSessionStore(state => state.resetSession);
  const copySettingsLink = useCopySettingsLink();
  const onCloseRef = useLatest(onClose);

  useEffect(() => {
    if (hidden) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      // Open menus and dialogs handle Escape themselves
      if (document.querySelector('[role="menu"][data-state="open"], [role="dialog"][data-state="open"]')) return;
      onCloseRef.current();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hidden, onCloseRef]);

  const handleReset = () => {
    resetSession();
    resetSettings();
  };

  return (
    <Box
      as="section"
      aria-label={t('settings')}
      // Kept mounted while hidden; the entrance animation replays each time it is shown
      display={hidden ? 'none' : undefined}
      w="100%"
      pos={{ base: 'fixed', md: 'static' }}
      zIndex="25"
      inset="0"
      marginBlockStart={{ base: '0', md: '50px', lg: '-5px', xl: '-50px' }}
      marginBlockEnd="auto"
      mx="auto"
      maxW={{ base: '100%', md: '550px' }}
      borderRadius={{ base: '0', md: '30px' }}
      boxShadow="0px 0px 50px rgba(0, 0, 0, 0.1)"
      bgColor="background.settings"
      transition={easeIn}
      animation={{ base: animations.sheetEnter, md: animations.panelEnter }}
    >
      <Scroll maxScrollHeight={{ base: '100%', md: 'unset' }}>
        <Flex flexDirection="column" p={{ base: '16px', md: '40px' }}>
          <Flex
            display={{ base: 'flex', md: 'none' }}
            alignItems="center"
            justifyContent="space-between"
            paddingBlockEnd="16px"
          >
            <Text as="h2" textStyle="text.xl" textTransform="uppercase" color="primary">
              {t('settings')}
            </Text>
            <ActionButton aria-label={t('close')} size="xs" variant="fill" onClick={onClose}>
              <IconClose boxSize="20px" />
            </ActionButton>
          </Flex>
          <Tabs.Root variant="soft-rounded" defaultValue="timer" lazyMount>
            <Tabs.List>
              <Tabs.Trigger value="timer">{t('timer')}</Tabs.Trigger>
              <Tabs.Trigger value="sounds">{t('sounds')}</Tabs.Trigger>
              <Tabs.Indicator
                top="3px"
                height={{ base: '44px', md: '50px' }}
                bgColor="background.primary"
                borderRadius="100px"
                transition={`all 0.4s ${easeOutQuint}`}
              />
            </Tabs.List>
            <Box
              paddingBlockStart={{ base: '20px', md: '30px' }}
              marginBlockStart={{ base: '20px', md: '0' }}
              borderBlockStart={{ base: '1px solid', md: '0' }}
              borderColor="border"
            >
              <Tabs.Content value="timer">
                <TimerSettings />
              </Tabs.Content>
              <Tabs.Content value="sounds">
                <SoundSettings />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
          <Flex w="100%" justifyContent="space-between" gap="20px" alignItems="center" paddingBlockStart="30px">
            <Button flex="1" minW="0" variant="secondary" size="md" onClick={handleReset}>
              {t('reset_settings')}
            </Button>
            <PomodoroTooltip label={t('copy_settings')}>
              <ActionButton
                aria-label={t('copy_settings')}
                size="lg"
                variant="fill"
                icon={IconCopy}
                onClick={copySettingsLink}
              />
            </PomodoroTooltip>
          </Flex>
        </Flex>
      </Scroll>
    </Box>
  );
};

export default SettingsView;
