import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";
import BookCollections from "../latihan4/components/BookCollections";
import SearchBar from "../latihan4/components/SearchBar";
import { styles } from "./styles/StyleApps";
const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView>
        <SearchBar />
        <BookCollections books={ListBook} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
