import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  name: string;
  handleComplete: () => void;
  handleUndo: () => void;
  isCompleted?: boolean;
}

export default function ShoppingListItem({
  name,
  handleComplete,
  isCompleted,
  handleUndo,
}: Props) {
  const handleDelete = () => {
    Alert.alert("Delete", `Are you sure you want to delete ${name}?`, [
      {
        text: "No",
        onPress: () => console.log("No"),
      },
      {
        text: "Yes",
        onPress: () => handleComplete(),
      },
    ]);
  };

  return (
    <View
      style={[styles.innerBox, isCompleted ? styles.completedBox : undefined]}
    >
      <Text
        style={[styles.text, isCompleted ? styles.completedText : undefined]}
      >
        {name}
      </Text>

      {isCompleted ? (
        <TouchableOpacity onPress={() => handleUndo()}>
          <MaterialCommunityIcons name="undo-variant" size={24} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign name="closecircle" size={24} color={theme.colorRed} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  innerBox: {
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
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
  },
  completedText: {
    textDecorationLine: "line-through",
  },
});
