import { Dimensions } from "react-native";
import styled from "styled-components/native";

const PosterContainer = styled.View`
  width: ${Dimensions.get("window").width * 0.275}px;
  height: ${(Dimensions.get("window").width * 0.275 * 5) / 3}px;
  border-radius: ${Dimensions.get("window").width * 0.03}px;
  overflow: hidden;
  margin: 0px 7px 14px;
  background-color:gray;
`;

const Poster = styled.Image`
  width: 100%;
  height: 100%;
`;

const Item = {
  PosterContainer,
  Poster,
};

export { Item };
