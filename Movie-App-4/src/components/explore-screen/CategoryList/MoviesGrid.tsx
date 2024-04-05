import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import useApi from "@/hooks/useApi";
import { useNavigation } from "@react-navigation/native";
import SkeletonListExplore from "@/components/UI/Skeleton/SkeletonListExplore";
import { getTmdbImage } from "@/utils";

interface CategoryListProps {
  genreId: number;
}

type NavigationType = any;
const { width } = Dimensions.get("screen");

const MoviesGrid = ({ genreId }: CategoryListProps) => {
  const { data: movies, isLoading: loadingMovies } = useApi(
    "fetchMoviesByGenre",
    genreId
  );
  const navigation = useNavigation<NavigationType>();

  const itemPressHandler = (id: number, image?: string) => {
    navigation.navigate("MovieDetail", { id: id, image: image });
  };

  if (loadingMovies) {
    return <SkeletonListExplore />;
  }

  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 6,
      }}
    >
      {movies?.map((item, index) => {
        return (
          <TouchableOpacity
          key={index}
            onPress={() => {
              itemPressHandler(item?.id, item?.poster_path);
            }}
            activeOpacity={0.8}
            style={{
              height: 180,
              width: width / 3.1,
              paddingHorizontal: 2,
              paddingVertical: 2,
            }}
          >
            <Image
              alt=""
              source={{
                uri: getTmdbImage(item.poster_path, "w500"),
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 15,
                overflow: "hidden",
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MoviesGrid;
