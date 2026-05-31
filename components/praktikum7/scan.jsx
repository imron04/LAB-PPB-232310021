import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ScanScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);

    if (data) {
      router.push(`/books/${data}`);
    } else {
      Alert.alert("Gagal", "QR Code tidak valid.");
    }

    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text style={styles.textInfo}>Meminta izin akses kamera...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.textError}>
          Akses kamera ditolak. Harap izinkan di pengaturan perangkat Anda.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlayContainer}>
        <View style={styles.scannerMarker} />
        <Text style={styles.hintText}>
          Posisikan QR Code Buku di dalam kotak
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  textInfo: {
    fontSize: 16,
    color: "#6c757d",
  },
  textError: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  scannerMarker: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: "#49745e",
    backgroundColor: "transparent",
    borderRadius: 16,
    marginBottom: 20,
  },
  hintText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
});
