import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import * as Location from "expo-location";
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import Colors from "../constants/Colors";
import { realTimeDatabase } from './../config/FirebaseConfig';

export default function fertilizer() {

  
 const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const [rainfall,setRainfall] = useState(null)
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("");
  const [potassium , setPotassium] = useState("")
  const [nitrogen , setNitrogen] = useState("")
  const [phosphorus , setPhosphorus] = useState("")
  

  const data = [
    { label: 'rice', value: 'rice' },
    { label: 'maize', value: 'maize' },
    { label: 'chickpea', value: 'chickpea' },
    { label: 'kidneybeans', value: 'kidneybeans' },
    { label: 'pigeonpeas', value: 'pigeonpeas' },
    { label: 'mothbeans', value: 'mothbeans' },
    { label: 'mungbean', value: 'mungbean' },
    { label: 'blackgram', value: 'blackgram' },
    { label: 'lentil', value: 'lentil' },
    { label: 'pomegranate', value: 'pomegranate' },
    { label: 'banana', value: 'banana' },
    { label: 'mango', value: 'mango' },
    { label: 'grapes', value: 'grapes' },
    { label: 'watermelon', value: 'watermelon' },
    { label: 'muskmelon', value: 'muskmelon' },
    { label: 'apple', value: 'apple' },
    { label: 'orange', value: 'orange' },
    { label: 'papaya', value: 'papaya' },
    { label: 'coconut', value: 'coconut' },
    { label: 'cotton', value: 'cotton' },
    { label: 'jute', value: 'jute' },
    { label: 'coffee', value: 'coffee' },
  ];

  const apiUrl = 'https://crop-prediction-g71p.onrender.com/predict';


  const cleanValue = (value) => {
    return value.replace("*C", "").replace("%", "").trim();
  };

  const postDataToApi = async () => {
    setLoading(true)
    try {
      // console.log(rainfallData)
      const response = await axios.post(apiUrl, {
        temperature: cleanValue(temperature),
        humidity: cleanValue(humidity),
        rainfall: rainfallData,
        label : selected

        
      });
      // setPrediction(response.data)
      // console.log(response.data)
      setPotassium(response.data.K)
      setNitrogen(response.data.N)
      setPhosphorus(response.data.P)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false    )
    }
  };

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

  if (loading) {
    return (
      <View style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
      }}>
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
    <ScrollView showsVerticalScrollIndicator={false} >
    <View style={{
      padding: 20,
      marginTop: 10,
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
            source={require("./../assets/images/temperature-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{temperature || 'Loading...'}</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../assets/images/humidity-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{humidity || 'Loading...'}</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require("./../assets/images/rainfall-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{rainfallData}</Text>
        </View>

        
        <View style={{
          width : '100%',
          
        }}>
      <SelectList
        boxStyles={
         {
          backgroundColor : Colors.SECONDARY,
          borderColor : Colors.PRIMARY,
          color : Colors.GRAY
         }
        }
        dropdownStyles={{
          backgroundColor : Colors.SECONDARY,
          borderColor : Colors.PRIMARY
        }}
        dropdownTextStyles={{
          fontFamily : "outfit",
          fontSize : 17,
          color : Colors.GRAY
        }}
        inputStyles={{
          fontFamily : "outfit",
          fontSize : 17,
          color : Colors.GRAY
        }}
       
        data={data}
        maxHeight ={150}
        fontFamily={'outfit-mid'}
        setSelected={(item) => setSelected(item)}
        defaultOption={{key : 'rice' , value : 'rice'}}
        save="value"
      />
      
    </View>

      </View>

      <View style={{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30,
       
      }}>
      <TouchableOpacity style={{
          alignItems : 'center',
          backgroundColor: Colors.PRIMARY,
          padding: 12,
          width : Dimensions.get('window').width*0.5,
          borderRadius: 9,
          marginTop: 14,
        }}
        onPress={postDataToApi}
        >
          <Text style={{
            color: Colors.WHITE,
            fontSize: 18,
            fontWeight: 'bold',
          }}>Predict</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30
      }}>

        {
          isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            phosphorus && (
              <View style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: 30,
                alignItems: "flex-start",
                marginTop: 10,
                width : '100%'
              }}>
              
                
                  <View style={styles.container}>
                    <Image
                      source={require("./../assets/images/phosphorus.png")}
                      style={{ width: 40, height: 40 }}
                    />
                    <Text style={styles.text}>{phosphorus}</Text>
                  </View>
        
                  <View style={styles.container}>
                    <Image
                      source={require("./../assets/images/nitrogen.png")}
                      style={{ width: 40, height: 40 }}
                    />
                    <Text style={styles.text}>{nitrogen}</Text>
                  </View>
        
                  <View style={styles.container}>
                    <Image
                      source={require("./../assets/images/potassium.png")}
                      style={{ width: 40, height: 40 }}
                    />
                    <Text style={styles.text}>{potassium}</Text>
                  </View>
                
              
            </View>
              
              
            )
          )
        }
      </View>
      <View>
        
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDARY,
    width: "100%",
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginTop : 16
  },
  text: {
    fontFamily: "outfit-mid",
    fontSize: 20,
    color: Colors.GRAY,
  },
});
