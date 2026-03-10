import { useQuery } from "convex/react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { api } from "../../convex/_generated/api";

export default function LeaderboardScreen() {
  // Memanggil fungsi getTopUsers dari convex/leaderboard.ts
  const topUsers = useQuery(api.leaderboard.getTopUsers);

  // 1. Loading State: Menampilkan indikator loading saat data diambil
  if (topUsers === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Memuat Peringkat...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Peringkat Pembaca</Text>
        <Text style={styles.subtitle}>Daftar pembaca teraktif minggu ini</Text>
      </View>

      <FlatList
        data={topUsers}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View style={styles.leftSection}>
              {/* Menampilkan nomor peringkat */}
              <Text style={[
                styles.rank, 
                index === 0 && styles.firstPlace,
                index === 1 && styles.secondPlace,
                index === 2 && styles.thirdPlace
              ]}>
                {index + 1}
              </Text>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.faculty}>{item.faculty}</Text>
              </View>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.points}>{item.points ?? 0}</Text>
              <Text style={styles.ptsLabel}>pts</Text>
            </View>
          </View>
        )}
        // Komponen jika data kosong
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada data tersedia.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  item: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // Shadow untuk iOS & Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9CA3AF",
    width: 35,
  },
  firstPlace: { color: "#FBBF24" }, // Emas
  secondPlace: { color: "#94A3B8" }, // Perak
  thirdPlace: { color: "#B45309" }, // Perunggu
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  faculty: {
    fontSize: 12,
    color: "#6B7280",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  ptsLabel: {
    fontSize: 10,
    color: "#4F46E5",
    textTransform: "uppercase",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#9CA3AF",
  }
});