import { Button, Flex, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { FooterProps } from './types';
import ActionButton from '../ui-kit/ActionButton/ActionButton';
import { IconClose, IconDark, IconLight, IconNotify, IconSettings } from '../../theme/foundations/icons';
import { t } from 'i18next';
import { ease } from '../../theme/foundations/transitions';

const _Footer: FC<FooterProps> = ({
  isSettings = false,
  colorMode,
  allowNotify,
  onSettingsClick,
  onNotifyClick,
  onColorModeClick,
  ...props
}) => {
  return (
    <Flex
      as="footer"
      paddingBlockStart="30px"
      paddingBlockEnd={{ base: 'gap.20', md: 'gap.30' }}
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <ActionButton variant="fill" onClick={onNotifyClick}>
        <IconNotify boxSize="24px" color="primary" isActive={allowNotify} />
      </ActionButton>
      <Button role="group" textTransform="uppercase" onClick={onSettingsClick}>
        {isSettings ? (
          <>
            <IconClose boxSize="24px" mr="gap.4" />
            {t('close')}
          </>
        ) : (
          <>
            <IconSettings _groupHover={{ transform: 'rotate(90deg)' }} transition={ease} boxSize="24px" mr="gap.4" />
            {t('settings')}
          </>
        )}
      </Button>
      <ActionButton variant="fill" icon={colorMode === 'light' ? IconDark : IconLight} onClick={onColorModeClick} />
    </Flex>
  );
};

const Footer = chakra(_Footer);
export default Footer;
