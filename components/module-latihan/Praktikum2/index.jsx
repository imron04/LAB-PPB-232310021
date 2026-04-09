import { StyleSheet, Text, View } from "react-native";

const Praktikum2 = () => {
  const personalData = {
    name: "Imron",
    tinggiBadan: 165,
    beratBadan: 50,
  };
  const dailyPortion = [
    { waktu: "Sarapan", kalori: 400 },
    { waktu: "Lunch", kalori: 600 },
    { waktu: "Dinner", kalori: 500 },
    { waktu: "Cemilan Time", kalori: 100 },
  ];
  const totalKalori = dailyPortion.reduce((acc, item) => {
    return acc + item.kalori;
  }, 0);

  const tinggiBdn = personalData.tinggiBadan / 100;
  const BMI = personalData.beratBadan / (tinggiBdn * tinggiBdn);

  const statusBMI = () => {
    if (BMI < 18.5) return "Kurus";
    if (BMI >= 18.5 && BMI <= 22.9) return "Ideal";
    return "Obesitas";
  };

  const calNeeded = personalData.beratBadan * 30;

  const statusKalori = () => {
    if (totalKalori < calNeeded - 100) return "Kurang";
    if (totalKalori > calNeeded + 100) return "Berlebih";
    return "Ideal";
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Evaluasi Berat Badan Ideal</Text>
      <Text style={style.title}>Pasien</Text>
      <Text>Nama: {personalData.name}</Text>
      <Text>Berat Badan: {personalData.beratBadan}</Text>
      <Text>Tinggi Badan: {personalData.tinggiBadan}</Text>

      <Text style={style.title}>Porsi Makanan Harian</Text>
      {dailyPortion.map((item, index) => (
        <View key={index}>
          <Text>
            {item.waktu} -- {item.kalori} kalori
          </Text>
        </View>
      ))}
      <Text>Total Kalori: {totalKalori}</Text>

      <Text style={style.title}>Hasil Perhitungan</Text>
      <Text>BMI: {BMI.toFixed(2)}</Text>
      <Text>Status BMI: {statusBMI()}</Text>

      <Text style={style.title}>Berat badan</Text>
      <Text>
        Berat badan {statusBMI()} dan asupan kalori {statusKalori()}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Praktikum2;
