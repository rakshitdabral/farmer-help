import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from "./../../constants/Colors";


export default function Profile() {
  const {user} = useUser()
  const router = useRouter()
  const {signOut} = useAuth()

  const onPressMenu = (menu)=>{
    if(menu.name=='Logout'){
      signOut()
      router.push(menu.path)
      return
    }
   
  }

  const Menu=[
    {
      id:1,
      name : 'Connect',
      icon : 'build',
      path : '#'
    },
    {
      id:2,
      name : 'Logout',
      icon : 'exit',
      path : '/login'
    }
  ]
  return (
    <View style={{
      padding : 20,
      marginTop : 20
    }}>
      <Text style={{
        fontFamily : 'outfit-med',
        fontSize : 30
      }}>Profile</Text>
      <View style={{
        display : 'flex',
        alignItems : 'center',
        marginVertical: 25
      }}>
          <Image source={{uri:user?.imageUrl}}
          style={{
            width : 80,
            height : 80,
            borderRadius : 99
          }}/>
          <Text style={{
            marginTop: 5,
            fontFamily : 'outfit-bold',
            fontSize: 25
          }}>
            {user?.fullName}
          </Text>
          <Text style={{
            fontFamily : 'outfit-mid',
            fontSize : 12,
            color : Colors.GRAY,
            marginTop : 2
          }}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
      </View>
      <FlatList data={Menu}  
        renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>onPressMenu(item)}
          key={index} style={{
            marginVertical : 10,
            display : 'flex',
            flexDirection : 'row',
            alignItems : 'center',
            gap : 10,
            padding: 10,
            backgroundColor : Colors.WHITE,
            borderRadius : 10
          }}>
              <Ionicons name={item?.icon} size={35} color={Colors.GRAY} style={{
                padding: 10,
                
              }}/>
              <Text style={{
                fontFamily : 'outfit-med',
                fontSize : 20
              }}>{item.name}</Text>
          </TouchableOpacity>
  )}/>
    </View>
  )
}