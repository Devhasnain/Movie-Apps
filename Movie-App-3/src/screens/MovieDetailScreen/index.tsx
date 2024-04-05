import React, { useContext, useMemo } from "react";
import { Text } from "react-native-paper";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import useApi from "@/hooks/useApi";
import {getTmdbImage } from "@/utils";
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
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import SkeletonMovieDetail from "@/components/UI/Skeleton/SkeletonMovieDetail";
import FetchingError from "@/components/UI/FetchingError";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Label } from "@/components/UI/HorizontalList/styles";

type Props = any;

const MovieDetailScreen = ({ navigation, route }: Props) => {
  const id = route.params.id;
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
    return <SkeletonMovieDetail />;
  }

  if (errorMovie || errorCast || errorSimilar || errorCrew) {
    return <FetchingError />;
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor:"#FFFFFF",
      }}
      >
        <ImageBackground
          source={{
            uri: getTmdbImage(movie?.poster_path, "w500"),
          }}
          style={{ height: 470, width: "100%" }}
        >
          <LinearGradient
            style={{ height: 470, width: "100%" }}
            colors={[
              "transparent",
              "rgba(0,0,0,0.7)",
              "rgba(0,0,0,0.8)",
              "rgba(0,0,0,0.9)",
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                zIndex: 10,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: 100,
                top: 50,
                left: 20,
                height: 30,
                width: 30,
                position: "absolute",
              }}
            >
              <MaterialIcons name="arrow-back" size={18} color={"black"} />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "flex-end",
                paddingHorizontal: 12,
                paddingBottom: 15,
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <Text variant="headlineMedium" style={{ color: "white" }}>
                    {movie?.title}
                  </Text>
                  <Text style={{ color: "white" }}>{movie?.overview}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <Text numberOfLines={2} style={{ color: "white" }}>
                    Date
                  </Text>
                  <Text numberOfLines={2} style={{ color: "white" }}>
                    .
                  </Text>
                  <Text numberOfLines={2} style={{ color: "white" }}>
                    {movie?.release_date?.split("-").reverse().join("-")}
                  </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", gap: 7 }}>
              <Text style={{ color: "white" }}>Average Vote</Text>
              <Text style={{ color: "white" }}>({movie?.vote_average})</Text>
              <AntDesign name="star" size={16} color={"orange"} />
            </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 35,
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Feather name="play-circle" color={"white"} size={28} />
                    <Text style={{ color: "white" }}>Play Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                    onPress={() =>
                      favoriteContext?.toggleFavorite(movie as Movie)
                    }
                  >
                    <MaterialIcons
                      name="playlist-play"
                      color={"white"}
                      size={35}
                    />
                    <Text style={{ color: "white" }}>
                      {isFavorite ? "Remove from " : "Add to "}
                      watch later
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={{ marginTop: 15 }}>
          <View style={{ paddingHorizontal: 12 }}>
            <Label>Cast</Label>
          </View>

          <FlatList
            data={cast}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    gap:4
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 100,
                    overflow: "hidden",
                    elevation:10,
                  }}
                >
                  <Image
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    source={{ uri: getTmdbImage(item.profile_path, "w300") }}
                  />
                </View>
                <Text
                  style={{
                    color: "black",
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {item?.name}
                </Text>
              </View>
            )}
            keyExtractor={(item) => `${item.id}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
          />
        </View>

       {writers?.length ? <View style={{ marginTop: 15 }}>
          <View style={{ paddingHorizontal: 12 }}>
            <Label>Writer</Label>
          </View>

          <FlatList
            data={directors}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    gap:4
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 100,
                    overflow: "hidden",
                    elevation:10,
                  }}
                >
                  <Image
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    source={{ uri: getTmdbImage(item?.profile_path, "w300") }}
                  />
                </View>
                <Text
                  style={{
                    color: "black",
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {item?.name}
                </Text>
              </View>
            )}
            keyExtractor={(item) => `${item.id}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
          />
        </View> : <></>}

        {directors?.length ? <View style={{ marginTop: 15 }}>
          <View style={{ paddingHorizontal: 12 }}>
            <Label>Director</Label>
          </View>

          <FlatList
            data={directors}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                    gap:4
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 100,
                    overflow: "hidden",
                    elevation:10,
                  }}
                >
                  <Image
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    source={{ uri: getTmdbImage(item.profile_path, "w300") }}
                  />
                </View>
                <Text
                  style={{
                    color: "black",
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {item?.name}
                </Text>
              </View>
            )}
            keyExtractor={(item) => `${item.id}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
          />
        </View> : <></>}

       

       {similar?.length ? <HorizontalList
          data={similar}
          label="Similar Movies"
          itemClickHandler={(id: number) => {
            navigation.navigate("MovieDetail", { id: id });
          }}
        /> : <></>}
      </ScrollView>
    </>
  );
};

export default MovieDetailScreen;
