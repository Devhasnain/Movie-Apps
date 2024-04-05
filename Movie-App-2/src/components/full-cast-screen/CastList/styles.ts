import styled from "styled-components/native";
import COLORS from "@/constants/colors";
import { Dimensions } from "react-native";

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  background-color:#141414;
  border-radius:10px;
  overflow:hidden
`;

const ItemImgContainer = styled.View`
  width: ${Dimensions.get("window").width * 0.3}px;
  height: ${Dimensions.get("window").width * 0.4}px;
  margin-right: 24px;
  overflow: hidden;
  border-radius:${Dimensions.get("window").width * 0.03}px;
`;

const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const ItemName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

const ItemCharacter = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;

const Item = {
  Container: ItemContainer,
  TextContainer: ItemTextContainer,
  ImageContainer: ItemImgContainer,
  Image: ItemImage,
  Name: ItemName,
  Character: ItemCharacter,
};

const Separator = styled.View`
`;

const PlaceHolder = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PlaceHolderText = styled.Text`
  color: ${COLORS.primary};
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
`

export { Item, Separator, PlaceHolder, PlaceHolderText };
