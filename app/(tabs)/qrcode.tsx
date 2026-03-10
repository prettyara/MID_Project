import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRGenerator() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Rak Buku TI</Text>

      <QRCode
        value="RAK_TI_01"
        size={220}
      />

      <Text style={styles.text}>
        Scan QR ini untuk mendapatkan poin
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  title:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:20
  },

  text:{
    marginTop:20
  }
});