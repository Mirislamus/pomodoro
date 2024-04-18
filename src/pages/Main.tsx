import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import MobileMenu from '../components/menu/MobileMenu/MobileMenu';
import Timer from '../components/Timer/Timer';
import { useColorMode, useDisclosure } from '@chakra-ui/react';

const Main: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Router>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        colorMode={colorMode}
        onClose={onMobileMenuClose}
        onLangMenuOpen={onLangMenuOpen}
        onChangeColorMode={toggleColorMode}
      />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/settings" element={<>Settings</>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Main;
