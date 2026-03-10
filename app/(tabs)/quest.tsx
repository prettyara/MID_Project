import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Quest() {

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <Text>Meminta izin kamera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Aplikasi membutuhkan akses kamera</Text>
        <Button title="Izinkan Kamera" onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = ({ data }: any) => {
    setScanned(true);
    alert("QR berhasil di scan: " + data);
    setShowCamera(false);
  };

  return (
    <View style={{ flex: 1 }}>

      {!showCamera && (
        <View style={styles.center}>
          <Button
            title="Scan QR Perpustakaan"
            onPress={() => {
              setScanned(false);
              setShowCamera(true);
            }}
          />
        </View>
      )}

      {showCamera && (
        <View style={{ flex: 1 }}>

          <CameraView
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={scanned ? undefined : handleScan}
          />

          {/* Frame Scanner */}
          <View style={styles.overlay}>
            <View style={styles.scanBox} />
          </View>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#00FFAA",
    borderRadius: 10,
  }

});