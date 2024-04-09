import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import { useDisclosure } from '@chakra-ui/react';
import MobileMenu from '../components/menu/MobileMenu/MobileMenu';
import StageSwitcher from '../components/StageSwitcher/StageSwitcher';
import useGetStageColor from '../hooks/useGetStageColor';
import { t } from 'i18next';
import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import { Stage } from '../typings/enums';

const Main: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();
  const stageColor = useGetStageColor();

  const { settings, setSettings } = useSettings();

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} onLangMenuOpen={onLangMenuOpen} />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <StageSwitcher
          stageColor={stageColor}
          stages={[
            {
              text: t('pomodoro'),
              onClick: () => setSettings('stage', Stage.Pomodoro),
              isActive: settings.stage === Stage.Pomodoro,
            },
            {
              text: t('short_break'),
              onClick: () => setSettings('stage', Stage.ShortBreak),
              isActive: settings.stage === Stage.ShortBreak,
            },
            {
              text: t('long_break'),
              onClick: () => setSettings('stage', Stage.LongBreak),
              isActive: settings.stage === Stage.LongBreak,
            },
          ]}
        />
      </Layout>
    </>
  );
};

export default Main;
