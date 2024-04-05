import { Dimensions } from "react-native";
import styled from "styled-components/native";

// const PosterContainer = styled.View`
//   width: ${Dimensions.get("window").width/3.2}px;
//   height: ${(Dimensions.get("window").width * 0.275 * 5) / 3}px;
//   border-radius: ${Dimensions.get("window").width * 0.03}px;
//   overflow: hidden;
//   margin-horizontal:5px
// `;

const {width} = Dimensions.get("window");

const PosterContainer = styled.TouchableOpacity`
width:${width/3}px;
height:170px;
over-flow:hidden;
padding-right:5px
`;

const Poster = styled.Image`
  width: 100%;
  height: 100%;
  object-fit:cover;
`;

const Item = {
  PosterContainer,
  Poster,
};

export const PostListContainer = styled.ScrollView`
padding-horizontal:15px;
display:flex;
flex-direction:flex-row;
flex-wrap:wrap;
border-color:white;
border-width:1px;
`

const PostListCard = styled.View`

`

export { Item };
