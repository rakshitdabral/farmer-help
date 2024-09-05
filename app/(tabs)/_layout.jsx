import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import Colors from '../../constants/Colors';


export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor : Colors.PRIMARY
      }}
    >
        <Tabs.Screen name='home'
        options={{
          title: 'Home',
          headerShown : false,
          tabBarIcon : ({color})=><Ionicons name="home" size={24} color={color} />
        }}/>
        <Tabs.Screen name='chat' 
          options={{
            title : 'Chat',
            headerShown : false,
            tabBarIcon: ({color})=><Ionicons name="chatbox-ellipses-sharp" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='camera'
          options={{
            title: "Camera",
            headerShown : false,
            tabBarIcon : ({color})=><Ionicons name="camera" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='profile'
        options={{
          title : 'Profile',
          headerShown : false,
          tabBarIcon : ({color})=><Ionicons name="person-sharp" size={24} color={color} />
        }}
        
        />
    </Tabs>
  )
}