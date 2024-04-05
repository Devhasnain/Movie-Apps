import { FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";

import { Movie, CastMember } from "@/types/api";
import { getTmdbImage } from "@/utils";

import {
  Container,
  Label,
  Item,
  RowHeaderContainer,
  SeeAllBtn,
  SeeAllText,
} from "./styles";
import COLORS from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

interface ListItemProps {
  item: Movie | CastMember;
  itemClickHandler?: (id: number) => void;
}

interface HorizontalListProps {
  data: (Movie | CastMember)[] | null;
  label: string;
  action?: {
    text: string;
    handler: () => void;
  };
  itemClickHandler?: (id: number) => void;
  viewAction?: any;
}

const ListItem = ({ item, itemClickHandler }: ListItemProps) => {
  const uri = "poster_path" in item ? item.poster_path : item.profile_path;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={itemClickHandler?.bind(this, item.id)}
    >
      <Item.Container>
        <Item.PosterContainer>
          <Item.Poster
            resizeMode="cover"
            source={{
              uri: getTmdbImage(uri, "w500"),
            }}
          />
        </Item.PosterContainer>
        {"cast_id" in item && (
          <View>
            <Item.Name>{item.name}</Item.Name>
            <Item.Character>{item.character}</Item.Character>
          </View>
        )}
      </Item.Container>
    </TouchableOpacity>
  );
};

const HorizontalList = ({
  data,
  label,
  action,
  viewAction,
  itemClickHandler,
}: HorizontalListProps) => {
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RowHeaderContainer>
          <Label>{label}</Label>

          {action ? (
            <SeeAllBtn onPress={action.handler}>
              <SeeAllText style={{ color: "white" }}>
                {action?.text ?? "View all"}
              </SeeAllText>
              <MaterialIcons name="arrow-forward" color={"white"} size={15} />
            </SeeAllBtn>
          ) : viewAction ? (
            <SeeAllBtn onPress={viewAction}>
              <SeeAllText style={{ color: "white" }}>View all</SeeAllText>
              <MaterialIcons name="arrow-forward" color={"white"} size={15} />
            </SeeAllBtn>
          ) : (
            <></>
          )}
        </RowHeaderContainer>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem item={item} itemClickHandler={itemClickHandler} />
        )}
        keyExtractor={(item) => `${item.id}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      />
    </Container>
  );
};

export default HorizontalList;
