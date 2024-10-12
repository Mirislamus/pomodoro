import { useTranslation } from 'react-i18next';
import { Locale } from '../typings/enums';

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

  const data: UseGetLocalesReturnType = {
    [Locale.En]: {
      id: Locale.En,
      name: t(Locale.En),
      onChangeLang: () => i18n.changeLanguage(Locale.En),
    },
    [Locale.Ru]: {
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
