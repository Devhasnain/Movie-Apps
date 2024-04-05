import React, { useContext, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
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
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import SkeletonMovieDetail from "@/components/UI/Skeleton/SkeletonMovieDetail";
import FetchingError from "@/components/UI/FetchingError";
import { LinearGradient } from "expo-linear-gradient";
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

  const handleGoBack = () => {
    navigation?.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PosterWrapper style={[styles.relative]}>
        <ImageBackground
          source={{ uri: getTmdbImage(movie?.poster_path, "w780") }}
          style={{ width: "100%", height: "100%" }}
        >
          <LinearGradient
            style={{ height: "100%" }}
            colors={[
              "rgba(0,0,0,0.1)",
              "rgba(0,0,0,0.1)",
              "#000000",
              "#000000",
            ]}
          >
            <TouchableOpacity
              onPress={handleGoBack}
              style={[styles.absolute, styles.backBtn]}
            >
              <MaterialIcons name="arrow-back" size={18} color={"white"} />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: -0,
            left: 0,
            width: "100%",
            zIndex: 100,
          }}
        >
          <ImageBackground
            style={{
              height: 300,
              width: 200,
              borderRadius: 10,
              overflow: "hidden",
              elevation: 10,
            }}
            source={{
              uri: getTmdbImage(movie?.poster_path, "w500"),
            }}
          >
            <LinearGradient
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.2)"]}
            >
              <TouchableOpacity activeOpacity={0.7}>
                <AntDesign name="play" size={40} color={"white"} />
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </View>
      </PosterWrapper>

      <DetailSection>
        <Title>{movie?.title}</Title>

        <ReleaseInfo.Wrapper>
          <ReleaseInfo.Text>
            {movie?.release_date?.split("-").reverse().join("-")}
          </ReleaseInfo.Text>
          <ReleaseInfo.Text>{formatRuntime(movie?.runtime)}</ReleaseInfo.Text>
          <Vote.Wrapper>
            <Vote.Text>{movie?.vote_average}(10)</Vote.Text>
            <AntDesign name="star" size={13} color={"orange"} />
          </Vote.Wrapper>
        </ReleaseInfo.Wrapper>

        <Synopsis>{movie?.overview}</Synopsis>

        <View
          style={{ width: "100%", alignItems: "center", marginVertical: 12 }}
        >
          {/* <Button
            mode={isFavorite ? "outlined" : "contained"}
            icon={isFavorite ? "close" : "plus"}
            textColor={isFavorite ? COLORS.secondary : COLORS.text}
            buttonColor={isFavorite ? "transparent" : COLORS.secondary}
            onPress={() => favoriteContext?.toggleFavorite(movie as Movie)}
            accessibilityLabel="Add to Favorites"
            style={{
              width: "90%",
              paddingVertical: 2,
              borderColor: COLORS.secondary,
            }}
            labelStyle={{ fontSize: 18, fontWeight: "600" }}
          >
            {isFavorite ? "Remove from favorites" : "Add to Favorites"}
          </Button> */}
        </View>

        <Info.Wrapper>
          <Info.Label>Genres </Info.Label>
          <Info.Item>·</Info.Item>
          {movie?.genres.map((item, index) => (
            <React.Fragment key={item.id}>
              {index !== 0 && <Info.Item>·</Info.Item>}
              <Info.Item>{item.name}</Info.Item>
            </React.Fragment>
          ))}
        </Info.Wrapper>

        <Info.Wrapper>
          <Info.Label>
            {directors.length > 1 ? "Directors" : "Director"}:
          </Info.Label>
          {directors.map((item, index) => (
            <React.Fragment key={item.id}>
              {index !== 0 && <Info.Item>·</Info.Item>}
              <Info.Item>{item.name}</Info.Item>
            </React.Fragment>
          ))}
        </Info.Wrapper>

        <Info.Wrapper>
          <Info.Label>Screenplay:</Info.Label>
          {writers.map((item, index) => (
            <React.Fragment key={item.id}>
              {index !== 0 && <Info.Item>·</Info.Item>}
              <Info.Item>{item.name}</Info.Item>
            </React.Fragment>
          ))}
        </Info.Wrapper>

        <HorizontalList
          data={cast?.slice(0, 10) as CastMember[]}
          label="Cast"
          action={{
            text: "Full Cast",
            handler: () => {
              navigation.navigate("FullCast", { id: id });
            },
          }}
        />

        <HorizontalList
          data={similar}
          label="Similar Movies"
          itemClickHandler={(id: number) => {
            navigation.navigate("MovieDetail", { id: id });
          }}
        />
      </DetailSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
  },
  relative: {
    position: "relative",
    height: 410,
  },
  backBtn: {
    zIndex: 10,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 100,
    top: 25,
    left: 25,
    height: 30,
    width: 30,
  },
});

export default MovieDetailScreen;
