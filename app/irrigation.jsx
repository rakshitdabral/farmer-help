import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { realTimeDatabase } from './../config/FirebaseConfig';


const BACKGROUND_TASK_NAME = 'background-prediction-fetch';



TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
   
    const dataRef = ref(realTimeDatabase, '/data');
    const snapshot = await new Promise((resolve, reject) => onValue(dataRef, resolve, reject));
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

          const temperature = parsedData['Temperature'];
          const soilMoisture = parsedData['Soil Moisture'];
          const humidity = parsedData['Humidity'];

          const cleanValue = (value) => {
            return value.replace("*C", "").replace("%", "").trim();
          };

          
          const apiUrl = 'https://national-nadiya-vincetq-d573248a.koyeb.app/predict';
          const response = await axios.post(apiUrl, {
            SoilMoisture: cleanValue(temperature),
            Temperature: cleanValue(soilMoisture),
            SoilHumidity: cleanValue(humidity),
          });

          
          if (response.data.prediction === 'water the plant') {
            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Alert',
                body: "Your plant is feeling blue... literally. It needs a drink to brighten its day!",
              },
              trigger: null,
            });
          } else {
            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Alert',
                body: "Your plant is on a diet. Please don't ruin its progress with extra water!",
              },
              trigger: null,
            });
          }
          return BackgroundFetch.Result.NewData;
        }
      }
    }
    return BackgroundFetch.Result.NoData;
  } catch (error) {
    console.error('Error in background task:', error);
    return BackgroundFetch.Result.Failed;
  }
});


const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 60, 
      stopOnTerminate: false,
      startOnBoot: true,
    });
  } catch (error) {
    console.error("Error registering background task:", error);
  }
};

export default function Irrigation() {
  const route = useRoute();
  const navigation = useNavigation();
  const [temperature, setTemperature] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const apiUrl = 'https://national-nadiya-vincetq-d573248a.koyeb.app/predict';
  const [prediction, setPrediction] = useState('');

  // Clean value helper function
  const cleanValue = (value) => {
    return value.replace("*C", "").replace("%", "").trim();
  };

  const postDataToApi = async () => {
    try {
      const response = await axios.post(apiUrl, {
        SoilMoisture: cleanValue(temperature),
        Temperature: cleanValue(soilMoisture),
        SoilHumidity: cleanValue(humidity),
      });
      setPrediction(response.data);
      console.log(prediction);
      if (response.data.prediction === 'water the plant') {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Alert',
            body: "Your plant is feeling blue... literally. It needs a drink to brighten its day!",
          },
          trigger: null,
        });
      } else {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Alert',
            body: "Your plant is on a diet. Please don't ruin its progress with extra water!",
          },
          trigger: null,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data from Firebase
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
            setHumidity(parsedData['Humidity']);
          }
        }
      }
    }, (error) => {
      console.error('Error fetching data:', error);
    });

    // Register the background task
    registerBackgroundTask();

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", height: 50 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "column", gap: 30, marginTop: 10 }}>
        <View style={styles.container}>
          <Image source={require("./../assets/images/temperature-icon.png")} style={{ width: 40, height: 40 }} />
          <Text style={styles.text}>{temperature || 'Loading...'}</Text>
        </View>

        <View style={styles.container}>
          <Image source={require("./../assets/images/soil-moisture-icon.png")} style={{ width: 40, height: 40 }} />
          <Text style={styles.text}>{soilMoisture || 'Loading...'}</Text>
        </View>

        <View style={styles.container}>
          <Image source={require("./../assets/images/humidity-icon.png")} style={{ width: 40, height: 40 }} />
          <Text style={styles.text}>{humidity || 'Loading...'}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity 
          style={{ 
            backgroundColor: Colors.PRIMARY, 
            padding: 12, 
            width: Dimensions.get('window').width * 0.5, 
            borderRadius: 9, 
            alignItems: 'center', // Center content horizontally
          }} 
          onPress={postDataToApi}
        >
          <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: 'bold' }}>Predict</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={{ color: Colors.PRIMARY, fontSize: 18, fontWeight: 'bold' }}>{prediction["prediction"]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TERTIARY,
    width: "100%",
    borderRadius: 9,
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginTop: 16
  },
  text: {
    fontSize: 20,
    color: Colors.GRAY,
  },
});
