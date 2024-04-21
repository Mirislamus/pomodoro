import { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import LangMenu from '../components/menu/LangMenu/LangMenu';
import MobileMenu from '../components/menu/MobileMenu/MobileMenu';
import Timer from '../components/Timer/Timer';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer';
import Settings from '../components/Settings/Settings';

const Main: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();
  const location = useLocation();
  const isSettings = location.pathname === '/settings';

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        colorMode={colorMode}
        onClose={onMobileMenuClose}
        onLangMenuOpen={onLangMenuOpen}
        onColorModeClick={toggleColorMode}
      />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer
          allowNotify={false}
          isSettings={isSettings}
          colorMode={colorMode}
          onColorModeClick={toggleColorMode}
          onNotifyClick={() => alert('notify')}
          onSettingsClick={() => {
            if (isSettings) {
              navigate('/');
            } else {
              navigate('/settings');
            }
          }}
        />
      </Layout>
    </>
  );
};

export default Main;
