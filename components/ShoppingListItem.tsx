import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import { Entypo } from "@expo/vector-icons";

interface Props {
  name: string;
  isCompleted: boolean;

  onToggleComplete: () => void;
  handleDelete: () => void;
}

export default function ShoppingListItem({
  name,
  isCompleted,
  handleDelete,
  onToggleComplete,
}: Props) {
  const onDelete = () => {
    Alert.alert("Delete", `Are you sure you want to delete ${name}?`, [
      {
        text: "No",
        onPress: () => console.log("No"),
      },
      {
        text: "Yes",
        onPress: () => handleDelete(),
      },
    ]);
  };

  return (
    <Pressable
      onPress={onToggleComplete}
      style={[styles.innerBox, isCompleted ? styles.completedBox : undefined]}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={18}
          color={isCompleted ? "green" : theme.colorCerulean}
        />
        <Text
          numberOfLines={1}
          style={[styles.text, isCompleted ? styles.completedText : undefined]}
        >
          {name}
        </Text>
      </View>

      <TouchableOpacity onPress={onDelete}>
        <AntDesign name="closecircle" size={24} color={theme.colorRed} />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  innerBox: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  completedBox: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: "rgb(122, 122, 122)",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
});
