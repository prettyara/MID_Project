import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const FAKULTAS = ["Filkom", "Keperawatan", "Filsafat", "Pendidikan", "Ekonomi"];

// DATA REKOMENDASI DENGAN FITUR LOKASI RAK & STATUS
const REKOMENDASI_LOKAL: any = {
  Filkom: [
    { _id: "L1", bookTitle: "Clean Code", author: "Robert C. Martin", recommendedBy: "Dekan Filkom", description: "Buku wajib agar kode program rapi dan mudah dikelola.", location: "Lantai 2, Rak A-01", status: "Tersedia" },
    { _id: "L2", bookTitle: "Pragmatic Programmer", author: "Andrew Hunt", recommendedBy: "Kaprodi IF", description: "Tips praktis menjadi programmer profesional.", location: "Lantai 2, Rak A-05", status: "Dipinjam" }
  ],
  Keperawatan: [
    { _id: "L3", bookTitle: "Anatomi Fisiologi", author: "Dr. Syaifuddin", recommendedBy: "Kaprodi Kep", description: "Memahami sistem tubuh manusia untuk praktik medis.", location: "Lantai 3, Rak B-10", status: "Tersedia" }
  ],
  Filsafat: [
    { _id: "L4", bookTitle: "Dunia Sophie", author: "Jostein Gaarder", recommendedBy: "Dosen Filsafat", description: "Novel sejarah filsafat yang sangat menarik.", location: "Lantai 1, Rak C-02", status: "Tersedia" }
  ],
  Pendidikan: [
    { _id: "L5", bookTitle: "Strategi Belajar Mengajar", author: "Prof. Hamruni", recommendedBy: "Admin FKIP", description: "Metode mengajar efektif untuk calon guru.", location: "Lantai 1, Rak D-04", status: "Tersedia" }
  ],
  Ekonomi: [
    { _id: "L6", bookTitle: "The Intelligent Investor", author: "Benjamin Graham", recommendedBy: "Dosen Manajemen", description: "Panduan utama memahami pasar modal.", location: "Lantai 2, Rak E-01", status: "Dipinjam" }
  ],
};

export default function PromoScreen() {
  const [selectedFaculty, setSelectedFaculty] = useState("Filkom");
  
  // Ambil data dari database Convex (Pastikan api.promos.getByFaculty sudah ada di backend)
  const promoBooksFromDB = useQuery(api.promos.getByFaculty, { faculty: selectedFaculty });

  // Logika: Gunakan data DB jika ada, jika tidak pakai data lokal
  const displayData = promoBooksFromDB && promoBooksFromDB.length > 0 
    ? promoBooksFromDB 
    : REKOMENDASI_LOKAL[selectedFaculty] || [];

  const handleCheckAvailability = (item: any) => {
    if (item.status === "Dipinjam") {
      Alert.alert("Status Buku", `Maaf, buku "${item.bookTitle}" sedang dipinjam. Silahkan cek kembali minggu depan.`);
    } else {
      Alert.alert(
        "Buku Tersedia!",
        `Silahkan ambil di:\n📍 ${item.location || "Rak Referensi"}\n\nSegera ke perpustakaan ya!`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rekomendasi Fakultas 📢</Text>

      {/* Selector Fakultas */}
      <View style={{ height: 50, marginBottom: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FAKULTAS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.tab, selectedFaculty === f && styles.tabActive]}
              onPress={() => setSelectedFaculty(f)}
            >
              <Text style={[styles.tabText, selectedFaculty === f && styles.tabTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Loading State */}
      {promoBooksFromDB === undefined && (
        <ActivityIndicator size="small" color="#023047" style={{ marginBottom: 15 }} />
      )}

      {/* List Buku Promo */}
      <FlatList
        data={displayData}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <View style={styles.bookInfo}>
              <View style={styles.iconCircle}>
                <Ionicons name="book" size={26} color="#fff" />
              </View>
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={styles.bookTitle}>{item.bookTitle}</Text>
                <Text style={styles.author}>Oleh: {item.author}</Text>
                
                {/* Status Badge */}
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: item.status === "Dipinjam" ? "#e63946" : "#2a9d8f" }
                ]}>
                  <Text style={styles.statusText}>{item.status || "Tersedia"}</Text>
                </View>
              </View>
            </View>

            <View style={styles.recommenderBadge}>
              <Text style={styles.recommenderText}>⭐ Rekomendasi: {item.recommendedBy}</Text>
            </View>

            <Text style={styles.desc}>"{item.description}"</Text>

            {/* Info Lokasi Rak */}
            <View style={styles.locationBox}>
              <Ionicons name="location" size={16} color="#023047" />
              <Text style={styles.locationText}>
                Lokasi: <Text style={{fontWeight: 'bold'}}>{item.location || "Cek Petugas"}</Text>
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.visitBtn, item.status === "Dipinjam" && { backgroundColor: '#ccc' }]}
              onPress={() => handleCheckAvailability(item)}
            >
              <Text style={styles.visitBtnText}>
                {item.status === "Dipinjam" ? "Buku Tidak Tersedia" : "Cek Ketersediaan di Rak"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
             <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
             <Text style={styles.empty}>Belum ada rekomendasi baru.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F4F7F9", paddingTop: 60 },
  header: { fontSize: 24, fontWeight: "bold", color: "#023047", marginBottom: 20 },
  tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, backgroundColor: "#E0E0E0", marginRight: 10, height: 45, justifyContent: 'center' },
  tabActive: { backgroundColor: "#023047" },
  tabText: { color: "#023047", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  bookCard: { backgroundColor: "#fff", padding: 18, borderRadius: 20, marginBottom: 15, elevation: 4 },
  bookInfo: { flexDirection: "row", alignItems: "center" },
  iconCircle: { backgroundColor: "#023047", padding: 10, borderRadius: 15 },
  bookTitle: { fontSize: 18, fontWeight: "bold", color: "#023047" },
  author: { color: "#777", fontSize: 14 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, marginTop: 5 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  recommenderBadge: { backgroundColor: "#FFB703", alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5, marginTop: 10 },
  recommenderText: { fontSize: 11, fontWeight: "bold", color: "#023047" },
  desc: { marginTop: 12, color: "#555", fontStyle: "italic", fontSize: 13 },
  locationBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9F5F8', padding: 10, borderRadius: 10, marginTop: 15 },
  locationText: { marginLeft: 8, fontSize: 13, color: '#023047' },
  visitBtn: { marginTop: 15, backgroundColor: "#023047", padding: 12, borderRadius: 10, alignItems: "center" },
  visitBtnText: { fontWeight: "bold", color: "#fff" },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  empty: { textAlign: "center", color: "#999", marginTop: 10 }
});