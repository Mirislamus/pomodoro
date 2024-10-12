import { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../shared/Layout/Layout';
import Header from '../components/Header/Header';

import { useColorMode, useDisclosure } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer';
import useNotificationPermission from '../hooks/useNotificationPermission';
import Timer from '../pages/Timer';
import Settings from '../pages/Settings';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import LangMenu from '../components/LangMenu/LangMenu';
import useSettingsStore from '../stores/useSettingsStore';

const App: FC = () => {
  const { isOpen: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const settings = useSettingsStore(state => state.settings);
  const setSettings = useSettingsStore(state => state.setSettings);
  const isSettings = location.pathname === '/settings';
  const notificationPermission = useNotificationPermission();

  const onSettingsClickHandler = () => {
    if (isSettings) {
      navigate('/');
    } else {
      navigate('/settings');
    }
  };

  const onNotifyClickHandler = () => {
    setSettings('allowNotifications', !settings.allowNotifications);
  };

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
          allowNotification={settings.allowNotifications}
          isNotificationDisabled={notificationPermission === 'denied'}
          isSettings={isSettings}
          colorMode={colorMode}
          onColorModeClick={toggleColorMode}
          onNotifyClick={onNotifyClickHandler}
          onSettingsClick={onSettingsClickHandler}
        />
      </Layout>
    </>
  );
};

export default App;
