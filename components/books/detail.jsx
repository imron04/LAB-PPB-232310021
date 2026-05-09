import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ListBook } from "@/constants/list_books";

export default function Detail() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const book = ListBook.find((item) => item.id == id);

  if (!book) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={{ color: "white", fontSize: 18 }}>Book not found</Text>
      </View>
    );
  }

  const isFree = book.is_free;

  return (
    <ImageBackground
      source={book.img}
      style={styles.background}
      blurRadius={10}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <AntDesign name="arrow-left" size={22} color="black" />
            </TouchableOpacity>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="heart" size={22} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="share-alt" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
          >
            <View style={styles.content}>
              <Image
                source={book.img}
                resizeMode="cover"
                style={styles.bookImage}
              />

              <Text style={styles.title}>{book.title}</Text>

              <Text style={styles.author}>by {book.author}</Text>

              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={18} color="#FFD700" />

                <Text style={styles.ratingText}>
                  {book.rating}/5.0 • {book.views} views
                </Text>
              </View>

              <View style={styles.synopsisContainer}>
                <Text style={styles.synopsisTitle}>SINOPSIS</Text>

                <Text style={styles.synopsisText}>{book.sinopsis}</Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.button,
              isFree ? styles.freeButton : styles.subscribeButton,
            ]}
          >
            {isFree ? (
              <>
                <Ionicons name="book-outline" size={20} color="black" />

                <Text style={styles.freeButtonText}>Read Now</Text>
              </>
            ) : (
              <>
                <FontAwesome6 name="money-bill-wave" size={18} color="white" />

                <Text style={styles.subscribeButtonText}>Subscribe</Text>
              </>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.78)",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerRight: {
    flexDirection: "row",
    gap: 12,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* CONTENT */
  content: {
    alignItems: "center",
    marginTop: 5,
  },

  bookImage: {
    width: 210,
    height: 300,
    borderRadius: 22,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  author: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },

  ratingText: {
    color: "white",
    fontSize: 15,
  },

  /* SINOPSIS */
  synopsisContainer: {
    width: "100%",
    marginTop: 35,
  },

  synopsisTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  synopsisText: {
    color: "white",
    textAlign: "justify",
    lineHeight: 26,
    fontSize: 15,
  },

  /* BUTTON */
  button: {
    width: "100%",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  freeButton: {
    backgroundColor: "white",
  },

  subscribeButton: {
    backgroundColor: "#2e7d32",
  },

  freeButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },

  subscribeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
