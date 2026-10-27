import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useColorMode } from '../components/ui/color-mode';
import { Provider } from '../components/ui/provider';
import { Toaster } from '../components/ui/toaster';
import Layout from '../shared/Layout/Layout';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import LangMenu from '../components/LangMenu/LangMenu';
import TimerView from '../views/TimerView';
import SettingsView from '../views/SettingsView';
import useNotificationPermission from '../hooks/useNotificationPermission';
import useRouteSync from '../hooks/useRouteSync';
import { useApplySettingsFromUrl } from '../hooks/useSettingsLink';
import useSettingsStore from '../stores/useSettingsStore';
import i18n from '../localization/i18n';
import { Locale } from '../typings/enums';
import { DEFAULT_LOCALE } from '../consts/locales';
import { AppRoute } from '../utils/url';

export interface AppShellProps {
  currentView?: 'timer' | 'settings';
  locale?: Locale;
}

const AppShellContent = ({ currentView = 'timer' }: Pick<AppShellProps, 'currentView'>) => {
  const { open: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { open: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const allowNotifications = useSettingsStore(state => state.settings.allowNotifications);
  const setSettings = useSettingsStore(state => state.setSettings);
  const notificationPermission = useNotificationPermission();
  const [route, navigateTo] = useRouteSync(currentView === 'settings' ? '/settings/' : '/');

  useApplySettingsFromUrl();

  const isSettings = route === '/settings/';
  const otherRoute: AppRoute = isSettings ? '/' : '/settings/';

  // Settings are mounted ahead of time while idle, so opening them only reveals a ready panel
  // instead of rendering the whole form on click, in the middle of the entrance animation
  const [isSettingsPrepared, setIsSettingsPrepared] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setIsSettingsPrepared(true), 1000);
    return () => clearTimeout(id);
  }, []);

  const toggleSettings = () => navigateTo(otherRoute);

  return (
    <>
      <LangMenu isOpen={isLangMenuOpen} onClose={onLangMenuClose} onLocaleChange={onMobileMenuClose} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        colorMode={colorMode}
        onClose={onMobileMenuClose}
        onLangMenuOpen={onLangMenuOpen}
        onColorModeClick={toggleColorMode}
      />
      <Layout>
        <Header onLangClick={onLangMenuOpen} onMenuClick={onMobileMenuOpen} />
        {/* The timer stays mounted on the settings page so a running countdown keeps going */}
        <TimerView hidden={isSettings} />
        {(isSettings || isSettingsPrepared) && <SettingsView hidden={!isSettings} onClose={toggleSettings} />}
        <Footer
          isSettings={isSettings}
          colorMode={colorMode}
          areNotificationsEnabled={allowNotifications}
          areNotificationsBlocked={notificationPermission === 'denied'}
          onColorModeClick={toggleColorMode}
          onNotifyClick={() => setSettings('allowNotifications', !allowNotifications)}
          onSettingsClick={toggleSettings}
        />
      </Layout>
    </>
  );
};

const AppShell = ({ currentView = 'timer', locale = DEFAULT_LOCALE }: AppShellProps) => {
  // Runs during render on purpose: the server-rendered HTML must already be in the page language
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <Provider storageKey="chakra-ui-color-mode" defaultTheme="system" enableSystem>
      <AppShellContent currentView={currentView} />
      <Toaster />
    </Provider>
  );
};

export default AppShell;
