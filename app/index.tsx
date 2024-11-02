import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";

type ShoppingItem = {
  name: string;
  key: string;
  isCompleted: boolean;
};

const initialItems: ShoppingItem[] = [
  {
    name: "Milk",
    key: "milk",
    isCompleted: false,
  },
  {
    name: "Coffee",
    key: "coffee",
    isCompleted: false,
  },
  {
    name: "Tea",
    key: "tea",
    isCompleted: false,
  },
];

export default function App() {
  const [shoppingItems, setShoppingItems] =
    useState<ShoppingItem[]>(initialItems);

  const [value, setValue] = useState<string>("");

  const handleComplete = (name: string) => {
    let newItems = shoppingItems.map((item) => {
      if (item.name === name)
        return {
          ...item,
          isCompleted: true,
        };
      return item;
    });

    setShoppingItems(newItems);
  };

  const handleUndo = (name: string) => {
    let newItems = shoppingItems.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          isCompleted: false,
        };
      }

      return item;
    });

    setShoppingItems(newItems);
  };

  const onSubmit = () => {
    if (!value) return;
    let existingItem = shoppingItems.find((item) => item.name === value);

    if (existingItem) {
      ToastAndroid.show("Item already Exist!", ToastAndroid.LONG);
      setValue("");
      return;
    }

    setShoppingItems([
      { name: value, isCompleted: false, key: new Date().toISOString() },
      ...shoppingItems,
    ]);

    setValue("");
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={shoppingItems}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Text>Your Shopping list is Empty</Text>
        </View>
      )}
      ListHeaderComponent={
        <TextInput
          placeholder="Add item"
          style={styles.input}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
        />
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={item.isCompleted}
          handleUndo={handleUndo}
          handleComplete={handleComplete}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  input: {
    padding: 8,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colorRed,
    backgroundColor: theme.colorWhite,
  },
});
