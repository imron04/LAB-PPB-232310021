import { useRouter } from "expo-router";
import { Button, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen3() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>Third Screen</Text>
        <Button
          title="Go to first screen"
          onPress={() => router.push("/screen1")}
        />
      </View>
    </SafeAreaView>
  );
}
