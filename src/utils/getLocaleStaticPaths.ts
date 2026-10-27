import { DEFAULT_LOCALE, LOCALES } from '../consts/locales';

/** The default locale lives at the site root, every other one under `/<locale>/`. */
export const getLocaleStaticPaths = () =>
  LOCALES.map(locale => ({
    params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale },
  }));
