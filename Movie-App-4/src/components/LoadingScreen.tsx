import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { getTmdbImage } from "@/utils";

const set2 = ["rgba(0,0,0,0.6)", "rgba(0,0,0,1)", "rgba(0,0,0,0.6)"];

const { height, width } = Dimensions.get("screen");

const LoadingScreen = ({ image }: { image?: string }) => {
  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        source={
          image
            ? {
                uri: getTmdbImage(image, "w500"),
              }
            : require("../assets/splash.png")
        }
        style={{
          height,
          width,
          flex: 1,
        }}
      ></ImageBackground>
      <LinearGradient
        colors={set2}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          height,
          width,
        }}
      >
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={30} color="white" />
        </View>
      </LinearGradient>
    </>
  );
};

export default LoadingScreen;
