import { FC } from 'react';
import Wrapper from './components/Wrapper/Wrapper';
import Header from './components/Header/Header';
import LangMenu from './components/menu/LangMenu/LangMenu';
import MobileMenu from './components/menu/MobileMenu/MobileMenu';
import Timer from './components/Timer/Timer';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import Footer from './components/Footer/Footer';
import { useSettings } from './contexts/SettingsContext/SettingsContext';

const Main: FC = () => {
  const {
    isOpen: isLangMenuOpen,
    onClose: onLangMenuClose,
    onOpen: onLangMenuOpen,
  } = useDisclosure();
  const {
    isOpen: isMobileMenuOpen,
    onClose: onMobileMenuClose,
    onOpen: onMobileMenuOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { settings, setSettings } = useSettings();

  // TODO: Add links

  const onSettingsClickHandler = () => {
    // TODO
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
      <Wrapper>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        <Timer />
        <Footer
          allowNotify={settings.allowNotifications}
          isSettings={false}
          colorMode={colorMode}
          onColorModeClick={toggleColorMode}
          onNotifyClick={onNotifyClickHandler}
          onSettingsClick={onSettingsClickHandler}
        />
      </Wrapper>
    </>
  );
};

export default Main;
