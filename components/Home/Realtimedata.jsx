import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { realTimeDatabase } from '../../config/FirebaseConfig';
import Colors from "../../constants/Colors";

export default function Realtimedata() {
  const [temperature, setTemperature] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const animatedValue = useRef(new Animated.Value(1)).current;

  const [dataVisibility, setDataVisibility] = useState({
    temperature:true,
    soilMoisture:true,
    pressure:true,
    altitude:true,
    humidity:true,
  }) 

  // animation for icons
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.5, 
          duration: 1000, 
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  useEffect(() => {
    const dataRef = ref(realTimeDatabase, '/data'); 
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();

      if (fetchedData) {
        const records = Object.values(fetchedData);
        if (records.length > 0) {
          const latestRecord = records[records.length - 1];
          
          if (latestRecord && latestRecord.data) {
            const dataString = latestRecord.data;
            
            const parsedData = dataString.split(", ").reduce((acc, curr) => {
              const [key, value] = curr.split(": ");
              if (key && value) {
                acc[key.trim()] = value.trim();
              }
              return acc;
            }, {});
            
            setTemperature(parsedData['Temperature']);
            setSoilMoisture(parsedData['Soil Moisture']);
            setPressure(parsedData['Pressure']);
            setAltitude(parsedData['Altitude']);
            setHumidity(parsedData['Humidity']);
          } else {
            console.error('No data field found in the latest record.');
          }
        } else {
          console.error('No records found in Firebase.');
        }
      } else {
        console.error('No data found in Firebase.');
      }
    }, (error) => {
      console.error('Error fetching data:', error);
    });

    return () => unsubscribe();
  }, []);

  // Toggle visibility on touch
  const handlepress = (key) => {
    setDataVisibility((prevVisibility) => ({
      ...prevVisibility,
      [key]: !prevVisibility[key],
    }));
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-mid", fontSize: 20 }}>
        Realtime Data
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 30,
          alignItems: "flex-start",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => handlepress('temperature')} style={{ width: "100%" }}>
          <View style={styles.container}>
            <Animated.Image
              source={require("./../../assets/images/temperature-icon.png")}
              style={[styles.icon, { transform: [{ scale: animatedValue }] }]}
            />
            {dataVisibility.temperature && (
              <Text style={styles.text}>
                {temperature ? `Temperature: ${temperature}` : 'Temperature'}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlepress('soilMoisture')} style={{ width: "100%" }}>
          <View style={styles.container}>
            <Animated.Image
              source={require("./../../assets/images/soil-moisture-icon.png")}
              style={[styles.icon, { transform: [{ scale: animatedValue }] }]}
            />
            {dataVisibility.soilMoisture && (
              <Text style={styles.text}>
                {soilMoisture ? `Soil Moisture: ${soilMoisture}` : 'Soil Moisture'}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlepress('pressure')} style={{ width: "100%" }}>
          <View style={styles.container}>
            <Animated.Image
              source={require("./../../assets/images/pressure-icon.png")}
              style={[styles.icon, { transform: [{ scale: animatedValue }] }]}
            />
            {dataVisibility.pressure && (
              <Text style={styles.text}>
                {pressure ? `Pressure: ${pressure}` : 'Pressure'}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlepress('altitude')} style={{ width: "100%" }}>
          <View style={styles.container}>
            <Animated.Image
              source={require("./../../assets/images/altitude-icon.png")}
              style={[styles.icon, { transform: [{ scale: animatedValue }] }]}
            />
            {dataVisibility.altitude && (
              <Text style={styles.text}>
                {altitude ? `Altitude: ${altitude}` : 'Altitude'}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlepress('humidity')} style={{ width: "100%" }}>
          <View style={styles.container}>
            <Animated.Image
              source={require("./../../assets/images/humidity-icon.png")}
              style={[styles.icon, { transform: [{ scale: animatedValue }] }]}
            />
            {dataVisibility.humidity && (
              <Text style={styles.text}>
                {humidity ? `Humidity: ${humidity}` : 'Humidity'}
              </Text>
            )}
          </View>
        </TouchableOpacity>
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
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  text: {
    fontFamily: "outfit-mid",
    fontSize: 20,
    color: Colors.GRAY,
  },
  icon: {
    width: 40,
    height: 40,
  },
});