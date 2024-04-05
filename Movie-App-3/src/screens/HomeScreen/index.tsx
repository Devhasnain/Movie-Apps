import { SafeAreaView } from "react-native-safe-area-context";

import HorizontalList from "@/components/UI/HorizontalList";
import useApi from "@/hooks/useApi";
import FetchingError from "@/components/UI/FetchingError";
import HeroSection from "@/components/home-screen/HeroSection";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text } from "react-native-paper";
import React from "react";

type Props = any;
const HomeScreen = ({ navigation }: Props) => {
  const { data: trendingMovies, isLoading: loadingTrending } = useApi(
    "fetchTrendingMovies"
  );
  const { data: upcomingMovies, isLoading: loadingUpcoming } = useApi(
    "fetchUpcomingMovies"
  );
  const { data: popularMovies, isLoading: loadingPopular } =
    useApi("fetchPopularMovies");
  const { data: nowPlayingMovies, isLoading: loadingNowPlaying } = useApi(
    "fetchNowPlayingMovies"
  );

  const itemClickHandler = (id: number) => {
    navigation.navigate("MovieDetail", { id: id });
  };

  if (
    loadingTrending ||
    loadingUpcoming ||
    loadingPopular ||
    loadingNowPlaying
  ) {
    return (
      <>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
          }}
        >
          <ActivityIndicator size={25} color="black" />
        </View>
      </>
    );
  }

  if (
    !trendingMovies ||
    !upcomingMovies ||
    !popularMovies ||
    !nowPlayingMovies
  ) {
    return <FetchingError />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <StatusBar hidden />
      <HeroSection movieDetailHandler={itemClickHandler} />
      <HorizontalList
        data={trendingMovies}
        label="Trending"
        itemClickHandler={itemClickHandler}
      />
      <HorizontalList
        data={nowPlayingMovies?.reverse()}
        label="Now Playing"
        itemClickHandler={itemClickHandler}
      />
      <HorizontalList
        data={upcomingMovies}
        label="Upcoming"
        itemClickHandler={itemClickHandler}
      />
      <HorizontalList
        data={popularMovies?.reverse()}
        label="Popular"
        itemClickHandler={itemClickHandler}
      />
      <CategoriesFlatList navigation={navigation} />
    </ScrollView>
  );
};

const CategoriesFlatList = ({ navigation }: any) => {
  const { data: genres } = useApi("fetchCategories");

  return (
    <View style={{ paddingHorizontal: 12, marginVertical: 10 }}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 6,
        }}
      >
        Categories
      </Text>
      <View>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ExploreTab", {
                  ...item,
                });
              }}
              style={{
                minWidth: 60,
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderRadius: 100,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EDEDED",
              }}
            >
              <Text style={{ color: "black" }}>{item?.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.id}`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
