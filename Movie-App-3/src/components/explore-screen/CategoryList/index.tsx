import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ThreeColumnList from "@/components/UI/ThreeColumnList";
import useApi from "@/hooks/useApi";
import { ExploreStackParamList } from "@/types/navigation";
import SkeletonListExplore from "@/components/UI/Skeleton/SkeletonListExplore";
import { ActivityIndicator } from "react-native-paper";

interface CategoryListProps {
  genreId: number;
}

type NavigationType = NativeStackNavigationProp<ExploreStackParamList>;

const CategoryList = ({ genreId }: CategoryListProps) => {
  const { data: movies, isLoading: loadingMovies } = useApi(
    "fetchMoviesByGenre",
    genreId
  );
  const navigation = useNavigation<NavigationType>();

  const itemPressHandler = (id: number) => {
    navigation.navigate("MovieDetail", { id: id });
  };

  if (loadingMovies) {
    return  <ActivityIndicator style={{marginTop:100}} color={"black"} size={25} />;
  }

  return <ThreeColumnList data={movies} onItemPress={itemPressHandler} />;
};

export default CategoryList;
