import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'


export default function Button({icon, size, color, style , onPress}) {
  return (
   <TouchableOpacity style={[styles.button , style]}  onPress={onPress}>
      <MaterialIcons 
          name = {icon}
          size = {size? size : 28}
          color= {color ? color : Colors.PRIMARY}
      />
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button : {
    height : 40,
    alignItems : 'center',
    justifyContent : 'center'
  }
})