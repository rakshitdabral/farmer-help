import React , {useState ,useEffect} from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View , StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { realTimeDatabase } from './../config/FirebaseConfig';
import { onValue, ref } from 'firebase/database';
import axios from 'axios';

export default function irrigation() {
  const route = useRoute();
  const navigation = useNavigation();
  const [temperature, setTemperature] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const apiUrl = 'https://smart-irrigation-system-ozgf.onrender.com/predict';
  const [prediction, setPrediction] = useState('');



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
      setPrediction(response.data)
      // console.log(prediction);
    } catch (error) {
      console.error(error);
    }
  };



 


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
    <View style={{
      padding: 20,
      marginTop: 20,
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
            source={require("./../assets/images/soil-moisture-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{soilMoisture || 'Loading...'}</Text>
        </View>
        <View style={styles.container}>
          <Image
            source={require("./../assets/images/humidity-icon.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{humidity || 'Loading...'}</Text>
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
      <Text style={{
            color: Colors.PRIMARY,
            fontSize: 18,
            fontWeight: 'bold'}}
            >
        {prediction["prediction"]}
      </Text>
      </View>
    </View>
  )
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
    marginTop : 16
  },
  text: {
    fontFamily: "outfit-mid",
    fontSize: 20,
    color: Colors.GRAY,
  },
});
