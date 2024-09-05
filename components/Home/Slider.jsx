import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {

  const [sliderList , setSliderList] = useState([])
  useEffect(()=>{
    getSliders();
  },[])

  const getSliders = async ()=>{
     setSliderList([])
      const snapshot = await getDocs(collection(db,'Slider'))
      snapshot.forEach((doc)=>{
        // console.log(doc.data())
        setSliderList(sliderList=>[...sliderList,doc.data()])
      })
  }
  return (
    <View>
     <FlatList
        data={sliderList}
        renderItem={({item,index})=>{
          <View>
              <Image 
              source={{uri:item?.imageUrl}}
              style={styles?.sliderImage}
             />
          </View>
        }}
     />
    </View >
  )
}

const styles = StyleSheet.create({
  sliderImage :{
    width : '80%',
    height : 160
  }
})