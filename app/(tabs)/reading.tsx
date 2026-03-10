import React, { useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ReadingMission() {
  // State untuk pilihan tipe konten
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState("");
  const [content, setContent] = useState("");

  const userData = useQuery(api.users.get); 
  const addReview = useMutation(api.reviews.addReview);

  const handleSubmit = async () => {
    if (!bookTitle || !content) {
      Alert.alert("Input Kosong", "Harap isi semua kolom.");
      return;
    }

    if (!userData || userData.length === 0) {
      Alert.alert("Error", "User tidak ditemukan.");
      return;
    }

    try {
      await addReview({
        userId: userData[0]._id, 
        bookTitle: bookTitle,
        content: content,
        type: selectedType || "review", // Menggunakan tipe yang dipilih
      });

      Alert.alert("Sukses", `${selectedType} berhasil dikirim! Poin bertambah.`);
      // Reset semua
      setBookTitle("");
      setContent("");
      setSelectedType(null); 
    } catch (err: any) {
      Alert.alert("Terjadi error", err.message || "Unknown error");
    }
  };

  if (userData === undefined) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mission Membaca/Reveiw Buku 📖</Text>
      
      <View style={styles.pointBox}>
        <Text style={styles.userText}>Halo, {userData[0]?.name}</Text>
        <Text style={styles.pointText}>Total Poin: {userData[0]?.points || 0} ⭐</Text>
      </View>

      {/* TAMPILAN PILIHAN (Muncul jika belum pilih tipe) */}
      {!selectedType ? (
        <View>
          <Text style={styles.instruction}>Pilih:</Text>
          <TouchableOpacity style={styles.choiceBtn} onPress={() => setSelectedType("Review")}>
            <Text style={styles.choiceText}>📝 Kirim Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceBtn} onPress={() => setSelectedType("Ringkasan")}>
            <Text style={styles.choiceText}>📑 Kirim Ringkasan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choiceBtn} onPress={() => setSelectedType("Video")}>
            <Text style={styles.choiceText}>🎥 Kirim Video (Link)</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* TAMPILAN FORM (Muncul setelah pilih tipe) */
        <View style={styles.formCard}>
          <Text style={styles.selectedTitle}>Kirim {selectedType}</Text>
          
          <Text style={styles.label}>Judul Buku:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ketik judul buku..."
            value={bookTitle}
            onChangeText={setBookTitle}
          />

          <Text style={styles.label}>
            {selectedType === "Video" ? "Link Video (YouTube/Drive):" : `Isi ${selectedType}:`}
          </Text>
          <TextInput
            style={[styles.input, { height: selectedType === "Video" ? 50 : 100 }]}
            placeholder={selectedType === "Video" ? "Masukkan URL video..." : `Tulis ${selectedType} kamu di sini...`}
            multiline={selectedType !== "Video"}
            value={content}
            onChangeText={setContent}
          />

          <View style={styles.buttonGroup}>
            <Button title="Kirim & Klaim Poin" color="#023047" onPress={handleSubmit} />
            <TouchableOpacity onPress={() => setSelectedType(null)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Kembali ke Pilihan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#023047", textAlign: 'center' },
  pointBox: { backgroundColor: "#FFB703", padding: 15, borderRadius: 10, marginBottom: 25 },
  userText: { fontSize: 16 },
  pointText: { fontSize: 18, fontWeight: "bold" },
  instruction: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  choiceBtn: { backgroundColor: "#eee", padding: 18, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: "#ccc" },
  choiceText: { fontSize: 16, fontWeight: "600", color: "#023047" },
  formCard: { backgroundColor: "#fff", padding: 15, borderRadius: 12, elevation: 3 },
  selectedTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#023047", textDecorationLine: 'underline' },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  buttonGroup: { gap: 10 },
  cancelBtn: { alignItems: 'center', marginTop: 10 },
  cancelText: { color: 'red', fontWeight: '600' }
});