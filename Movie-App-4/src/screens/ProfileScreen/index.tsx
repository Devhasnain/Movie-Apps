import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "@/constants/colors";
import UserDetail from "@/components/profile-screen/UserDetail";
import ThreeColumnList from "@/components/UI/ThreeColumnList";
import { ProfileStackParamList } from "@/types/navigation";
import { FavoriteMoviesContext } from "@/context/FavoriteMoviesContext";
import { Movie } from "@/types/api";
import {
  clearBrowsingHistory,
  getBrowsingHistory,
} from "@/hooks/browsingHistory";
import { AuthContext } from "@/context/AuthContext";
import { Text } from "react-native-paper";
import { auth, deleteAccount } from "@/firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = any;
const ProfileScreen = ({ navigation }: Props) => {
  const favoriteContext = useContext(FavoriteMoviesContext);
  const Auth = useContext(AuthContext);
  const [browsingHistory, setBrowsingHistroy] = useState<any[]>([]);
  const handleListItemPress = (id: number) => {
    navigation.navigate("MovieDetail", { id: id });
  };

  const userBrowsingHistory = async () => {
    let history = await getBrowsingHistory();
    setBrowsingHistroy(history);
  };

  useEffect(() => {
    userBrowsingHistory();
  }, []);

  const clearHistory = async () => {
    await clearBrowsingHistory();
    setBrowsingHistroy([]);
  };

  const clearWatchList = async () => {
    favoriteContext?.setFavoriteMovies([]);
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

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("key1");
              await AsyncStorage.removeItem("key2");
              await auth.signOut();
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
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDetail user={Auth?.user} />

        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <View>
              <TextInput
                style={styles.TextInput}
                cursorColor={"black"}
                placeholderTextColor={"black"}
                placeholder="Name"
                inputMode="text"
                value={Auth?.user?.displayName ?? "Name"}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                style={styles.TextInput}
                cursorColor={"black"}
                placeholderTextColor={"black"}
                placeholder="Email address"
                inputMode="email"
                editable={false}
                value={Auth?.user?.email}
              />
            </View>

            <View>
              <TextInput
                style={styles.TextInput}
                cursorColor={"black"}
                placeholderTextColor={"black"}
                placeholder="Password"
                value="*********"
                editable={false}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
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
                marginHorizontal: 13,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleLogout}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 100,
                  backgroundColor: "gray",
                }}
              >
                <Text style={{ color: "white" }}>Logout</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: 13,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text variant="labelLarge" style={{color:"black"}}>Delete my account</Text>
                <Text variant="labelSmall"  style={{ width: "100%", color:"black" }}>
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

          {favoriteContext?.favoriteMovies?.length ? (
            <View style={{ width: "100%" }}>
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

                <TouchableOpacity
                  onPress={clearWatchList}
                  activeOpacity={0.6}
                  style={{
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: "black" }}>Clear all</Text>
                </TouchableOpacity>
              </View>
              <ThreeColumnList
                data={favoriteContext?.favoriteMovies as Movie[]}
                onItemPress={handleListItemPress}
              />
            </View>
          ) : (
            <></>
          )}

          {browsingHistory?.length ? (
            <View style={{ width: "100%" }}>
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
                  Browsing History
                </Text>

                <TouchableOpacity
                  onPress={clearHistory}
                  activeOpacity={0.6}
                  style={{
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: "black" }}>Clear all</Text>
                </TouchableOpacity>
              </View>

              <ThreeColumnList
                data={browsingHistory as Movie[]}
                onItemPress={handleListItemPress}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SubmitBth: {
    paddingVertical: 13,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    fontSize: 17,
  },
  TextInput: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    fontSize: 17,
  },
});

export default ProfileScreen;
