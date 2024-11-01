import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./theme";

export default function App() {
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "No",
        onPress: () => console.log("No"),
      },
      {
        text: "Yes",
        onPress: () => console.log("Yes"),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <Text style={styles.text}>Coffee</Text>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  innerBox: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "bold",
    color: theme.colorWhite,
    textTransform: "uppercase",
  },
});
