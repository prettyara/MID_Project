import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api"; // Perhatikan titiknya ada dua (../../)

export default function ScanScreen() {
  const [scanned, setScanned] = useState(false);
  
  // Ambil fungsi dari backend
  const recordVisit = useMutation(api.promos.recordVisit);

  const handleBarCodeScanned = async ({ data }: any) => {
    if (scanned) return;
    setScanned(true);

    try {
      await recordVisit({
        userId: "Adriel", 
        location: data, 
      });
      Alert.alert("Berhasil!", "Data masuk ke Convex");
    } catch (error) {
      console.error(error);
      setScanned(false);
    }
  };

  return (
    <View>
      {/* Pasang kamera scanner kamu di sini */}
    </View>
  );
}