import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Movie } from "@/types/api";
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import { getTmdbImage } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";


const WatchList = ({ navigation }: any) => {
  const favoriteContext = useContext(FavoriteMoviesContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: 10 }}>
          <Text variant="headlineSmall" style={{ fontWeight: "700", color:"black" }}>
            My Watch List
          </Text>
        </View>
        <Divider />

        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 10,
          }}
        >
          {favoriteContext?.favoriteMovies?.map(
            (item: Movie, index: number) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation?.navigate("MovieDetail", {
                      id: item?.id,
                      image:item?.poster_path
                    });
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    backgroundColor: "#EDEDED",
                    width: "100%",
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
                      width: "64%",
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
                      <Text>({item?.vote_average})</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </View>

       {!favoriteContext?.favoriteMovies?.length ?<View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            justifyContent:"center",
            gap: 5,
            marginTop: 100,
          }}
        >
          <MaterialIcons name="error-outline" size={80} />
          <Text variant="titleLarge" style={{color:"black"}}>
            Watch List is empty!
          </Text>
          <TouchableOpacity
           activeOpacity={0.6}
           onPress={()=>{
            navigation.navigate("Home")
           }}
           style={{
             paddingHorizontal: 30,
             paddingVertical: 15,
             marginTop: 10,
             backgroundColor: "#EDEDED",
             borderRadius: 100,
           }}
          >
            <Text style={{color:"black"}}>Add Items</Text>
          </TouchableOpacity>
        </View>:<></>}

      </ScrollView>
    </SafeAreaView>
  );
};

export default WatchList;
