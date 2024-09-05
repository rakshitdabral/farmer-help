import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from "expo-media-library"
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import Button from "./../../components/Camera/Button"

export default function Cam() {

  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions() 

  const [cameraProps, setCameraProps] = useState({
    zoom : 0,
    facing : 'front',
    flash : 'off',
    animateShutter : false,
    enableTorch : false
  })
  
  if(!cameraPermission || !mediaLibraryPermission){
    return <View/>
  }

  if(!cameraPermission.granted || mediaLibraryPermission.status !=='granted'){
      return(
        <View  style={styles.container}>
          <Text style={{
            fontFamily : 'outfit',
            fontSize : 14
          }}>We need your permission to continue</Text>
          <TouchableOpacity style={styles.button} 
          
          onPress={()=>{
            requestCameraPermission()
            requestMediaLibraryPermission()
          }}
          >
            <Text style={styles.buttonText}>Grant Permission </Text>
          </TouchableOpacity>
        </View>
      )
  }


  const toggleProperty  = (prop, option1,option2) =>{
    setCameraProps((current)=>({
      ...current , [prop]:current[prop] === option1 ? option2 : option1
    }))
  }


  return (
    <View style={styles.container}>
      <View style={styles.topControlsContainer}>
        <Button icon='flip-camera-ios' 
          onPress={()=>toggleProperty('facing', 'front','back')}
        
        />
        <Button icon={cameraProps.flash==='on'?'flash-on' : 'flash-off'}
          onPress={()=>toggleProperty('flash','on','off')}
        />
        <Button icon='animation' 
          color={cameraProps.animateShutter? 'white' : '#404040'}
          onPress={()=>toggleProperty('animateShuttle',true,false)}
        />
        <Button icon={cameraProps.enableTorch?'flashlight-on' : 'flashlight-off'} 
          onPress={()=>toggleProperty('enableTorch', true, false)}
        />
      </View>
      <CameraView style={styles.camera}
        zoom={cameraProps.zoom}
        facing={cameraProps.facing}
        flash = {cameraProps.flash}
        animateShutter = {cameraProps.animateShutter}
        enableTorch = {cameraProps.enableTorch}
      
      />
      </View>
  )
}

const styles = StyleSheet.create({
    container : {
    flex : 1,
    backgroundColor : '#fff',
   
  },topControlsContainer : {
    height : 100,
    backgroundColor : 'black',
    flexDirection : 'row',
    justifyContent: 'space-around',
    alignItems : 'center',
    
  },
  button : {
    backgroundColor : Colors.PRIMARY,
    padding : 10,
    margin : 10,
    borderRadius : 9
  },
  buttonText : {
    fontFamily : 'outfit-mid',
    fontSize : 16
  },
  camera : {
    flex : 1,
    width : '100%'
  },
  
})