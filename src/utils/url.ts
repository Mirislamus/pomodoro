import { DEFAULT_LOCALE, isLocale } from '../consts/locales';
import { Locale } from '../typings/enums';

export type AppRoute = '/' | '/settings/';

export const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string): string => `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/** Pathname relative to the deploy base, always starting with `/`. */
export const stripBase = (pathname: string): string => {
  const path = BASE_URL && pathname.startsWith(BASE_URL) ? pathname.slice(BASE_URL.length) : pathname;
  return path.startsWith('/') ? path : `/${path}`;
};

export const getLocaleFromPath = (pathname: string): Locale => {
  const [firstSegment] = stripBase(pathname).split('/').filter(Boolean);
  return isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
};

export const getRouteFromPath = (pathname: string): AppRoute =>
  /\/settings\/?$/.test(stripBase(pathname)) ? '/settings/' : '/';

export const getLocalizedPath = (locale: Locale, route: AppRoute = '/'): string =>
  withBase(`${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${route}`);
