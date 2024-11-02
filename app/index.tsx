import { StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

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

  function sortItems(a: ShoppingItem, b: ShoppingItem) {
    const getDigit = (d: boolean) => (d ? 1 : 0);

    return getDigit(a.isCompleted) - getDigit(b.isCompleted);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add item"
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={onSubmit}
      />
      {shoppingItems.sort(sortItems).map((item) => (
        <ShoppingListItem
          key={item.key}
          name={item.name}
          isCompleted={item.isCompleted}
          handleUndo={handleUndo}
          handleComplete={handleComplete}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  input: {
    padding: 8,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colorCerulean,
  },
});
