import { StyleSheet, Text, View } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <Text>Selamat datang di Praktikum Pemrograman Perangkat Bergerak</Text>
      <Text>Nama: Imron</Text>
      <Text>NIM: 232310021</Text>
      <Text>Prodi: Teknologi Informasi</Text>
      <Text>Angkatan: 2024</Text>
      <Text>Kelas: TI24PA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
