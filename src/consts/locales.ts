import { Locale } from '../typings/enums';

export const DEFAULT_LOCALE = Locale.En;

export const LOCALES = Object.values(Locale);

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale);
