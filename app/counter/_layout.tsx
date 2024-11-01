import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { theme } from "../../theme";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable hitSlop={20}>
                <MaterialCommunityIcons
                  name="history"
                  size={32}
                  color={theme.colorGray}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: "History",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
