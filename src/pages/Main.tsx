import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import { useDisclosure } from '@chakra-ui/react';
import MobileMenu from '../components/menu/MobileMenu/MobileMenu';
import StageSwitcher from '../components/StageSwitcher/StageSwitcher';
import { StageColor } from '../typings/enums';

const Main: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} onLangMenuOpen={onLangMenuOpen} />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <StageSwitcher stages={[{ text: 'Pomodoro', stageColor: StageColor.Pomodoro, onClick: () => {} }]} />
      </Layout>
    </>
  );
};

export default Main;
