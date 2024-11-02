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
  completedAtTimestamp?: number;
  lastUpdatedAtTimestamp?: number;
};

export default function App() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

  const [value, setValue] = useState<string>("");

  const handleToggleComplete = (key: string) => {
    let newItems = shoppingItems.map((item) => {
      if (item.key === key)
        return {
          ...item,
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      return item;
    });

    setShoppingItems(newItems);
  };

  const handleDelete = (name: string) => {
    let newItems = shoppingItems.filter((item) => item.name !== name);
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
      {
        name: value,
        key: new Date().toISOString(),
        completedAtTimestamp: Date.now(),
      },
      ...shoppingItems,
    ]);

    setValue("");
  };

  const sortItems = () => {
    return shoppingItems.sort((a, b) => {
      if (a.completedAtTimestamp && b.completedAtTimestamp)
        return b.completedAtTimestamp - a.completedAtTimestamp;

      if (!a.completedAtTimestamp && !b.completedAtTimestamp) {
        return 0;
      }
      if (!a.completedAtTimestamp) return -1;
      else return +1;
    });
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={sortItems()}
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
          isCompleted={Boolean(item.completedAtTimestamp)}
          handleDelete={() => handleDelete(item.name)}
          onToggleComplete={() => handleToggleComplete(item.key)}
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
