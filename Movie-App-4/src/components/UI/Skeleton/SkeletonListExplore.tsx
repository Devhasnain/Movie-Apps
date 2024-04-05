import { View, Dimensions } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import COLORS from "@/constants/colors";
import { ActivityIndicator } from "react-native-paper";

const SPEED = 1.25;

const ThreeItemSkeleton = () => {
  return (
    <ContentLoader
      speed={SPEED}
      width="100%"
      height={(Dimensions.get("window").width * 0.275 * 4) / 3}
      backgroundColor={COLORS.skeletonBackground}
      foregroundColor={COLORS.skeletonForeground}
      style={{ marginBottom: 16 }}
    >
      {/* item skeleton */}
      <Rect
        x={8}
        y={0}
        rx={Dimensions.get("window").width * 0.03}
        ry={Dimensions.get("window").width * 0.03}
        width={Dimensions.get("window").width * 0.275}
        height={(Dimensions.get("window").width * 0.275 * 4) / 3}
      />

      {/* item skeleton */}
      <Rect
        x={8 + (Dimensions.get("window").width * 0.275 + 16)}
        y={0}
        rx={Dimensions.get("window").width * 0.03}
        ry={Dimensions.get("window").width * 0.03}
        width={Dimensions.get("window").width * 0.275}
        height={(Dimensions.get("window").width * 0.275 * 4) / 3}
      />

      {/* item skeleton */}
      <Rect
        x={(Dimensions.get("window").width * 0.275 + 16) * 2 + 8}
        y={0}
        rx={Dimensions.get("window").width * 0.03}
        ry={Dimensions.get("window").width * 0.03}
        width={Dimensions.get("window").width * 0.275}
        height={(Dimensions.get("window").width * 0.275 * 4) / 3}
      />
    </ContentLoader>
  );
};

const SkeletonListExplore = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="black" size={25} />
    </View>
  );
};

export default SkeletonListExplore;
