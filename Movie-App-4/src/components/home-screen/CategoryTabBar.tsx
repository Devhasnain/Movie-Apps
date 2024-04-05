import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import CategoryList from "../explore-screen/CategoryList";
import MoviesGrid from "../explore-screen/CategoryList/MoviesGrid";

const CategoryTabBar = () => {
  const { data: genres, error } = useApi("fetchCategories");
  const [activeTab, setActiveTab] = useState<{ id: number; name: string }>({
    id: 28,
    name: "Action",
  });

  return (
    <View style={styles.tabbarContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={genres}
        keyExtractor={(item) => `${item.id}`}
        decelerationRate={"normal"}
        renderItem={({ item, index }) => (
          <React.Fragment key={index}>
            <View style={{ width: 15 }} />
            <TouchableOpacity
            onPress={()=>{
                setActiveTab(item)
            }}
              style={
                activeTab?.id === item.id
                  ? styles.activeTabBar
                  : styles.TabBarBorderBottom
              }
            >
              <Text style={{fontSize:16,fontWeight:"600", color: "black", textAlign: "center" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
          </React.Fragment>
        )}
      />
      <MoviesGrid genreId={activeTab?.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    marginTop: 30,
  },
  activeTabBar: {
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    paddingBottom: 5,
    minWidth: 60,
  },
  TabBarBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    paddingBottom: 5,
    minWidth: 60,
  },
});

export default CategoryTabBar;
