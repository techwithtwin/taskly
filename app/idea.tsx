import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function IdeaScreen() {
  const handleGetFoxes = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleGetFoxes}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
