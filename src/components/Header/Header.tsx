import { Flex, Box, useToken, chakra, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from './types';
import useActiveStage from '../../hooks/useActiveStage';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { IconLang, IconLogo, IconMenu } from '../../theme/foundations/icons';
import { DEFAULT_LOCALE, isLocale } from '../../consts/locales';
import { getLocalizedPath } from '../../utils';
import meta from '../../data/meta';

const _Header = ({ onLangClick, onMenuClick, ...rest }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { color, textColor } = useActiveStage();
  const [stageColor, logoTextColor] = useToken('colors', [color, textColor]);
  const locale = isLocale(i18n.resolvedLanguage) ? i18n.resolvedLanguage : DEFAULT_LOCALE;

  return (
    <Flex as="header" alignItems="center" justifyContent="space-between" {...rest}>
      <Box
        display="inline-flex"
        color="primary"
        borderRadius="10px"
        css={{ '& svg': { maxW: '100%', h: 'auto' } }}
        w={{ base: '100px', md: '116px' }}
        asChild
      >
        <a href={getLocalizedPath(locale)} aria-label={meta.short_name}>
          <IconLogo w="116px" h="50px" pathColor={logoTextColor} stageColor={stageColor} />
        </a>
      </Box>
      <Button display={{ base: 'none', md: 'inline-flex' }} onClick={onLangClick} aria-haspopup="dialog">
        <IconLang />
        {t(locale)}
      </Button>
      <ActionButton
        icon={IconMenu}
        aria-label={t('menu')}
        aria-haspopup="dialog"
        display={{ base: 'flex', md: 'none' }}
        onClick={onMenuClick}
      />
    </Flex>
  );
};

const Header = chakra(_Header);
export default Header;
