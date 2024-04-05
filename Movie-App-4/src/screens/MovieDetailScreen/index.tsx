import React, { useContext, useEffect, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Button, Divider, Text } from "react-native-paper";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import useApi from "@/hooks/useApi";
import {
  ExploreStackParamList,
  HomeStackParamList,
  ProfileStackParamList,
} from "@/types/navigation";
import { formatRuntime, getTmdbImage } from "@/utils";
import COLORS from "@/constants/colors";
import HorizontalList from "@/components/UI/HorizontalList";
import { CastMember, Movie } from "@/types/api";
import {
  PosterWrapper,
  Poster,
  Title,
  Synopsis,
  DetailSection,
  ReleaseInfo,
  Info,
  Vote,
} from "./styles";
// import { ScreenView } from "@/components/UI/StyledComponents";
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import SkeletonMovieDetail from "@/components/UI/Skeleton/SkeletonMovieDetail";
import FetchingError from "@/components/UI/FetchingError";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, AntDesign, Foundation, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "@/components/LoadingScreen";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateBrowsingHistory } from "@/hooks/browsingHistory";

const set2 = [
  "rgba(0,0,0,0.7)",
  "rgba(0,0,0,0.8)",
  "rgba(0,0,0,0.9)",
  "rgba(0,0,0,0.9)",
];

const { height, width } = Dimensions.get("screen");

type Props = any;

const MovieDetailScreen = ({ navigation, route }: Props) => {
  const id = route.params.id;
  const image = route?.params?.image;
  const {
    data: movie,
    isLoading: loadingMovie,
    error: errorMovie,
  } = useApi("fetchMovie", id);
  const {
    data: cast,
    isLoading: loadingCast,
    error: errorCast,
  } = useApi("fetchMovieCast", id);
  const {
    data: crew,
    isLoading: loadingCrew,
    error: errorCrew,
  } = useApi("fetchMovieCrew", id);
  const {
    data: similar,
    isLoading: loadingSimilar,
    error: errorSimilar,
  } = useApi("fetchSimilarMovies", id);

  const directors = useMemo(
    () => crew?.filter((member) => member.job === "Director") || [],
    [crew]
  );

  const writers = useMemo(
    () =>
      crew?.filter(
        (member) => member.job === "Writer" || member.job == "Screenplay"
      ) || [],
    [crew]
  );

  const favoriteContext = useContext(FavoriteMoviesContext);
  const isFavorite = favoriteContext?.isFavorite(id);

  if (loadingMovie || loadingCast || loadingSimilar || loadingCrew) {
    return <LoadingScreen image={image} />;
  }

  if (errorMovie || errorCast || errorSimilar || errorCrew) {
    return <FetchingError />;
  }

  return (
    <ScrollView bounces={false}>
      <StatusBar hidden />
      <ImageBackground
        style={{
          width: "100%",
          minHeight: height,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          overflow: "hidden",
          backgroundColor: !movie?.poster_path ? "black" : "transparent",
        }}
        source={{
          uri: getTmdbImage(movie?.poster_path, "w500"),
        }}
      >
        <LinearGradient
          colors={set2}
          style={{
            position: "relative",
            minHeight: height,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}
            activeOpacity={0.7}
            style={{
              position: "absolute",
              top: 30,
              left: 20,
            }}
          >
            <Ionicons name="arrow-back" color={"white"} size={22} />
          </TouchableOpacity>

          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <View style={{ height: 100 }} />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 150,
                  borderRadius: 15,
                  overflow: "hidden",
                  elevation: 20,
                  backgroundColor: "white",
                  marginBottom: 13,
                  borderColor: "gray",
                  borderWidth: 0.4,
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  source={{
                    uri: getTmdbImage(movie?.poster_path, "w500"),
                  }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 13,
                  justifyContent: "flex-end",
                  width: "100%",
                  marginBottom: 17,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "green",
                    padding: 5,
                    borderRadius: 100,
                    width: 100,
                  }}
                >
                  <AntDesign name="playcircleo" size={22} color={"white"} />
                  <Text style={{ color: "white" }}>Play Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    favoriteContext?.toggleFavorite(movie as Movie)
                  }
                  activeOpacity={0.6}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    padding: 5,
                  }}
                >
                  <Ionicons
                    name={isFavorite ? "remove-circle" : "add-circle"}
                    size={22}
                    color={"white"}
                  />
                  <Text style={{ color: "white" }}>
                    {!isFavorite ? "Add to " : "Remove from "}
                    watchlist
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "700" }}
                variant="headlineLarge"
              >
                {movie?.title}
              </Text>

              <Text style={{ color: "white" }}>{movie?.overview}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                marginTop: 17,
                marginBottom: 10,
              }}
            >
              <View style={{ display: "flex", flexDirection: "row", gap: 7 }}>
                <Feather name="calendar" size={15} color={"white"} />
                <Text style={{ color: "white" }}>{movie?.release_date}</Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", gap: 7 }}>
                <AntDesign name="clockcircleo" size={13.5} color={"white"} />
                <Text style={{ color: "white" }}>{movie?.runtime} minutes</Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", gap: 7 }}>
                <Foundation name="play-video" size={16} color={"white"} />
                <Text style={{ color: "white" }}>{movie?.genres[0]?.name}</Text>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 7 }}>
              <Text style={{ color: "white" }}>Reviews</Text>
              <Text style={{ color: "white" }}>({movie?.vote_average})</Text>
              <AntDesign name="star" size={16} color={"orange"} />
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            {cast?.length ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <Divider />
                <Text variant="titleLarge" style={{ color: "white" }}>
                  Cast
                </Text>

                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                  horizontal
                >
                  {cast?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          width: width / 3.5,
                        }}
                      >
                        <View
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 12,
                            overflow: "hidden",
                            backgroundColor: "gray",
                          }}
                        >
                          <Image
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            alt=""
                            source={{
                              uri: getTmdbImage(item.profile_path, "w300"),
                            }}
                          />
                        </View>
                        <View
                          style={{
                            paddingVertical: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "600" }}>
                            {item?.name}
                          </Text>
                          <Text style={{ color: "gray", fontWeight: "600" }}>
                            {item?.character}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <></>
            )}
            {similar?.length ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <Divider />
                <Text variant="titleLarge" style={{ color: "white" }}>
                  Similar Movies
                </Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                  horizontal
                >
                  {similar?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("MovieDetail", {
                            id: item.id,
                            image: item.poster_path,
                          });
                        }}
                        activeOpacity={0.6}
                        key={index}
                        style={{
                          display: "flex",
                          width: width / 3.5,
                        }}
                      >
                        <View
                          style={{
                            height: 120,
                            width: 100,
                            borderRadius: 12,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            alt=""
                            source={{
                              uri: getTmdbImage(item?.poster_path, "w300"),
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={{ height: 25 }} />
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

export default MovieDetailScreen;
