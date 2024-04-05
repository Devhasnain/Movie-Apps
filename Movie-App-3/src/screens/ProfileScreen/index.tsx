import React, { useContext } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserDetail from "@/components/profile-screen/UserDetail";
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import { AuthContext } from "@/context/AuthContext";
import { Divider, Text } from "react-native-paper";
import { deleteAccount } from "@/firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTmdbImage } from "@/utils";

const { width } = Dimensions.get("screen");

type Props = any;

const ProfileScreen = ({ navigation }: Props) => {
  const favoriteContext = useContext(FavoriteMoviesContext);

  const Auth = useContext(AuthContext);

  const handleListItemPress = (id: number) => {
    navigation.navigate("MovieDetail", { id: id });
  };

  const deleteUserAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("key1");
              await AsyncStorage.removeItem("key2");
              await deleteAccount();
              Auth?.setUser(null);
            } catch (error: any) {
              console.log(error?.message);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView>
        <UserDetail user={Auth?.user} />

        <Divider style={{ marginBottom: 10 }} />

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <View style={{ width: "100%", minHeight: 390 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  paddingLeft: 12,
                  marginBottom: 8,
                }}
                variant="titleLarge"
              >
                My Watch List
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 4.2,
                marginHorizontal: 12,
              }}
            >
              {favoriteContext?.favoriteMovies?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleListItemPress(item?.id);
                    }}
                    key={index}
                    style={{
                      width: width / 3.3,
                      height: 150,
                    }}
                  >
                    <Image
                      alt=""
                      source={{
                        uri: getTmdbImage(item.poster_path, "w500"),
                      }}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <Divider />

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              marginHorizontal: 12,
              marginBottom: 8,
            }}
            variant="titleLarge"
          >
            My Account
          </Text>

          <View
            style={{
              marginHorizontal: 12,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text variant="labelLarge" style={{color:"black"}}>Delete my account</Text>
              <Text variant="labelSmall" style={{ width: "100%",color:"black" }}>
                Lorem ipsum dolor sit amet consectetur.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={deleteUserAccount}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 100,
                backgroundColor: "red",
              }}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
