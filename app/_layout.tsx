import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Shopping List",
        }}
      />
      <Stack.Screen
        name="counter"
        options={{
          title: "Counter",
          presentation: "modal",
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="idea"
        options={{
          title: "Idea",
        }}
      />
    </Stack>
  );
}

export default Layout;
