import i18n from 'i18next';

const sendNotification = (options?: NotificationOptions) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  new Notification('Pomotomo Focus Timer', {
    ...options,
    lang: i18n.language === 'en' ? 'en-US' : 'ru-RU',
    icon: `${import.meta.env.BASE_URL}/images/icons/icon-96x96.png`,
    badge: `${import.meta.env.BASE_URL}/images/icons/icon-96x96.png`,
  });
};

export default sendNotification;
