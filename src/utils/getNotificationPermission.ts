export const getNotificationPermission = () => {
  if ("Notification" in window) {
    return Notification.permission;
  }
  return "Notifications not supported";
};
