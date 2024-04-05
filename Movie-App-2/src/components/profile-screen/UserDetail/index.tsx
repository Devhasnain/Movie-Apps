import React from "react";
import styled from "styled-components/native";
import { Avatar } from "react-native-paper";

import COLORS from "@/constants/colors";

type Props = {
  user: any;
};

const UserDetail = ({ user }: Props) => {
  return (
    <Container>
      <Avatar.Text size={72} label="DU" />
      <UserName>{user?.email}</UserName>
    </Container>
  );
};

export default UserDetail;

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 18px 0;
`;

const UserName = styled.Text`
  color: ${COLORS.text};
  font-weight: bold;
  font-size: 28px;
`;
