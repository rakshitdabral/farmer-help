import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

export default function Disease() {
  const route = useRoute();
  const image = route.params.image;
  const navigation = useNavigation();
  
  return (
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
        display : 'flex',
        flexDirection : 'column',
        backgroundColor : Colors.WHITE,
        borderRadius : 9,
        marginTop : 14,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 8
      }}>
        <Image
          source={{ uri: image }}
          style={{ width: '99%', height: 300  , borderRadius : 9}}
        />
      </View>
      <View style={{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 15,
       
      }}>
      <TouchableOpacity style={{
          alignItems : 'center',
          backgroundColor: Colors.PRIMARY,
          padding: 12,
          width : Dimensions.get('window').width*0.5,
          borderRadius: 9,
          marginTop: 14,
        }}
        
        >
          <Text style={{
            color: Colors.WHITE,
            fontSize: 18,
            fontWeight: 'bold',
          }}>Predict</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
}
