import { useTranslation } from 'react-i18next';
import { Locales } from '../typings/enums';

const useGetLocales = (lang?: Locales) => {
  const { t, i18n } = useTranslation();

  const data = {
    en: {
      id: Locales.En,
      name: t(Locales.En),
      onChangeLang: () => i18n.changeLanguage(Locales.En),
    },
    ru: {
      id: Locales.Ru,
      name: t(Locales.Ru),
      onChangeLang: () => i18n.changeLanguage(Locales.Ru),
    },
  };

  if (lang) {
    return data[lang];
  }

  return data;
};

export default useGetLocales;
