import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  // return <Redirect href="/screen1" />; //p6
  return (
    <View>
      <Text>Landing Page</Text>
      <Link href={"/main-apps/"} push asChild>
        <Button title="Get Started" />
      </Link>
    </View>
  );
}
//   //   // return <Redirect href="module-latihan/Praktikum1" />;
// export { default } from "@/components/e-catalogs/explore";

// export { default } from "@/components/module-latihan/latihan5/praktikum";
