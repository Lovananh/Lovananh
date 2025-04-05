import React, { useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tin Yêu Thích</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { marginBottom: 10, backgroundColor: "white", padding: 10, borderRadius: 10 },
  image: { width: "100%", height: 150, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
});

export default FavoriteScreen;
