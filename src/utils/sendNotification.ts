import i18n from 'i18next';
import meta from '../data/meta';
import locales from '../data/locales';
import { DEFAULT_LOCALE, isLocale } from '../consts/locales';
import { withBase } from './url';

const sendNotification = (body: string) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const language = i18n.resolvedLanguage;
  const icon = withBase('/images/icons/icon-96x96.png');

  try {
    new Notification(meta.short_name, {
      body,
      lang: locales[isLocale(language) ? language : DEFAULT_LOCALE].code,
      icon,
      badge: icon,
    });
  } catch {
    // Some mobile browsers only allow notifications from a service worker
  }
};

export default sendNotification;
