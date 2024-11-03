import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { COUNT_DOWN_KEY, persistedCountdownState } from ".";
import { getFromStorage } from "../../utils/storage";

export default function HistoryScreen() {
  const [countdownState, setCountdownState] =
    useState<persistedCountdownState>();

  useEffect(() => {
    async () => {
      const value = await getFromStorage(COUNT_DOWN_KEY);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
