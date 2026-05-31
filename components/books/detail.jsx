import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ListBook } from "@/constants/list_books";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const book = ListBook.find((item) => item.id == id);

  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  const teksBukuRaw = book?.story || "Konten buku belum tersedia.";
  const isiParagrafArray = teksBukuRaw
    .split("\n")
    .filter((p) => p.trim() !== "");

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  if (!book) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={{ color: "white", fontSize: 18 }}>Book not found</Text>
      </View>
    );
  }

  const isFree = book.is_free;

  const playSpeech = async (index) => {
    if (index >= isiParagrafArray.length) {
      setIsPlaying(false);
      setCurrentParagraphIndex(0);
      return;
    }

    setIsPlaying(true);
    setCurrentParagraphIndex(index);

    Speech.speak(isiParagrafArray[index], {
      language: book.language || "id",
      pitch: 1.0,
      rate: 0.95,
      onDone: () => {
        playSpeech(index + 1);
      },
      onError: (error) => {
        console.log("Speech Error: ", error);
        setIsPlaying(false);
      },
    });
  };

  const pauseSpeech = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseSpeech();
    } else {
      playSpeech(currentParagraphIndex);
    }
  };

  const handleCloseModal = () => {
    Speech.stop();
    setIsPlaying(false);
    setModalVisible(false);
  };

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
          {/* HEADER */}
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
            contentContainerStyle={{ paddingBottom: 30 }}
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
            onPress={() => {
              if (isFree) {
                setModalVisible(true);
              } else {
                alert("Fitur subscribe dipicu!");
              }
            }}
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalOverlay}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={handleCloseModal}
              />

              <View style={styles.modalContent}>
                <View style={styles.dragHandle} />

                <View style={styles.sectionTextContainer}>
                  <Text style={styles.audioTitle}>{book.title}</Text>
                  <Text style={styles.audioAuthor}>by {book.author}</Text>

                  <View style={styles.divider} />

                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.audioTextScroll}
                  >
                    {isiParagrafArray.map((paragraf, idx) => {
                      const isCurrent = idx === currentParagraphIndex;
                      return (
                        <Text
                          key={idx}
                          style={[
                            styles.paragraphBaseText,
                            isCurrent && styles.paragraphHighlightText,
                          ]}
                        >
                          {paragraf}
                        </Text>
                      );
                    })}
                  </ScrollView>
                </View>

                <View style={styles.sectionControlContainer}>
                  <Text style={styles.progressIndicator}>
                    {isPlaying ? "Reading..." : "Paused"} (
                    {currentParagraphIndex + 1}/{isiParagrafArray.length})
                  </Text>

                  <View style={styles.mediaButtonsRow}>
                    <TouchableOpacity
                      style={[styles.mediaBtn, styles.stopBtn]}
                      onPress={() => {
                        Speech.stop();
                        setIsPlaying(false);
                        setCurrentParagraphIndex(0);
                      }}
                    >
                      <Ionicons name="square" size={18} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.mediaBtn,
                        isPlaying ? styles.pauseBtn : styles.playBtn,
                      ]}
                      onPress={handleTogglePlay}
                    >
                      <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#D6D6D6",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 15,
  },
  sectionTextContainer: {
    backgroundColor: "#F4F1E6",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    flex: 1,
  },
  audioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B2B2B",
    textAlign: "center",
  },
  audioAuthor: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6E6E6E",
    textAlign: "center",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2DDD0",
    marginVertical: 15,
  },
  audioTextScroll: {
    flexGrow: 1,
    paddingBottom: 15,
  },
  paragraphBaseText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#5E5D59",
    textAlign: "justify",
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  paragraphHighlightText: {
    color: "#000000",
    fontWeight: "700",
    backgroundColor: "#FCE586",
    borderRadius: 4,
  },
  sectionControlContainer: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
  progressIndicator: {
    fontSize: 14,
    fontWeight: "600",
    color: "#49745e",
    marginBottom: 12,
  },
  mediaButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  mediaBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  playBtn: {
    backgroundColor: "#49745e",
  },
  pauseBtn: {
    backgroundColor: "#FFA000",
  },
  stopBtn: {
    backgroundColor: "#C62828",
  },
});
