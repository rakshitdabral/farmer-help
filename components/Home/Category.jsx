import { useNavigation } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../config/FirebaseConfig";
import Colors from "./../../constants/Colors";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-mid",
          fontSize: 20,
        }}
      >
        Category
      </Text>

      <View style={{
        display : 'flex',
        flexDirection : 'row'
      }}>
      <TouchableOpacity
        onPress={() => navigation.push("news")}
        style={{
          flex: 1,
          marginTop: 6,
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/newspaper.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          News
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.push("weather")}
        style={{
          flex: 1,
          marginTop: 6,
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/cloudy.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Weather
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.push("irrigation")}
        style={{
          flex: 1,
          marginTop: 6,
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/sprinklers.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Irrigation
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
});
