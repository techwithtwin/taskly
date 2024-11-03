import * as Notifications from "expo-notifications";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {
  const handleRequestPermission = async () => {
    const res = await registerForPushNotificationsAsync();

    if (res === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app",
        },
        trigger: { seconds: 5 },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notification persmission for the Expo Go in settings"
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleRequestPermission}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "black",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "semibold",
  },
});
