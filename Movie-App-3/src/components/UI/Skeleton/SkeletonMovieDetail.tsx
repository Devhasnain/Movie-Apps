import { View, Dimensions } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import COLORS from "@/constants/colors";
import { ActivityIndicator } from "react-native-paper";

const SPEED = 1.25;

const SkeletonMovieDetail = () => {
  return (
    <View
      style={{
        display:"flex",
        height:"80%",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
      }}
    >
      {/* poster skeleton
      <ContentLoader
        speed={SPEED}
        width={Dimensions.get("window").width}
        height={(Dimensions.get("window").width * 4) / 3}
        backgroundColor={COLORS.skeletonBackground}
        foregroundColor={COLORS.skeletonForeground}
      >
        <Rect
          x={0}
          y={0}
          height="100%"
          width="100%"
        />
      </ContentLoader>


      detail section skeleton
      <ContentLoader
        speed={SPEED}
        width={Dimensions.get("window").width}
        height="100%"
        backgroundColor={COLORS.skeletonBackground}
        foregroundColor={COLORS.skeletonForeground}
        style={{marginTop: 12, paddingHorizontal: 12}}
      >
        <Rect
          x={0}
          y={0}
          height={24}
          width={Dimensions.get("window").width * 0.4}
        />

        <Rect
          x={0}
          y={36}
          height={20}
          width={Dimensions.get("window").width * 0.55}
        />

        <Rect
          x={0}
          y={68}
          height={18}
          width="100%"
        />
        <Rect
          x={0}
          y={98}
          height={18}
          width="100%"
        />
        <Rect
          x={0}
          y={128}
          height={18}
          width="100%"
        />
      </ContentLoader> */}

      <ActivityIndicator  color="black" size={25}/>
    </View>
  );
};

export default SkeletonMovieDetail;
