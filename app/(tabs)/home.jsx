import React from 'react'
import { View } from 'react-native'
import Category from '../../components/Home/Category'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import ItemListByCategory from '../../components/Home/ItemListByCategory'

export default function Home() {
  return (
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
    
    </View>
  )
}