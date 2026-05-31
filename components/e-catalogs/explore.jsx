import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { color_list } from "./styles/StyleApps";

// Mock Data Marker
const markersAddress = [
  {
    coordinates: { latitude: -6.225269, longitude: 106.649721 },
    title: "Home",
    type: "home",
  },
  {
    coordinates: { latitude: -6.225269, longitude: 106.657682 },
    title: "The UBM Library",
    type: "store",
  },
  {
    coordinates: { latitude: -6.227336, longitude: 106.670122 },
    title: "Toko Buku NAS",
    type: "store",
  },
];

export default function Explore() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(true); // Default terbuka

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      let addressData = await Location.reverseGeocodeAsync(userLocation.coords);
      if (addressData.length > 0) setAddress(addressData[0]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* PETA */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : null}
        region={location}
        showsUserLocation={true}
      >
        {markersAddress.map((marker, i) => (
          <Marker
            key={i}
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}
      </MapView>

      {/* HEADER */}
      <Header onOpenSheet={() => setModalVisible(true)} />

      {/* BOTTOM SHEET (MODAL VERSION) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sheetContainer}>
            {/* Handle Bar (Garis kecil di atas) */}
            <View style={styles.dragHandle} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Explore Store</Text>
              <Text style={styles.subtitle}>
                {address
                  ? `${address.city}, ${address.region}`
                  : "Mencari lokasi..."}
              </Text>

              <View style={{ marginTop: 20 }}>
                <ListStores />
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "white" }}>Tutup Peta</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Header = ({ onOpenSheet }) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {!onOpenSheet && (
        <TouchableOpacity style={styles.backButton} onPress={onOpenSheet}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const ListStores = () => {
  return markersAddress
    .filter((m) => m.type === "store")
    .map((store, i) => (
      <View key={i} style={styles.shopItem}>
        <View style={styles.iconBox}>
          <AntDesign name="shopping" size={20} color={color_list.green} />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>{store.title}</Text>
          <Text style={{ fontSize: 12, color: "gray" }}>
            Buka · Tutup 22:00
          </Text>
        </View>
      </View>
    ));
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 5,
  },
  backButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)", // Biar peta agak gelap dikit saat sheet muncul
  },
  sheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "45%", // Kamu bisa atur tinggi sheet di sini
    paddingTop: 12,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: color_list.green,
    textAlign: "center",
  },
  subtitle: { fontSize: 14, color: "gray", textAlign: "center" },
  shopItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: color_list.green,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
