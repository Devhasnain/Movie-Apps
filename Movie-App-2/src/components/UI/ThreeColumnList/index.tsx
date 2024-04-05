import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Item, PostListContainer } from "./styles";
import { Movie } from "@/types/api";
import { getTmdbImage } from "@/utils";

interface ListItemProps {
  item: Movie;
  onPress?: (id: number) => void;
}

export const ListItem = ({ item, onPress }: ListItemProps) => {
  return (
    <Item.PosterContainer 
    activeOpacity={0.8}
      onPress={onPress?.bind(this, item.id)}
    >
      <Item.Poster
        source={{
          uri: getTmdbImage(item.poster_path, "w500"),
        }}
      />
    </Item.PosterContainer>
  );
};

const ThreeColumnList = ({
  data,
  onItemPress,
}: {
  data: Movie[] | null;
  onItemPress: (id: number) => void;
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ListItem item={item} onPress={onItemPress} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{gap:5, marginTop:8, paddingBottom:25}}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      ItemSeparatorComponent={() => <View style={{ width: 20 }} ></View>}
    />
  );
};

export default ThreeColumnList;
