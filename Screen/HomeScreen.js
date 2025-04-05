import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { ActivityIndicator, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const API_KEY = "b02531e2262e4580a3e3a5ea1bb1a9e5"; // Thay bằng API Key của bạn
const CATEGORIES = ["technology", "sports", "entertainment", "general"];

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("technology");
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  const toggleFavorite = (article) => {
    if (favorites.some((fav) => fav.title === article.title)) {
      setFavorites(favorites.filter((fav) => fav.title !== article.title));
    } else {
      setFavorites([...favorites, article]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Thanh chọn danh mục */}
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                category === cat && styles.categoryTextActive,
              ]}
            >
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hiển thị danh sách tin tức */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.actions}>
                {/* Nút "Đọc thêm" */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetailScreen", { article: item })
                  }
                >
                  <Text style={styles.link}>Đọc thêm</Text>
                </TouchableOpacity>

                {/* Nút yêu thích */}
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Ionicons
                    name={
                      favorites.some((fav) => fav.title === item.title)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f9fa" },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  categoryButtonActive: {
    backgroundColor: "#007BFF",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryTextActive: {
    color: "#fff",
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  image: { width: "100%", height: 200, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginVertical: 5 },
  link: { color: "blue", marginTop: 5 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default HomeScreen;
