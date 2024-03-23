import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import { useDisclosure, Switch } from '@chakra-ui/react';
import MobileMenu from '../components/menu/MobileMenu/MobileMenu';

const Main: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} onLangMenuOpen={onLangMenuOpen} />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <Switch />
      </Layout>
    </>
  );
};

export default Main;
