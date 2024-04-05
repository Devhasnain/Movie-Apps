import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import HorizontalList from "@/components/UI/HorizontalList";
import useApi from "@/hooks/useApi";
import FetchingError from "@/components/UI/FetchingError";
import HeroSection from "@/components/home-screen/HeroSection";
import { HomeStackParamList } from "@/types/navigation";
import SkeletonHome from "@/components/UI/Skeleton/SkeletonHome";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { getTmdbImage } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import CategoryTabBar from "@/components/home-screen/CategoryTabBar";

const { width } = Dimensions.get("screen");

const set2 = [
  "rgba(0,0,0,0.3)",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,1)",
];

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

  const itemClickHandler = (id: number, image?: string) => {
    navigation.navigate("MovieDetail", { id: id, image: image });
  };

  if (
    loadingTrending ||
    loadingUpcoming ||
    loadingPopular ||
    loadingNowPlaying
  ) {
    return <SkeletonHome />;
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <View style={{ paddingTop: 10, marginHorizontal: 12 }}>
          <Text
            variant="headlineSmall"
            style={{ fontWeight: "700", paddingHorizontal: 10, color:"black" }}
          >
            What do you want to watch?
          </Text>
          <TouchableOpacity 
          activeOpacity={0.6}
          onPress={()=>{
            navigation.navigate("Search")
          }}
          style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search movies"
              placeholderTextColor={"black"}
              editable={false}
            />
            <Feather name="search" size={20} color={"black"} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroFlatListContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trendingMovies}
            keyExtractor={(item) => `${item.id}`}
            decelerationRate={"normal"}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            renderItem={({ item, index}) => (
              <React.Fragment key={index}>
                <View style={{ width: 5 }} />
                <TouchableOpacity
                  onPress={() => {
                    itemClickHandler(item?.id, item?.poster_path);
                  }}
                  activeOpacity={0.8}
                >
                  <ImageBackground
                    style={{
                      height: "100%",
                      width: width / 2.1,
                      borderRadius: 23,
                      overflow: "hidden",
                    }}
                    source={{
                      uri: getTmdbImage(item?.poster_path, "w500"),
                    }}
                  >
                    <LinearGradient
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        paddingHorizontal: 15,
                        paddingBottom: 15,
                        gap: 3,
                      }}
                      colors={set2}
                    >
                      <Text
                        numberOfLines={1}
                        variant="bodyLarge"
                        style={{ color: "white" }}
                      >
                        {item?.title?.slice(0, 15)}
                      </Text>
                      <Text numberOfLines={2} style={{ color: "white" }}>
                        {item?.overview}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>

                <View style={{ width: 5 }} />
              </React.Fragment>
            )}
          />
        </View>

        <CategoryTabBar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#EDEDED",
    borderRadius: 23,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginTop: 13,
  },
  searchTextInput: {
    display: "flex",
    width: "95%",
    fontSize: 16,
    color: "black",
  },
  heroFlatListContainer: {
    height: 250,
    width: "100%",
    marginTop: 20,
  },
  tabBarContainer: {},
});

export default HomeScreen;
