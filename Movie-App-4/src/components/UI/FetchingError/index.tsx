import React from "react";
import styled from "styled-components/native";
import {TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
    <Container
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <MaterialIcons name="error-outline" size={80} />
      <Title>oops!!</Title>
      <Subtitle>Unexpected error occured while loading movies</Subtitle>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={reloadPage}
        style={{
          paddingHorizontal: 30,
          paddingVertical: 15,
          marginTop: 20,
          backgroundColor: "#EDEDED",
          borderRadius: 100,
        }}
      >
        <Text variant="titleSmall">Reload</Text>
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
  color: black;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  font-size: 22px;
  color: black;
  text-align: center;
`;
