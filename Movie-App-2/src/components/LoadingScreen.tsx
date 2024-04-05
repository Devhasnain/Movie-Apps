import { ImageBackground } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/splash1.png")}
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <StatusBar hidden/>
      <ActivityIndicator color="white" size={25} />
    </ImageBackground>
  );
};

export default LoadingScreen;
