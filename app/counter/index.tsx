import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { TimeSegment } from "../../components/TimeSegment";
import { theme } from "../../theme";

// 10 seconds from now
const timestamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? {
              start: timestamp,
              end: Date.now(),
            }
          : {
              start: Date.now(),
              end: timestamp,
            }
      );
      setStatus({ isOverdue, distance });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {status.isOverdue ? (
        <Text
          style={[
            styles.heading,
            status.isOverdue ? styles.whiteText : undefined,
          ]}
        >
          Thing overdue by
        </Text>
      ) : (
        <Text
          style={[
            styles.heading,
            status.isOverdue ? styles.whiteText : undefined,
          ]}
        >
          Thing due in ...
        </Text>
      )}
      <View style={styles.timeStamp}>
        <TimeSegment
          unit="Days"
          number={status.distance.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleRequestPermission}
      >
        <Text style={styles.buttonText}>I've Done the Thing</Text>
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
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: "white",
  },
  timeStamp: {
    flexDirection: "row",
    gap: 2,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
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
