// import { Pressable } from "react-native";
// import React from "react";

// import useApi from "@/hooks/useApi";
// import { getTmdbImage } from "@/utils";
// import {
//   Background,
//   Container,
//   ContentContainer,
//   GradientOverlay,
//   Title,
// } from "./styles";
// import GenreList from "../GenreList";
// import COLORS from "@/constants/colors";
// import { Text } from "react-native-paper";

// const HeroSection = ({ onPress }: { onPress?: (id: number) => void }) => {
//   const { data: movie } = useApi("fetchRandomPopularMovie");

//   return (
//     <>
//     <Text style={{color:"white"}}>Test</Text>
//     </>
//     // <Pressable onPress={onPress?.bind(this, movie?.id as number)}>
//     //   <Container
//     //     style={{
//     //       shadowColor: COLORS.secondary,
//     //       shadowOffset: { width: 0, height: 0 },
//     //       shadowOpacity: 0.2,
//     //       shadowRadius: 10,
//     //       elevation: 10,
//     //     }}
//     //   >
//     //     <Background
//     //       source={{
//     //         uri: getTmdbImage(movie?.poster_path, "w500"),
//     //       }}
//     //       resizeMode="cover"
//     //     >
//     //       <GradientOverlay
//     //         colors={["transparent", "rgba(0,0,0,0.7)"]}
//     //         locations={[0.6, 0.85]}
//     //         start={{ x: 0, y: 0 }}
//     //         end={{ x: 0, y: 1 }}
//     //       >
//     //         <ContentContainer>
//     //           {/* <GenreList list={movie?.genre_ids as number[]} /> */}
//     //           <Title>{movie?.title}</Title>
//     //         </ContentContainer>
//     //       </GradientOverlay>
//     //     </Background>
//     //   </Container>
//     // </Pressable>
//   );
// };

// export default HeroSection;

/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Genres from "../components/Genere";
import Rating from "../components/Rating";
import { LinearGradient } from "expo-linear-gradient";
import { fetchPopularMovies } from "@/api/helper";

const SPACING = 10;
// const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : 200;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;

const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = 400;
// const BACKDROP_HEIGHT = height * 0.65;

const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ movies, scrollX }: any) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item, index) =>
          // item.key + "-backdrop"
          index.toString()
        }
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop_path) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: getImagePath(item?.backdrop_path) }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "black"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function HeroSection({
  onPress,
}: {
  onPress?: (id: number) => void;
}) {
  const [movies, setMovies] = React.useState<any[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchPopularMovies();

      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }]);
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  const handleItemTab = (id:number)=>{
    if(onPress){
      onPress(id);
    }
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        // contentContainerStyle={{ gap:20 }}
        // contentContainerStyle={{ alignItems: "center" }}

        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster_path) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity
              onPress={()=>{
                handleItemTab(item?.id??"")
              }}
              activeOpacity={0.8}
              style={{
                width: ITEM_SIZE,
              }}
            >
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  alignItems: "center",
                  transform: [{ translateY }],
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: getImagePath(item?.poster_path) }}
                  style={styles.posterImage}
                />
                <Text
                  style={{ fontSize: 24, color: "white" }}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                {/* <Rating rating={item.rating} /> */}
                {/* <Genres genres={item.genres} /> */}
                {/* <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item?.description}
                </Text> */}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // flex: 1,
    height: 450,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
