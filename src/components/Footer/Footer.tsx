import { Box, Button, Flex, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FooterProps } from './types';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import PomodoroTooltip from '../../shared/ui/PomodoroTooltip/PomodoroTooltip';
import { IconClose, IconDark, IconLight, IconNotify, IconSettings } from '../../theme/foundations/icons';
import { animations, ease, easeIn } from '../../theme/foundations/transitions';
import { getElementCenter } from '../../utils';

const _Footer = ({
  isSettings = false,
  colorMode,
  areNotificationsEnabled,
  areNotificationsBlocked,
  onSettingsClick,
  onNotifyClick,
  onColorModeClick,
  ...props
}: FooterProps) => {
  const { t } = useTranslation();
  const isOn = areNotificationsEnabled && !areNotificationsBlocked;
  const notifyLabel = t(
    areNotificationsBlocked ? 'notifications_blocked' : isOn ? 'notification_off' : 'notification_on'
  );
  const colorModeLabel = t(colorMode === 'light' ? 'dark_mode' : 'light_mode');

  return (
    <Flex
      as="footer"
      display={{ base: isSettings ? 'none' : 'flex', md: 'flex' }}
      paddingBlockStart="30px"
      paddingBlockEnd={{ base: 'gap.20', md: 'gap.30' }}
      alignItems="center"
      justifyContent="space-between"
      pos="relative"
      {...props}
    >
      <PomodoroTooltip placement="top-start" label={notifyLabel}>
        {/* Disabled buttons swallow pointer events, the wrapper keeps the tooltip working */}
        <Box>
          <ActionButton
            aria-label={notifyLabel}
            aria-pressed={isOn}
            isDisabled={areNotificationsBlocked}
            variant="fill"
            onClick={onNotifyClick}
          >
            <IconNotify transition={easeIn} boxSize="24px" isActive={!isOn} />
          </ActionButton>
        </Box>
      </PomodoroTooltip>
      <Button minW="150px" className="group" fontWeight="600" onClick={onSettingsClick}>
        {isSettings ? (
          <>
            <IconClose boxSize="24px" animation={animations.iconEnter} />
            {t('close')}
          </>
        ) : (
          <>
            <IconSettings
              _groupFocusVisible={{ transform: 'rotate(90deg)' }}
              _groupHover={{ transform: 'rotate(90deg)' }}
              transition={ease}
              boxSize="24px"
              animation={animations.iconEnter}
            />
            {t('settings')}
          </>
        )}
      </Button>
      <PomodoroTooltip placement="top-end" label={colorModeLabel}>
        <ActionButton
          aria-label={colorModeLabel}
          variant="fill"
          icon={colorMode === 'light' ? IconDark : IconLight}
          onClick={event => onColorModeClick(getElementCenter(event.currentTarget))}
        />
      </PomodoroTooltip>
    </Flex>
  );
};

const Footer = chakra(_Footer);
export default Footer;
