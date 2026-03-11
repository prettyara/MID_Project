import { useQuery } from "convex/react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import LibraryStatus from "../../components/LibraryStatus";
import { api } from "../../convex/_generated/api";

export default function HomeScreen() {
  // Mengambil data dari Convex
  const libraryInfo = useQuery(api.LibraryInfo.getStatus);
  const newArrivals = useQuery(api.books.getNewArrivals);

  // Menangani status loading saat data belum sampai
  if (libraryInfo === undefined || newArrivals === undefined) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Memuat data perpustakaan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Status Perpustakaan */}
      <LibraryStatus data={libraryInfo} />

      {/* Daftar Buku Terbaru */}
      <Text style={styles.sectionTitle}>New Arrivals 📚</Text>
      
      <FlatList
        data={newArrivals}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Belum ada buku baru saat ini.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 50, 
    backgroundColor: "#F4F7F9" 
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginVertical: 15 
  },
  bookCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#eee' 
  },
  bookTitle: { fontSize: 16, fontWeight: '600' },
  author: { fontSize: 14, color: '#666' }
});