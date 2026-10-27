import { navigate } from 'astro:transitions/client';
import { useTranslation } from 'react-i18next';
import { LOCALES } from '../consts/locales';
import { Locale } from '../typings/enums';
import { getLocalizedPath, getRouteFromPath } from '../utils/url';

interface LocaleOption {
  id: Locale;
  name: string;
  isActive: boolean;
  onSelect: () => void;
}

const useLocales = (): LocaleOption[] => {
  const { t, i18n } = useTranslation();

  const changeLocale = (locale: Locale) => {
    try {
      localStorage.setItem('i18nextLng', locale);
    } catch {
      // storage can be unavailable in private mode
    }
    i18n.changeLanguage(locale);
    navigate(getLocalizedPath(locale, getRouteFromPath(window.location.pathname)));
  };

  return LOCALES.map(locale => ({
    id: locale,
    name: t(locale),
    isActive: i18n.resolvedLanguage === locale,
    onSelect: () => changeLocale(locale),
  }));
};

export default useLocales;
