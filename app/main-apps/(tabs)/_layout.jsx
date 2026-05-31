import { Entypo, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from "expo-router";
import { StatusBar, View } from "react-native";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#49745e",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 2,
            borderTopColor: "#3a5d4a",
            height: 70,
            paddingBottom: 5,
            position: "relative",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            paddingBottom: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="direction" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan QR",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "700",
              color: "#49745e",
              marginTop: 4,
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: focused ? "#3a5d4a" : "#49745e",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -15,
                  borderWidth: 4,
                  borderColor: "white",
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <Ionicons name="scan" size={24} color="white" />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="mylib"
          options={{
            title: "My Library",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bookshelf"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profil"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="people" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
