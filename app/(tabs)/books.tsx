import { useQuery } from "convex/react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { api } from "../../convex/_generated/api";

export default function BooksScreen() {
  const books = useQuery(api.books.getAllBooks);

  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bisa dipinjam': return '#28a745'; 
      case 'Hanya baca di tempat': return '#fd7e14'; 
      case 'Referensi': return '#007bff'; 
      case 'Donasi': return '#6f42c1'; 
      case 'Ebook only': return '#17a2b8'; 
      default: return '#6c757d'; 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Katalog Perpustakaan</Text>

      {}
      {books === undefined ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                {}
                <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>
              
              <Text style={styles.author}>Penulis: {item.author}</Text>
              
              {}
              {item.status !== 'Bisa dipinjam' && (
                <Text style={styles.note}>
                  * Buku ini tidak tersedia untuk dipinjam keluar.
                </Text>
              )}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Belum ada data buku.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  listContent: { paddingBottom: 20 },
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700', flex: 1, marginRight: 10 },
  author: { fontSize: 14, color: '#555', marginBottom: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  note: { fontSize: 12, color: '#d9534f', fontStyle: 'italic', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 50, color: '#888' }
});