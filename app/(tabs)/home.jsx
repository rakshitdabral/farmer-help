import React from 'react'
import { ScrollView, View } from 'react-native'
import Category from '../../components/Home/Category'
import Header from '../../components/Home/Header'
import Realtimedata from '../../components/Home/Realtimedata'
import Slider from '../../components/Home/Slider'

export default function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
    <View style={{
      padding : 20,
      marginTop: 20
    }}>
     {/*Header */}
     <Header/>
    
    {/*Slider */}
    <Slider/>

    {/* Categoty*/}

    <Category/>
    
    {/*Real Time Data */}
    
    <Realtimedata/>

    </View>
    </ScrollView >
  )
}