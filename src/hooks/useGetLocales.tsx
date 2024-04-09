import { useTranslation } from 'react-i18next';
import { Locale } from '../typings/enums';

const useGetLocales = (lang?: Locale) => {
  const { t, i18n } = useTranslation();

  const data = {
    en: {
      id: Locale.En,
      name: t(Locale.En),
      onChangeLang: () => i18n.changeLanguage(Locale.En),
    },
    ru: {
      id: Locale.Ru,
      name: t(Locale.Ru),
      onChangeLang: () => i18n.changeLanguage(Locale.Ru),
    },
  };

  if (lang) {
    return data[lang];
  }

  return data;
};

export default useGetLocales;
