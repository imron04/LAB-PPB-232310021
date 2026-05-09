import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,

        drawerActiveTintColor: "#49745e",
        drawerInactiveTintColor: "gray",

        drawerStyle: {
          backgroundColor: "#f8f6f1",
          width: 250,
        },

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },

        headerStyle: {
          backgroundColor: "#49745e",
        },

        headerTintColor: "white",

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* TABS */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "My Application",
        }}
      />

      {/* SCREEN LAIN DI DRAWER */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "About",
          title: "About",
        }}
      />
    </Drawer>
  );
}
