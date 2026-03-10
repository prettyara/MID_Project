import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"; // Library terbaru
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const recordVisit = useMutation(api.promos.recordVisit);

  // Minta izin otomatis saat komponen di-mount
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    // Permission masih loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Permission ditolak
    return (
      <View style={styles.container}>
        <Text style={styles.textCenter}>Kami butuh akses kamera untuk scan QR</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Beri Izin Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: any) => {
    if (scanned) return;
    setScanned(true);

    try {
      // Simulasi userId (Nanti ambil dari Auth)
      await recordVisit({
        userId: "Adriel",
        location: data, // Isi QR bisa berupa "Rak A1" atau JSON
      });

      Alert.alert("Berhasil!", `Kamu telah check-in di: ${data}`, [
        { text: "OK", onPress: () => setScanned(false) }
      ]);
    } catch (e) {
      Alert.alert("Error", "Gagal mengirim data ke server.");
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.overlay}>
          {/* Kotak Finder dari gambar konsep kamu */}
          <View style={styles.finder} />
          <Text style={styles.instruction}>Arahkan ke QR Code di Rak/Meja</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center" },
  textCenter: { color: "#fff", textAlign: "center", marginBottom: 20 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  finder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#FFB703", // Warna kuning orange sesuai tema kamu
    borderRadius: 20,
  },
  instruction: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(2, 48, 71, 0.8)",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FFB703",
    padding: 15,
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#023047", fontWeight: "bold" },
});