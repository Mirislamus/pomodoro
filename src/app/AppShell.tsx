import { useState, useEffect } from 'react';
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
import useSettingsStore from '../stores/useSettingsStore';
import i18n from '../localization/i18n';
import useAppNavigate from '../hooks/useAppNavigate';

export interface AppShellProps {
  currentView?: 'timer' | 'settings';
  locale?: string;
  children?: React.ReactNode;
}

const AppShellContent = ({ currentView = 'timer', children }: AppShellProps) => {
  const { open: isLangMenuOpen, onClose: onLangMenuClose, onOpen: onLangMenuOpen } = useDisclosure();
  const { open: isMobileMenuOpen, onClose: onMobileMenuClose, onOpen: onMobileMenuOpen } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const settings = useSettingsStore(state => state.settings);
  const setSettings = useSettingsStore(state => state.setSettings);
  const notificationPermission = useNotificationPermission();
  const appNavigate = useAppNavigate();

  const [activeView, setActiveView] = useState<'timer' | 'settings'>(currentView);

  useEffect(() => {
    const syncRouteAndLocale = () => {
      const pathname = window.location.pathname;
      const isSettings = pathname.includes('/settings');
      setActiveView(isSettings ? 'settings' : 'timer');

      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
      let path = pathname;
      if (baseUrl && path.startsWith(baseUrl)) {
        path = path.slice(baseUrl.length);
      }
      const segments = path.split('/').filter(Boolean);
      const detectedLang = segments[0] === 'ru' || segments[0] === 'de' ? segments[0] : 'en';
      if (i18n.resolvedLanguage !== detectedLang) {
        i18n.changeLanguage(detectedLang);
      }
    };

    syncRouteAndLocale();
    document.documentElement.setAttribute('data-app-hydrated', 'true');
    window.dispatchEvent(new CustomEvent('app:hydrated'));

    document.addEventListener('astro:page-load', syncRouteAndLocale);
    window.addEventListener('popstate', syncRouteAndLocale);

    return () => {
      document.removeEventListener('astro:page-load', syncRouteAndLocale);
      window.removeEventListener('popstate', syncRouteAndLocale);
    };
  }, []);

  const isSettings = activeView === 'settings';

  const onSettingsClickHandler = () => {
    if (isSettings) {
      setActiveView('timer');
      appNavigate('/');
    } else {
      setActiveView('settings');
      appNavigate('/settings/');
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
        {children ? (
          children
        ) : (
          <>
            <TimerView hidden={activeView !== 'timer'} />
            {activeView === 'settings' && <SettingsView onClose={onSettingsClickHandler} />}
          </>
        )}
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

const AppShell = ({ currentView = 'timer', locale = 'en', children }: AppShellProps) => {
  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <Provider storageKey="chakra-ui-color-mode" defaultTheme="system" enableSystem>
      <AppShellContent currentView={currentView} locale={locale}>
        {children}
      </AppShellContent>
      <Toaster />
    </Provider>
  );
};

export default AppShell;
