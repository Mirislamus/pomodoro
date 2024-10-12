import { Box, Button, Flex, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { FooterProps } from './types';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { IconClose, IconDark, IconLight, IconNotify, IconSettings } from '../../theme/foundations/icons';
import { t } from 'i18next';
import { ease, easeIn } from '../../theme/foundations/transitions';
import PomodoroTooltip from '../../shared/ui/PomodoroTooltip/PomodoroTooltip';

const _Footer: FC<FooterProps> = ({
  isSettings = false,
  colorMode,
  allowNotification,
  onSettingsClick,
  onNotifyClick,
  onColorModeClick,
  isNotificationDisabled,
  ...props
}) => {
  return (
    <Flex
      as="footer"
      paddingBlockStart="30px"
      paddingBlockEnd={{ base: 'gap.20', md: 'gap.30' }}
      alignItems="center"
      justifyContent="space-between"
      pos="relative"
      {...props}
    >
      <PomodoroTooltip placement="top-start" label={t(allowNotification ? 'notification_off' : 'notification_on')}>
        <Box>
          <ActionButton isDisabled={isNotificationDisabled} variant="fill" onClick={onNotifyClick}>
            <IconNotify transition={easeIn} boxSize="24px" color="primary" isActive={!allowNotification} />
          </ActionButton>
        </Box>
      </PomodoroTooltip>
      <Button minW="150px" role="group" textTransform="uppercase" fontWeight="600" onClick={onSettingsClick}>
        {isSettings ? (
          <>
            <IconClose boxSize="24px" mr="gap.4" />
            {t('close')}
          </>
        ) : (
          <>
            <IconSettings
              _groupFocus={{ transform: 'rotate(90deg)' }}
              _groupHover={{ transform: 'rotate(90deg)' }}
              transition={ease}
              boxSize="24px"
              mr="gap.4"
            />
            {t('settings')}
          </>
        )}
      </Button>
      <PomodoroTooltip placement="top-end" label={t(colorMode === 'light' ? 'dark_mode' : 'light_mode')}>
        <Box>
          <ActionButton variant="fill" icon={colorMode === 'light' ? IconDark : IconLight} onClick={onColorModeClick} />
        </Box>
      </PomodoroTooltip>
    </Flex>
  );
};

const Footer = chakra(_Footer);
export default Footer;
