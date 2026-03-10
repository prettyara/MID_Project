import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {

  const menus = [
    { title: "Quest Perpustakaan", icon: "trophy-outline", route: "/quest" },
    { title: "Tebus Poin Membaca", icon: "gift-outline", route: "/reading" },
    { title: "Promo Buku Fakultas", icon: "megaphone-outline", route: "/promo" },
    { title: "Scan QR Rak Buku", icon: "qr-code-outline", route: "/scan" },
    { title: "Leaderboard Pengunjung", icon: "podium-outline", route: "/LeaderboardScreen" },
  ];

  return (

    <LinearGradient
      colors={["#023047","#03506F","#04668D"]}
      style={styles.container}
    >

      <Text style={styles.title}>Unklab Library</Text>
      <Text style={styles.subtitle}>Temukan buku favoritmu</Text>

      <View style={styles.grid}>

        {menus.map((menu,index)=>(
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={()=>router.push(menu.route as any)}
          >

            <Ionicons name={menu.icon as any} size={34} color="#023047"/>

            <Text style={styles.cardText}>
              {menu.title}
            </Text>

          </TouchableOpacity>
        ))}

      </View>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingTop:60,
    paddingHorizontal:20
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    color:"#FFB703"
  },

  subtitle:{
    color:"#fff",
    marginBottom:25
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  card:{
    width:"47%",
    height:120,
    backgroundColor:"#FFB703",
    borderRadius:16,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:18,
    shadowColor:"#000",
    shadowOpacity:0.2,
    shadowRadius:6,
    elevation:4
  },

  cardText:{
    marginTop:10,
    fontSize:14,
    fontWeight:"bold",
    color:"#023047",
    textAlign:"center"
  }

});