import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { realTimeDatabase } from '../../config/FirebaseConfig';
import Colors from "../../constants/Colors";

export default function Realtimedata() {
  const [temperature, setTemperature] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => { 
    const dataRef = ref(realTimeDatabase, '/data'); 
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      // console.log('Data from Firebase:', fetchedData);

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
          marginTop: 10
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/temperature-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{temperature || 'Loading...'}</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/soil-moisture-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{soilMoisture || 'Loading...'}</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/pressure-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{pressure || 'Loading...'} </Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/altitude-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{altitude || 'Loading...'} </Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/humidity-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{humidity || 'Loading...'}</Text>
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
