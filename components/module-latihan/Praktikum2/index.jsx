import { StyleSheet, Text, View } from "react-native";

const Praktikum2 = () => {
  // objek berisi data pribadi
  const personalData = {
    name: "Imron",
    tinggiBadan: 165,
    beratBadan: 50,
  };

  // array of object berisi asupan harian
  const dailyPortion = [
    { waktu: "Sarapan", kalori: 400 },
    { waktu: "Lunch", kalori: 600 },
    { waktu: "Dinner", kalori: 500 },
    { waktu: "Cemilan Time", kalori: 100 },
  ];

  // menjumlahkan total kalori menggunakan reduce
  const totalKalori = dailyPortion.reduce((acc, item) => {
    return acc + item.kalori;
  }, 0);

  const tinggiBdn = personalData.tinggiBadan / 100; // Konversi tinggi badan ke meter
  const BMI = personalData.beratBadan / (tinggiBdn * tinggiBdn); // hitung bmi

  // status BMI berdasarkan hasil perhitungan
  const statusBMI = () => {
    if (BMI < 18.5) return "Kurus";
    if (BMI >= 18.5 && BMI <= 22.9) return "Ideal";
    return "Obesitas";
  };

  // jumlah kalori harian yang diperlukan
  const calNeeded = personalData.beratBadan * 30;

  // status kalori
  const statusKalori = () => {
    if (totalKalori < calNeeded - 100) return "Kurang";
    if (totalKalori > calNeeded + 100) return "Berlebih";
    return "Cukup";
  };

  const kesimpulan = () => {
    const bmi = statusBMI();
    const kalori = statusKalori();

    // Kesimpulan berdasarkan kesesuaian kondisi BMI dan asupan kalori
    if (bmi == "Ideal" && kalori == "Cukup")
      return "Berat badan anda ideal dan asupan kalori sudah terpenuhi";
    if (bmi == "Ideal") {
      if (kalori == "Berlebih")
        return "Berat badan anda ideal tetapi asupan kalori berlebih";
      if (kalori == "Kurang")
        return "Berat badan anda ideal tetapi asupan kalori harian kurang";
    }
    if (bmi == "Kurus") {
      if (kalori == "Berlebih")
        return "Berat badan anda kurang dan asupan harian berlebih";
      if (kalori == "Cukup")
        return "Berat badan anda kurang tetapi asupan kalori harian cukup";
      if (kalori == "Kurang")
        return "Berat badan anda kurang dan asupan kalori harian juga kurang";
    }
    if (bmi == "Obesitas") {
      if (kalori == "Berlebih")
        return "Berat badan anda berlebihan dan asupan kalori harian juga berlebihan";
      if (kalori == "Cukup")
        return "Berat badan anda berlebihan dan asupan kalori cukup";
      if (kalori == "Kurang")
        return "Berat badan anda berlebihan dan asupan kalori harian kurang";
    }
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

      <Text style={style.title}>{kesimpulan()}</Text>
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
