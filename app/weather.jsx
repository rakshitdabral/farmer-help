import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location"; // Import expo-location
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  

  useEffect(() => {
    const apiKey = process.env.EXPO_PUBLIC_WEATHER_KEY;

    const fetchWeatherData = async (latitude, longitude) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          setLoading(false);
          return;
        }

        // Get user's current location
        const location = await Location.getCurrentPositionAsync({});
        fetchWeatherData(location.coords.latitude, location.coords.longitude);
      } catch (err) {
        setError("Failed to get location");
        setLoading(false);
        console.error(err);
      }
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  const rainfallData = weatherData?.rain
    ? weatherData.rain["1h"] || weatherData.rain["3h"] || 0
    : 0;

  return (
    <View style={{
      height : '100%',
      padding: 20,
      marginTop: 0,
      
    }}>
      <View
        style={{
          flexDirection: "row",
          height: 20,
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Weather Information</Text>
        {weatherData ? (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome name="map-marker" size={24} color={Colors.PRIMARY} />
              <Text style={styles.infoText}>City: {weatherData.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome
                name="thermometer-three-quarters"
                size={24}
                color={Colors.PRIMARY}
              />
              <Text style={styles.infoText}>
                Temperature: {weatherData.main.temp}°C
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="wb-sunny" size={24} color={Colors.PRIMARY} />
              <Text style={styles.infoText}>
                Condition: {weatherData.weather[0].description}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="opacity" size={24} color={Colors.PRIMARY} />
              <Text style={styles.infoText}>
                Humidity: {weatherData.main.humidity}%
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="air" size={24} color={Colors.PRIMARY} />
              <Text style={styles.infoText}>
                Wind Speed: {weatherData.wind.speed} m/s
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="grain" size={24} color={Colors.PRIMARY} />
              <Text style={styles.infoText}>Rainfall: {rainfallData} mm</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.infoText}>No data available</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-mid",
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 18,
    fontFamily: "outfit",
    color: Colors.GRAY,
    marginLeft: 10,
  },
  errorText: {
    color: Colors.ERROR,
  },
});
