import COLORS from "@/constants/colors";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const Container = styled.View`
  flex: 1;
  margin: 8px 0px;
`;

const RowHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width:100%;
`;

const SeeAllBtn = styled.TouchableOpacity`
display: flex;
flex-direction: row;
align-items: center;
gap:5px
`

const SeeAllText = styled.Text`
font-size:12px;
`

const Label = styled.Text`
  color: ${COLORS.text};
  font-weight: bold;
  font-size: 20px;
`;
// text-transform: uppercase;

const Name = styled.Text`
  color: ${COLORS.text};
  font-size: 14px;
  text-align: center;
`;

const Character = styled.Text`
  color: ${COLORS.text};
  font-size: 14px;
  text-align: center;
`;

const PosterContainer = styled.View`
  width: ${Dimensions.get("window").width / 3}px;
  height: 200px;
  border-radius: ${Dimensions.get("window").width * 0.03}px;
  overflow: hidden;
`;
// height: ${(Dimensions.get("window").width * 4) / 9}px;

const Poster = styled.Image`
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled.View`
  overflow: hidden;
  width: ${Dimensions.get("window").width / 3}px;
  display:flex;
  flex-direction:column;
  gap:8px
`;

const Item = {
  Container: ItemContainer,
  PosterContainer,
  Poster,
  Name,
  Character,
};

export { Container, Label, Item, RowHeaderContainer, SeeAllBtn, SeeAllText };
