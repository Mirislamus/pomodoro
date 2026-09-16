import { useTranslation } from 'react-i18next';
import { Locale } from '../typings/enums';
import { navigate } from 'astro:transitions/client';

export const getLocalizedPath = (targetLocale: string, currentPathname: string): string => {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = currentPathname;
  if (baseUrl && path.startsWith(baseUrl)) {
    path = path.slice(baseUrl.length);
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  const isSettings = path.includes('/settings');
  if (targetLocale === 'en') {
    return isSettings ? `${baseUrl}/settings` : `${baseUrl}/`;
  }
  return isSettings ? `${baseUrl}/${targetLocale}/settings` : `${baseUrl}/${targetLocale}/`;
};

interface LocaleData {
  id: Locale;
  name: string;
  onChangeLang: () => void;
}

type UseGetLocalesReturnType = {
  [key in Locale]: LocaleData;
};

const useGetLocales = (lang?: Locale): LocaleData | UseGetLocalesReturnType => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (targetLocale: Locale) => {
    try {
      localStorage.setItem('i18nextLng', targetLocale);
    } catch {}
    i18n.changeLanguage(targetLocale);
    if (typeof window !== 'undefined') {
      const targetPath = getLocalizedPath(targetLocale, window.location.pathname);
      navigate(targetPath);
    }
  };

  const data: UseGetLocalesReturnType = {
    [Locale.En]: {
      id: Locale.En,
      name: t(Locale.En),
      onChangeLang: () => handleLanguageChange(Locale.En),
    },
    [Locale.Ru]: {
      id: Locale.Ru,
      name: t(Locale.Ru),
      onChangeLang: () => handleLanguageChange(Locale.Ru),
    },
    [Locale.De]: {
      id: Locale.De,
      name: t(Locale.De),
      onChangeLang: () => handleLanguageChange(Locale.De),
    },
  };

  if (lang) {
    return data[lang];
  }

  return data;
};

export default useGetLocales;
