import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, View } from "react-native";
import { styles } from "../styles/StyleApps";
const SearchBar = () => {
  return (
    <View style={styles.searchSection}>
      <Ionicons
        style={styles.searchIcon}
        name="search-outline"
        size={20}
        color="gray"
      />

      <TextInput
        style={styles.input}
        placeholder="Cari buku..."
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default SearchBar;
