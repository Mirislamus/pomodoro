import i18n from 'i18next';

const formatLanguage = (lang: string) => {
  return lang === 'en' ? 'en-US' : 'ru-RU';
};

const sendNotification = (options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification('Pomotomo Focus Timer', {
      ...options,
      lang: formatLanguage(i18n.language),
      icon: `${import.meta.env.BASE_URL}/images/icons/icon-96x96.png`,
      badge: `${import.meta.env.BASE_URL}/images/icons/icon-96x96.png`,
    });
  } else {
    console.log('Notifications are not allowed');
  }
};

export default sendNotification;
