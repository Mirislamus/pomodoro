export const getNotificationPermission = (): NotificationPermission =>
  'Notification' in window ? Notification.permission : 'default';
