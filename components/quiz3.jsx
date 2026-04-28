import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [nama, setNama] = useState("Anton");
  const [nim, setNim] = useState("2323");
  const [alamat, setAlamat] = useState("Bogor");
  const [email, setEmail] = useState("anton@mail");
  const [notelp, setNotelp] = useState("0812");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            style={styles.headers.img}
            source={require("../assets/avatar/avatar.png")}
          />

          <Text style={styles.headers.title}>Nama: {nama}</Text>
          <Text style={styles.headers.subtitle}>NIM: {nim}</Text>
          <Text style={styles.headers.subtitle}>Email: {email}</Text>
          <Text style={styles.headers.subtitle}>NOTELP: {notelp}</Text>
          <Text style={styles.headers.subtitle}>Alamat: {alamat}</Text>

          {/* Bagian Input */}
          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.headers.subtitle}>Nama</Text>
              <TextInput
                value={nama}
                onChangeText={setNama}
                style={styles.identity.input_text}
              />
            </View>
          </View>

          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.headers.subtitle}>NIM</Text>
              <TextInput
                value={nim}
                onChangeText={setNim}
                style={styles.identity.input_text}
              />
            </View>
          </View>

          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.headers.subtitle}>EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.identity.input_text}
              />
            </View>
          </View>

          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.headers.subtitle}>ALAMAT</Text>
              <TextInput
                value={alamat}
                onChangeText={setAlamat}
                style={styles.identity.input_text}
              />
            </View>
          </View>

          <View style={styles.identity.container}>
            <View style={styles.identity.card_input}>
              <Text style={styles.headers.subtitle}>NO TELP</Text>
              <TextInput
                value={notelp}
                onChangeText={setNotelp}
                style={styles.identity.input_text}
              />
            </View>
          </View>

          {/* <View style={styles.identity.container}>
            <TouchableOpacity style={styles.identity.button}>
              <Text style={styles.identity.button_text}>Save</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headers: {
    title: {
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 10,
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 16,
      color: "red",
    },
    img: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderColor: "black",
      borderWidth: 4,
      backgroundColor: "#f2f2f2",
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
      paddingHorizontal: 20,
      marginTop: 15,
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
      paddingVertical: 5,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0ea6d0",
      padding: 15,
      borderRadius: 10,
      marginBottom: 30,
    },
    button_text: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
  },
});

export default Index;
