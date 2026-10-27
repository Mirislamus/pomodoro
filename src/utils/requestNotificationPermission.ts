export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) return 'denied';

  const permission = await Notification.requestPermission();
  window.dispatchEvent(new Event('notification-permission-change'));
  return permission;
};
