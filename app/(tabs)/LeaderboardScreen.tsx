import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

export default function LeaderboardScreen() {
  const leaderboardData = useQuery(api.promos.getLeaderboard);

  if (leaderboardData === undefined) {
    return (
      <View style={styles.loadingCenter}>
        <ActivityIndicator size="large" color="#023047" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>Leaderboard Pengunjung 📊</Text>
        <Text style={styles.subtitle}>Siapa yang paling aktif di Perpustakaan?</Text>
      </View>

      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => {
          // Logika Warna untuk 3 Besar
          const isTop3 = index < 3;
          const trophyColor = index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32";

          return (
            <View style={[styles.rankCard, isTop3 && styles.top3Card]}>
              <View style={styles.leftSection}>
                <Text style={[styles.rankNumber, isTop3 && { color: trophyColor }]}>
                  {index + 1}
                </Text>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={20} color="#fff" />
                </View>
                <Text style={styles.nameText}>{item.name}</Text>
              </View>

              <View style={styles.rightSection}>
                <Text style={styles.pointsText}>{item.points} Poin</Text>
                {isTop3 && <Ionicons name="trophy" size={20} color={trophyColor} style={{marginLeft: 5}} />}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F9" },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBox: { padding: 30, backgroundColor: "#023047", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 13, color: "#8ecae6", textAlign: "center", marginTop: 5 },
  rankCard: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    marginHorizontal: 20, 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 10,
    elevation: 2 
  },
  top3Card: { borderWidth: 1, borderColor: "#BDE0FE", backgroundColor: "#fff" },
  leftSection: { flexDirection: "row", alignItems: "center" },
  rankNumber: { fontSize: 18, fontWeight: "bold", color: "#999", width: 30 },
  avatar: { backgroundColor: "#023047", padding: 8, borderRadius: 20, marginRight: 10 },
  nameText: { fontSize: 16, fontWeight: "600", color: "#023047" },
  rightSection: { flexDirection: "row", alignItems: "center" },
  pointsText: { fontSize: 15, fontWeight: "bold", color: "#2a9d8f" }
});