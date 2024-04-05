import React, { useContext } from "react";
import styled from "styled-components/native";
import { Avatar, Text } from "react-native-paper";
import { Alert, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/firebase/firebase";
import { AuthContext } from "@/context/AuthContext";

const UserDetail = ({ user }: any) => {
  const Auth = useContext(AuthContext);

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
    <Container
      style={{
        paddingHorizontal: 15,
      }}
    >
      <Avatar.Text
        size={72}
        label={
          user?.displayName
            ? user?.displayName[0]?.toUpperCase()
            : user?.email[0]?.toUpperCase()
        }
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingLeft: 8,
            marginTop: 5,
          }}
        >
          {user?.displayName ? <UserName>{user?.displayName}</UserName> : <></>}
          <Useremail>{user?.email}</Useremail>
        </View>
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
    </Container>
  );
};

export default UserDetail;

const Container = styled.View`
  width: 100%;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 15px;
`;

const UserName = styled.Text`
  font-weight: bold;
  font-size: 26px;
`;

const Useremail = styled.Text`
  font-size: 18px;
  color: gray;
`;
