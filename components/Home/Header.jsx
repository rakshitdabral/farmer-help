import { useUser , useAuth} from '@clerk/clerk-expo'
import React, { useEffect , useState} from 'react'
import { Image, Text, View } from 'react-native'

export default function Header() {
    const {user} = useUser()


  return (
    <View style={{
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center'
    }}>
      <View>
       
          <Text style={{
            fontFamily : 'outfit',
            fontSize :18
          }}>Welcome</Text>
          <Text style={{
            fontFamily : 'outfit-med',
            fontSize : 25
          }}>{user?.fullName}</Text>
      </View>
      <Image source={{uri:user?.imageUrl}} style={{
        width:40,
        height: 40,
        borderRadius : 99,

      }}/>
    </View>
  )
}