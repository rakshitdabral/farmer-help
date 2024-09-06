import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from "expo-media-library"
import { useNavigation } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import Button from "./../../components/Camera/Button"

export default function Cam() {
  const navigation = useNavigation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions() 

  const [cameraProps, setCameraProps] = useState({
    zoom : 0,
    facing : 'front',
    flash : 'off',
    animateShutter : false,
    enableTorch : false
  })

  const [image , setImage] = useState(null)

  const [previousImage , setPreviousImage] = useState(null)
  const cameraRef = useRef(null)
  
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


  const takePicture = async()=>{
      if(cameraRef.current){
        try{
          const picture = await cameraRef.current.takePictureAsync()
          setImage(picture.uri)
        }catch(err){
          console.log("Error while taking picture" ,err)
        }
      }
  }

  const savePicture = async()=>{
    if(image){
      try{
        const asset = await MediaLibrary.createAssetAsync(image)
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id)
        console.log(asset)
        Alert.alert('Photo Saved!' , image)
        
        setImage(null)
        console.log('Image before navigation:', image); // Add this line
        navigation.push('disease', { image: image });
        // getLastSavedImage()
        // console.log(image)
        
      }catch(err){
        console.log("Error saving image" ,err)
      }
    }
  }

// const getLastSavedImage = async()=>{
//   if(mediaLibraryPermissionResponse && mediaLibraryPermissionResponse.status==='granted'){
//       const dcmi = await MediaLibrary.getAlbumAsync('DCIM')
//       if(dcmi){
//         const {assets} = await MediaLibrary.getAssetsAsync({
//           album : dcmi,
//           sortBy : [[MediaLibrary.SortBy.creationTime,false]],
//           mediaType : MediaLibrary.MediaType.photo,
//           first  : 1
//         })

//         if(assets.length>0){
//           const assetInfo = await MediaLibrary.getAssetInfoAsync[assets[0].id]
//           setPreviousImage(assetInfo.localUri || assetInfo.uri)
//         }else{
//           setPreviousImage(null)
//         }
//       }else{
//         setPreviousImage(null)
//       }
//     }
// }

// useEffect(()=>{
//   if(cameraPermission && cameraPermission.granted && mediaLibraryPermissionResponse && mediaLibraryPermissionResponse.status==='granted'){
//     getLastSavedImage()
//   }
// },[cameraPermission, mediaLibraryPermissionResponse ])

  
  return (
    
    <View style={styles.container}>
      {
        !image?(
          <>
              <View style={styles.topControlsContainer}>
        
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
        ref={cameraRef}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={()=>previousImage && setImage(previousImage)}>

        <Image source={{uri:previousImage}} style={styles.previousImage}/>
        </TouchableOpacity>
           
            <Button icon='camera' size={60} style={{height:70}} onPress={takePicture}/>
            <Button icon='flip-camera-ios' 
          onPress={()=>toggleProperty('facing', 'front','back')}
          size={30}
        />
      </View>
          </>
        ):(
          <>
            <Image source={{uri:image}} style = {styles.container}/>
            <View style = {styles.bottomContainer}>
              <Button  icon='flip-camera-android' size={60} style={{height:70}} onPress={()=>setImage(null)}/>
              <Button icon='check' size={60} style={{height:70}} onPress={savePicture}/> 
            </View>
          </>
        )
      }
      
      </View>
  )
}

const styles = StyleSheet.create({
    container : {
    flex : 1,
    backgroundColor : '#fff',
    marginTop : 30
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
    borderRadius : 5
  },
  buttonText : {
    fontFamily : 'outfit-mid',
    fontSize : 16
  },
  camera : {
    flex : 1,
    width : '100%'
  },
  bottomContainer : {
    height :70,
    backgroundColor : 'black',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  previousImage : {
    width: 30,
    height :30 ,
    borderRadius : 50 
  }
})