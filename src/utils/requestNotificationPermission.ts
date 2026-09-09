export const requestNotificationPermission = () => {
  if ('Notification' in window) {
    return Notification.requestPermission();
  }
};
