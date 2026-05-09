import { Drawer } from "expo-router/drawer";
import { StatusBar } from "react-native";
import "react-native-reanimated";

export default function DrawerLayout() {
  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />

      <Drawer
        screenOptions={{
          headerShown: true,

          drawerActiveTintColor: "#49745e",
          drawerInactiveTintColor: "gray",

          drawerStyle: {
            backgroundColor: "#f8f6f1",
            width: 260,
          },

          drawerLabelStyle: {
            fontSize: 15,
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
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "E-Book Apps",
          }}
        />

        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About Apps",
            title: "About Apps",
          }}
        />

        <Drawer.Screen
          name="categories"
          options={{
            drawerLabel: "Book Categories",
            title: "Book Categories",
          }}
        />
      </Drawer>
    </>
  );
}
