import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const SPEED = 1.25;

const SkeletonHome = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        flexDirection:"row",
      }}
    >
    <ActivityIndicator
    color="white"
    size={25}
    />
    </View>
  );
};

export default SkeletonHome;
