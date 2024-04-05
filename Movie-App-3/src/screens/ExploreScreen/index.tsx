import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Menu } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "@/constants/colors";
import useApi from "@/hooks/useApi";
import { Genre } from "@/types/api";
import CategoryModal from "@/components/explore-screen/CategoryModal";
import CategoryList from "@/components/explore-screen/CategoryList";
import { ExploreStackParamList } from "@/types/navigation";
import FetchingError from "@/components/UI/FetchingError";
import { FontAwesome, Feather } from "@expo/vector-icons";

type Props = any;
const ExploreScreen = ({ navigation, route }: Props) => {
  const [category, setCategory] = useState({ id: 28, name: "Action" });
  const { data: genres, error } = useApi("fetchCategories");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    if (genres && genres.length > 0) setCategory(genres[0]);
  }, [genres]);

  const categoryItemPressHandler = (item: Genre) => {
    setCategory(item);
    setCategoryModalVisible(false);
  };

  useEffect(() => {
    if (route.params?.id && route.params?.name) {
      setCategory(route.params);
    }
  }, [route.params]);

  if (error) {
    return <FetchingError />;
  }

  return (
    <SafeAreaView
      style={{
        padding: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 7,
        }}
      >
        <CategoriesMenu
          category={category?.name}
          onItemPress={categoryItemPressHandler}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={24} color={"black"} />
        </TouchableOpacity>
      </View>

      <CategoryList genreId={category.id} />
    </SafeAreaView>
  );
};

const CategoriesMenu = ({
  category,
  onItemPress,
}: {
  category: string;
  onItemPress: any;
}) => {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const { data: genres } = useApi("fetchCategories");
  return (
    <Menu
      style={{
        top: 40,
        left: 13,
        width: "40%",
        elevation:10,
      }}
      contentStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
      visible={categoryModalVisible}
      onDismiss={() => setCategoryModalVisible(false)}
      anchor={
        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
          activeOpacity={0.6}
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            gap: 5,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {category} Movies
          </Text>
          <FontAwesome name="angle-down" size={23} color={"black"} />
        </TouchableOpacity>
      }
    >
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onItemPress(item);
              setCategoryModalVisible(!categoryModalVisible);
            }}
          >
            <Text>{item?.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </Menu>
  );
};

export default ExploreScreen;
