import { FC } from 'react';
import { HeaderProps } from './types';
import { Flex, Box, useToken, chakra, Button } from '@chakra-ui/react';
import useGetStageColor from '../../hooks/useGetStageColor';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { IconLang, IconLogo, IconMenu } from '../../theme/foundations/icons';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getTextColor } from '../../utils';
import useSessionStore from '../../stores/useSessionStore';

const _Header: FC<HeaderProps> = ({ onLangClick, onMenuClick, ...rest }) => {
  const stageColor = useGetStageColor();
  const session = useSessionStore(state => state.session);
  const [currentStageColor] = useToken('colors', [stageColor]);
  const { t } = useTranslation();

  return (
    <Flex as="header" alignItems="center" justifyContent="space-between" {...rest}>
      <Box
        as={Link}
        to="/"
        display="inline-flex"
        color="primary"
        sx={{ svg: { maxW: '100%', h: 'auto' } }}
        w={{ base: '100px', md: '116px' }}
      >
        <IconLogo w="116px" h="50px" pathColor={getTextColor(session.stage)} stageColor={currentStageColor} />
      </Box>
      <Button
        leftIcon={<IconLang />}
        textTransform="uppercase"
        display={{ base: 'none', md: 'inline-flex' }}
        onClick={onLangClick}
      >
        {t(`${i18n.resolvedLanguage}`)}
      </Button>
      <ActionButton icon={IconMenu} onClick={onMenuClick} display={{ base: 'flex', md: 'none' }} />
    </Flex>
  );
};

const Header = chakra(_Header);
export default Header;
