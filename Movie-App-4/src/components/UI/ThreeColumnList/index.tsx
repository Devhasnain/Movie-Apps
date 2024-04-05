import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import COLORS from "@/constants/colors";
import { Item } from "./styles";
import { Movie } from "@/types/api";
import { getTmdbImage } from "@/utils";
import { Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

interface ListItemProps {
  item: Movie;
  onPress?: (id: number) => void;
}

export const ListItem = ({ item, onPress }: ListItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress?.bind(this, item.id)}
    >
      <Item.PosterContainer>
        <Item.Poster
          resizeMode="cover"
          source={{
            uri: getTmdbImage(item.poster_path, "w500"),
          }}
        />
      </Item.PosterContainer>
    </TouchableOpacity>
  );
};

const ThreeColumnList = ({
  data,
  onItemPress,
}: {
  data: Movie[] | null;
  onItemPress: (id: number, image?: string) => void;
}) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 12,
        gap: 12,
      }}
    >
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onItemPress(item?.id, item?.poster_path);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#EDEDED",
              width: "93.5%",
              borderRadius: 12,
            }}
            key={index}
          >
            <View
              style={{
                height: 110,
                width: 110,
                overflow: "hidden",
              }}
            >
              <Image
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  overflow: "hidden",
                }}
                source={{ uri: getTmdbImage(item.poster_path, "w500") }}
              />
            </View>
            <View
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Text
                variant="titleMedium"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  fontWeight: "600",
                  color:"black"
                }}
                numberOfLines={1}
              >
                {item?.title}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  fontWeight: "600",
                  color:"black"

                }}
                numberOfLines={2}
              >
                {item?.overview}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <AntDesign name="star" color={"orange"} size={15} />
                <Text style={{color:"black"}}>({item?.vote_average})</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ThreeColumnList;
