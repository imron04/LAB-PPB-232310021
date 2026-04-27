import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const ProfileCard = () => {
  const biodata = {
    nama: "Budi Setiawan",
    usia: 22,
    TTL: "Bogor, 01 Jan 2000",
    gender: "MALE",
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.outerBorder}>
          <View style={styles.innerWhiteGap}>
            <Image
              source={{
                uri: "https://www.thanglongwaterpuppet.org/wp-content/uploads/2025/10/meme-gigachad-doc-la.jpg",
              }}
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          {Object.entries(biodata).map(([key, value]) => (
            <View key={key} style={styles.inputDisabled}>
              <Text style={styles.label}>{key.toUpperCase()}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}

          {/* <View style={[styles.inputDisabled, { marginTop: 10 }]}>
            <Text style={styles.label}>STATUS</Text>
            <Text style={styles.value}>Active User</Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  card: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  outerBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#E1306C",
    justifyContent: "center",
    alignItems: "center",
  },
  innerWhiteGap: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },

  infoContainer: {
    flex: 1,
    marginLeft: 20,
    gap: 10,
  },
  inputDisabled: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 10,
    color: "#888",
    fontWeight: "bold",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});

export default ProfileCard;
