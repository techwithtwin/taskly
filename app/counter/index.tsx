import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { TimeSegment } from "../../components/TimeSegment";
import { theme } from "../../theme";
import { getFromStorage, saveToStorage } from "../../utils/storage";

// 10 seconds from now
const frequency = 60 * 60 * 1000;

// storage key
export const COUNT_DOWN_KEY = "taskly-countdown";

export type persistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [countdownState, setCountdownState] =
    useState<persistedCountdownState>();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    (async () => {
      const value = await getFromStorage(COUNT_DOWN_KEY);
      setCountdownState(value);
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequency
        : Date.now();

      if (lastCompletedTimestamp) {
        setIsLoading(false);
      }
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
  }, [lastCompletedTimestamp]);

  const scheduleNotification = async () => {
    let pushNotificationId;
    const res = await registerForPushNotificationsAsync();

    if (res === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "The thing is due!",
        },
        trigger: { seconds: frequency / 1000 },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notification persmission for the Expo Go in settings"
      );
    }
    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState?.currentNotificationId
      );
    }

    const newCountdownState: persistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };

    setCountdownState(newCountdownState);

    await saveToStorage(COUNT_DOWN_KEY, newCountdownState);
  };

  if (isLoading)
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator />
      </View>
    );
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
        onPress={scheduleNotification}
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
    marginTop: 20,
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
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
