import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
export default function Realtimedata() {
  const [temperature, setTemperature] = useState(30);
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [pressure, setPressure] = useState(101);
  const [altitude, setAltitude] = useState(200);
  const [humidity, setHumidity] = useState(15);

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-mid",
          fontSize: 20,
        }}
      >
        Realtime Data
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "col",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 30,
          alignItems: "flex-start",
          marginTop : 10
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/temperature-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{temperature}°C</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/soil-moisture-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{soilMoisture}%</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/pressure-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{pressure} hPa</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/altitude-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{altitude} m</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/humidity-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{humidity}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TERTIARY,
    width: "100%",
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  text: {
    fontFamily: "outfit-mid",
    fontSize: 20,
    color: Colors.GRAY,
  },
});
