import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';


import React, { useEffect } from "react";

const tokenCache = {
  async getToken(key) {
    try {
      const item =  SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (err) {
      await SecureStore.deleteItemAsync(key)
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};



SplashScreen.preventAutoHideAsync();



const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
 
  const [loaded, error]= useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-med": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
       <ClerkLoaded>
      <RootLayoutNav />
      </ClerkLoaded>
  </ClerkProvider>
  );
}


function RootLayoutNav(){

  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded]);

  return(
    <Stack>
       <Stack.Screen name="(tabs)" options={{
        headerShown : false
      }}/>
       <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="disease" options={{ headerShown: false }} />
      <Stack.Screen name="irrigation" options={{ headerShown: false }} />
      <Stack.Screen name="news" options={{ headerShown: false }} />
      <Stack.Screen name="weather" options={{ headerShown: false }} />
      <Stack.Screen name="fertilizer" options={{ headerShown: false }} />
      <Stack.Screen name="connect" options={{ headerShown: false }} />
    </Stack>
  )
}