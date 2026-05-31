import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const [name, setName] = useState("Imron");
  const [email, setEmail] = useState("imron@example.com");
  const [bio, setBio] = useState(
    "Information Systems Student | Web & Mobile Developer",
  );

  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");

  const pickerOptions = {
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  };

  const handleTakeAction = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Izin Ditolak",
        "Aplikasi memerlukan akses kamera untuk mengambil foto profil.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync(pickerOptions);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Izin Ditolak",
        "Aplikasi memerlukan akses galeri untuk memilih foto profil.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const requestAvatarChange = () => {
    Alert.alert(
      "Ubah Avatar",
      "Pilih metode untuk mengubah foto profil Anda:",
      [
        { text: "Kamera", onPress: handleTakeAction },
        { text: "Galeri", onPress: handlePickImage },
        { text: "Batal", style: "cancel" },
      ],
      { cancelable: true },
    );
  };

  const handleSaveChanges = () => {
    const updatedData = { name, email, bio, avatar };
    console.log("Simpan ke Database/API:", updatedData);
    Alert.alert("Sukses", "Profil berhasil diperbaharui!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.changeAvatarBtn}
            onPress={requestAvatarChange}
          >
            <Text style={styles.changeAvatarText}>Ubah Foto Profil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nama Anda"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Anda"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Bio singkat"
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007BFF",
    backgroundColor: "#E9ECEF",
  },
  changeAvatarBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  changeAvatarText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CED4DA",
    fontSize: 16,
    color: "#212529",
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#28A745",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
