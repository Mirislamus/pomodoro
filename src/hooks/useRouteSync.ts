import { useEffect, useState } from 'react';
import i18n from '../localization/i18n';
import locales from '../data/locales';
import { DEFAULT_LOCALE, isLocale } from '../consts/locales';
import { AppRoute, getLocaleFromPath, getLocalizedPath, getRouteFromPath } from '../utils/url';

const getCurrentLocale = () => (isLocale(i18n.resolvedLanguage) ? i18n.resolvedLanguage : DEFAULT_LOCALE);

/**
 * The app island persists across page loads, so the active route and language are read
 * from the URL on every Astro page load and history change.
 *
 * Switching between the timer and settings does not go through Astro's router: its full
 * document swap (fetch, head and style replacement, style recalculation) landed in the middle
 * of the settings entrance animation. Only the URL and the title change here; a direct load
 * of either URL still gets the server-rendered page.
 */
const useRouteSync = (initialRoute: AppRoute) => {
  const [route, setRoute] = useState<AppRoute>(initialRoute);

  useEffect(() => {
    const sync = () => {
      const { pathname } = window.location;
      setRoute(getRouteFromPath(pathname));

      const locale = getLocaleFromPath(pathname);
      if (i18n.resolvedLanguage !== locale) {
        i18n.changeLanguage(locale);
      }
    };

    sync();
    // Lets the inline script in BaseLayout replay clicks made before hydration
    document.documentElement.setAttribute('data-app-hydrated', 'true');
    window.dispatchEvent(new CustomEvent('app:hydrated'));

    // Astro ignores history entries without its own state, so this listener handles ours
    document.addEventListener('astro:page-load', sync);
    window.addEventListener('popstate', sync);
    return () => {
      document.removeEventListener('astro:page-load', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const language = i18n.resolvedLanguage;
  useEffect(() => {
    const { title, settingsTitle } = locales[getCurrentLocale()];
    document.title = route === '/settings/' ? settingsTitle : title;
    // Lets page-level content outside the island (the SEO article) follow the active view
    document.documentElement.setAttribute('data-route', route === '/settings/' ? 'settings' : 'timer');
  }, [route, language]);

  const navigateTo = (nextRoute: AppRoute) => {
    const url = getLocalizedPath(getCurrentLocale(), nextRoute);
    if (url !== window.location.pathname) {
      window.history.pushState(null, '', url);
    }
    setRoute(nextRoute);
  };

  return [route, navigateTo] as const;
};

export default useRouteSync;
