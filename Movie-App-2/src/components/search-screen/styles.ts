import styled from "styled-components/native";


export const SearchBarContainer = styled.View`
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
background-color:white;
border-radius: 100px;
padding-vertical:10px;
padding-horizontal:10px;
margin-horizontal:12px;
`;

export const SearchInput= styled.TextInput`
color:black;
height:100%;
width:84%;
`

export const FlexRow = styled.View`
display:flex;
flex-direction:row;
align-items:center;
gap:10px;
`