export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notifications are allowed");
    } else {
      console.log("Notifications are denied or not supported");
    }
  }
};

