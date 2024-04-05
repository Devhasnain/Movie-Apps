import React from "react";
import styled from "styled-components/native";
import { Dimensions, Image, TouchableOpacity } from "react-native";

import COLORS from "@/constants/colors";
import { Text } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";

const FetchingError = () => {
  const navigation = useNavigation();

  const reloadPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <Container>
      <Title>oops!!</Title>
      <Subtitle>it was not possible to fetch the data</Subtitle>
      <Image source={require('@/assets/man.png')} resizeMode="contain" style={{
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7
      }} />
      <TouchableOpacity onPress={reloadPage}>
        <Text style={{color:"white"}}>Reload</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default FetchingError;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 38px;
`;

const Title = styled.Text`
  font-size: 48px;
  text-transform: uppercase;
  color: white;
  font-weight: 800;
`;

const Subtitle = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: 600;
  text-align: center;
  margin-bottom: 18px;
`;
