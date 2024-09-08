import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";

export default function Disease() {
  const apiKey = 'AIzaSyBp41CUDq8ptTjLhajTJ1-Vaa8ilbbM2dg';
  const route = useRoute();
  const image = route.params.image;
  const navigation = useNavigation();
  const [base, setBase] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const convertImageToBase64 = async () => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: 'base64',
      });
      setBase(base64Image);
    } catch (error) {
      console.error(error);
    }
  };

  const generateContent = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBp41CUDq8ptTjLhajTJ1-Vaa8ilbbM2dg',
        {
          contents: [{
            parts: [{
              text: 'Is this plant healthy or diseased ? if its diseased  Tell me the name of the disease and its treatment',
            }, {
              inline_data: {
                mime_type: 'image/jpeg',
                data: base,
              },
            }],
          }],
        },
      );

      const responseData = response.data.candidates[0].content.parts[0].text;
      setAnswer(responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    convertImageToBase64();
  }, [image]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 20,
          marginTop: 20,
        }}
      >
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

        <View style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: Colors.WHITE,
          borderRadius: 9,
          marginTop: 14,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8
        }}>
          <Image
            source={{ uri: image }}
            style={{ width: '99%', height: 300, borderRadius: 9 }}
          />
        </View>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
          <TouchableOpacity style={{
            alignItems: 'center',
            backgroundColor: Colors.PRIMARY,
            padding: 12,
            width: Dimensions.get('window').width * 0.5,
            borderRadius: 9,
            marginTop: 14,
          }}
            onPress={generateContent}
          >
            <Text style={{
              color: Colors.WHITE,
              fontSize: 18,
              fontWeight: 'bold',
            }}>Predict</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        ) : (
          answer && (
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: Colors.WHITE,
              borderRadius: 9,
              marginTop: 14,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
              flexGrow: 1
            }}>
              <Text style={{
                fontFamily: 'outfit-mid',
                fontSize: 17
              }}>
                {answer}
              </Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}