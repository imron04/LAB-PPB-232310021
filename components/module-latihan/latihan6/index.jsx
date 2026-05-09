import { Link, useRouter } from "expo-router";
import { Button, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor="#61dafb" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>First Screen</Text>
        <Link href="/screen2" push asChild>
          <Button title="Go To Second Screen" />
        </Link>
        <Button
          title="Go to third screen"
          onPress={() => router.push("/screen3")}
        />
      </View>
    </SafeAreaView>
  );
}
