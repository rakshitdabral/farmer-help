import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { user, isSignedIn, isLoaded } = useUser();
  
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
  }, []);

  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) {
      return null;
    }
  };

  if (!isLoaded) {
    // You can add a loading indicator here
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      {isSignedIn ? (
        <Redirect href={"/(tabs)/home"} />
      ) : (
        <Redirect href={"/login/index"} />
      )}
    </View>
  );
}