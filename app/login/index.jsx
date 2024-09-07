import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { Image, Pressable, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import axios from 'axios';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()


export default function LoginScreen() {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })
      if(createdSessionId){
          
      }else{
        
      }

    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style={{
      backgroundColor: Colors.WHITE,
      height : '100%'
    }}>
      <Image
        source={require("./../../assets/images/farmer.jpg")}
        style={{
          padding: 20,
          width: "100%",
          height: 350,
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Harvest the rewards of technology
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize : 18,
          textAlign:'center',
          color : Colors.GRAY
        }}>
          Grow smarter, farm easier. Your farming companion, right in your
          pocket.
        </Text>
        <Pressable
         onPress={onPress}
        style={{
          padding : 14,
          marginTop : 50,
          backgroundColor : Colors.PRIMARY,
          borderRadius : 14,
          width: '100%',
    
        }}>
          <Text style={{
            fontFamily : 'outfit-med',
            fontSize: 20,
            textAlign : 'center'
          }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
