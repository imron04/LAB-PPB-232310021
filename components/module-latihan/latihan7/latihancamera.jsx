import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Import fitur Expo SDK (Pastikan sudah install: expo-camera dan expo-image-picker)
import { FontAwesome } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const LatihanCamera = () => {
  const Biodata = {
    nama: "Anton Sukamto",
    nim: "2323100",
    alamat: "Bogor",
    email: "anton@mail.co",
    noTelp: "08122111",
  };

  const [avatarUri, setAvatarUri] = useState(null); // Menyimpan URI gambar profil
  const [isCameraVisible, setIsCameraVisible] = useState(false); // Mengontrol visibilitas modal kamera
  const [permission, requestPermission] = useCameraPermissions(); // Hook izin kamera
  const cameraRef = useRef(null); // Referensi komponen kamera

  const showImagePickerOptions = () => {
    Alert.alert(
      "Change Avatar",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: handleOpenCamera,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImageFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  // Membuka dan meminta izin kamera
  const handleOpenCamera = async () => {
    if (!permission) {
      await requestPermission();
    }
    if (!permission.granted) {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to take photos",
        );
        return;
      }
    }
    setIsCameraVisible(true);
  };

  // Mengambil foto dari penangkap layar kamera
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setAvatarUri(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  // Memilih foto dari galeri HP
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Gallery permission is required to select photos",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. SELEKTOR AVATAR FOTO PROFIL */}
      <TouchableOpacity onPress={showImagePickerOptions}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              avatarUri
                ? { uri: avatarUri }
                : require("../../../assets/avatar/avatar.png") // Sesuaikan letak path asset Anda
            }
            style={styles.headers.img_avatar}
            resizeMode="cover"
          />
          <View style={styles.cameraIconOverlay}>
            <FontAwesome name="edit" size={18} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.headers.title}>Nama: {Biodata.nama}</Text>
      <Text style={styles.headers.subtitle}>NIM: {Biodata.nim}</Text>

      {/* 2. FORM DATA DIRI */}
      <View style={styles.identity.container}>
        <View style={styles.identity.card_input}>
          <Text style={styles.headers.subtitleInput}>Phone</Text>
          <TextInput
            defaultValue={Biodata.noTelp}
            style={styles.identity.input_text}
          />
        </View>
      </View>

      <View style={styles.identity.container}>
        <View style={styles.identity.card_input}>
          <Text style={styles.headers.subtitleInput}>Email</Text>
          <TextInput
            defaultValue={Biodata.email}
            style={styles.identity.input_text}
          />
        </View>
      </View>

      <View style={styles.identity.container}>
        <View style={styles.identity.card_input}>
          <Text style={styles.headers.subtitleInput}>Alamat</Text>
          <TextInput
            defaultValue={Biodata.alamat}
            style={styles.identity.input_text}
          />
        </View>
      </View>

      <View
        style={{ marginTop: 15, alignSelf: "stretch", paddingHorizontal: 10 }}
      >
        <TouchableOpacity style={styles.identity.button}>
          <Text style={styles.identity.button_text}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* 3. LAYAR MODAL UNTUK JEPRET KAMERA */}
      <Modal
        visible={isCameraVisible}
        animationType="slide"
        onRequestClose={() => setIsCameraVisible(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front" // selfie view
            mode="picture"
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsCameraVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <View style={{ width: 80 }} />
            </View>
          </CameraView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#0ea6d0",
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  headers: {
    title: {
      fontWeight: "bold",
      fontSize: 28,
      textAlign: "center",
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 18,
      color: "gray",
      marginBottom: 10,
    },
    subtitleInput: {
      fontWeight: "bold",
      fontSize: 14,
      color: "red",
    },
    img_avatar: {
      width: 130,
      height: 130,
      borderRadius: 65,
      borderColor: "black",
      borderWidth: 3,
      backgroundColor: "#f2f2f2",
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
      paddingHorizontal: 10,
      marginTop: 10,
    },
    card_input: {
      borderWidth: 1,
      borderColor: "#9b9d9f",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    input_text: {
      color: "#000",
      fontSize: 16,
      marginTop: 2,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0ea6d0",
      padding: 15,
      borderRadius: 10,
    },
    button_text: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 40,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  cancelButton: {
    width: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
});

export default LatihanCamera;
