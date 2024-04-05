import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

import QueryList from "@/components/search-screen/QueryList";
import { Feather } from "@expo/vector-icons";

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  const changeQueryHandler = (value: string) => setQuery(value);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //   }}
    // >
    //   <Searchbar
    //     mode="view"
    //     placeholder="Search movie"
    //     onChangeText={changeQueryHandler}
    //     onClearIconPress={clearInputHandler}
    //     value={query}
    //     searchAccessibilityLabel="Search for movie"
    //     inputStyle={{ color: COLORS.primary }}
    //     iconColor={COLORS.primary}
    //     style={{
    //       borderBottomWidth: 2,
    //       borderBottomColor: COLORS.secondary,
    //     }}
    //   />
    //   <View style={{ paddingHorizontal: 12 }}>
    //     <QueryList query={query} />
    //   </View>
    // </View>

    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          marginHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        <View style={styles.searchBarContainer}>
          <Feather name="search" size={18} />
          <TextInput
            value={query}
            onChangeText={(e) => {
              setQuery(e);
            }}
            placeholder="Search movies"
            placeholderTextColor={"black"}
            style={styles.searchInput}
          />
        </View>
      </View>
      <QueryList query={query} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 23,
    width: "100%",
  },
  searchInput: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    display: "flex",
    flexDirection: "row",
    width: "90%",
    overflow: "hidden",
  },
});

export default SearchScreen;
