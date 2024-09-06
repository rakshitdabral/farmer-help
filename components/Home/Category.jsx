import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { db } from '../../config/FirebaseConfig'
import Colors from "./../../constants/Colors"


export default function Category() {

  const [categoryList, setCategoryList] = useState([])

  useEffect(()=>{
    GetCategories()
  },[])

  const GetCategories =  async ()=>{
    setCategoryList([])
    const snapshot = await  getDocs(collection(db,'Category'))
    snapshot.forEach((doc)=>{
      // console.log(categoryList)
        setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }

  return (
    <View style={{
      marginTop : 20
    }}>
      <Text style={{
        fontFamily : 'outfit-mid',
        fontSize: 20
      }}>Category</Text>

      <FlatList data={categoryList}
        numColumns={3}
        renderItem={({item,index})=>(
          <View style={{
            flex : 1,
            marginTop : 6
          }}>
              <View style = {styles.container}>
                  <Image source={{uri:item?.imageUrl}} style={{width : 40, height : 40}} />
                </View>  
                <Text style={{
                  textAlign : 'center',
                  fontFamily : 'outfit'
                  
                }}>
                  {item?.name}
                </Text>
          </View>
  )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
     backgroundColor : Colors.SECONDARY,
     padding : 15,
     alignItems : 'center',
     borderWidth : 1,
     borderRadius : 15,
     borderColor : Colors.PRIMARY,
     margin : 5
  }
})