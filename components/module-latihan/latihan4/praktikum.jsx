import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";
import BookCollections from "../latihan4/components/BookCollections";
import Categoriesnav from "../latihan4/components/Categories";
import CTABook from "../latihan4/components/CTABook";
import Header from "../latihan4/components/Header";
import { color_list, styles } from "./styles/StyleApps";

export default function HomeScreen() {
  const lastBook = ListBook[ListBook.length - 1];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {/* HEADER */}
      <Header />
      {/* END HEADER */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* MAIN CONTENT */}
        <View style={{ flex: 1 }}>
          <CTABook book={lastBook} />
          <Categoriesnav />
          <BookCollections books={ListBook} />
        </View>
        {/* END MAIN CONTENT */}

        {/* FOOTER */}
        <View>
          <Text style={{ color: color_list.green }}>
            &copy; 2026 Febry Damatraseta Fairuz
          </Text>
        </View>
        {/* END FOOTER */}
      </ScrollView>
    </SafeAreaView>
  );
}
