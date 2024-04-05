import { View} from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const SkeletonHome = () => {
  return (
    <View
      style={{
        flex: 1,
        height:"100%",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
      }}
    >
      <ActivityIndicator
      color="black"
      size={25}
      />
    </View>
  );
};

export default SkeletonHome;
