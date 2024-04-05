import { ImageBackground, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";

import useApi from "@/hooks/useApi";
import { getTmdbImage } from "@/utils";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import { Movie } from "@/types/api";

const HeroSection = ({ movieDetailHandler }: { movieDetailHandler?: any }) => {
  const { data: movie } = useApi("fetchRandomPopularMovie");
  const favoriteContext = useContext(FavoriteMoviesContext);
  const movieId = movie?.id ?? 1;
  const isFavorite = favoriteContext?.isFavorite(movieId);

  return (
    <>
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
              if (movie?.id) {
                movieDetailHandler(movie.id);
              }
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-end",
              paddingHorizontal: 12,
              paddingBottom: 15,
            }}
            activeOpacity={0.9}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <Text
                  numberOfLines={2}
                  variant="headlineMedium"
                  style={{ color: "white" }}
                >
                  {movie?.title}
                </Text>
                <Text numberOfLines={3} style={{ color: "white" }}>
                  {movie?.overview}
                </Text>
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
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default HeroSection;

export const linearColor = [
  "transparent",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.5)",
];
