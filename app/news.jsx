import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

const apiKey = process.env.EXPO_PUBLIC_NEWS_KEY;
const pageSize = 3; // Set to 3 to ensure at least 3 items per page

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=farming OR agriculture OR crops&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setTotalResults(data.totalResults);
      setNewsData(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(totalResults / pageSize)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EBB20E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.newsCard} showsVerticalScrollIndicator={false}>
        {newsData.map((newsItem, index) => (
          <View key={index} style={styles.newsItem}>
            <Image source={{ uri: newsItem.urlToImage }} style={styles.image} />
            <Text style={styles.heading}>{newsItem.title}</Text>
            <Text style={styles.description}>{newsItem.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        <Button
          title="Previous"
          onPress={handlePreviousPage}
          disabled={page === 1}
          color="#EBB20E"
        />
        <Text style={styles.pageNumber}>Page {page}</Text>
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={page >= Math.ceil(totalResults / pageSize)}
          color="#EBB20E"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-mid",
    color: "#EBB20E",
    marginBottom: 15,
  },
  newsItem: {
    marginBottom: 15, // Increased margin to separate items
    borderBottomWidth: 1,
    borderBottomColor: "#8F8e8d",
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  heading: {
    fontSize: 18,
    fontFamily: "outfit",
    color: "#EBB20E",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#8F8e8d",
  },
  newsCard: {
    
    flex: 1,
    gap: 10,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 35,
    marginTop : 50
  },
  pageNumber: {
    fontSize: 16,
    color: "#EBB20E",
  },
});