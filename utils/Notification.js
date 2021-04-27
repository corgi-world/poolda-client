import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default async function registerForPushNotificationsAsync() {
  const {
    status: existingStatus
  } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  console.log(finalStatus);

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    finalStatus = status;
    console.log(status);
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  await Notifications.createChannelAndroidAsync(
    "chat-messages",
    {
      name: "Chat messages",
      sound: true,
      vibrate: true,
      priority: "height",
      badge: true,
      description: "hello World!"
    }
  );

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  return token;
}
