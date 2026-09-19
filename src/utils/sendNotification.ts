import i18n from 'i18next';

const sendNotification = (options?: NotificationOptions) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const currentLang = i18n.resolvedLanguage || i18n.language || 'en';
  const langMap: Record<string, string> = {
    en: 'en-US',
    ru: 'ru-RU',
    uz: 'uz-UZ',
    de: 'de-DE',
  };

  new Notification('Pomotomo', {
    ...options,
    lang: langMap[currentLang] || 'en-US',
    icon: `${import.meta.env.BASE_URL}/images/icons/icon-96x96.png`,
    badge: `${import.meta.env.BASE_URL}/images/icons/icon-96x96.png`,
  });
};

export default sendNotification;
