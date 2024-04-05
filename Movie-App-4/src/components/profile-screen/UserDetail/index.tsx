import React, { useContext } from "react";
import styled from "styled-components/native";
import { Avatar } from "react-native-paper";

type Props = {
  user: any
}

const UserDetail = ({user}:Props) => {

  return (
    <Container>
      <Avatar.Text size={72} label={
        user?.displayName?
        user?.displayName[0]?.toUpperCase():
        user?.email[0]?.toUpperCase()
        } />
      { user?.displayName ? <UserName>{user?.displayName}</UserName> : <></>}
      <UserName>{user?.email}</UserName>
    </Container>
  );
};

export default UserDetail;

const Container = styled.View`
  background-color: white;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-vertical:40px
`;

// #EDEDED

const UserName = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 23px;
`;
