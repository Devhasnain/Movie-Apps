import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

import QueryList from "@/components/search-screen/QueryList";
import COLORS from "@/constants/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");

  const changeQueryHandler = (value: string) => setQuery(value);
  const clearInputHandler = () => setQuery("");

  return (
    <SafeAreaView>
      <StatusBar style="auto" hidden={false} />
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}
        >
          <Ionicons name="arrow-back" color={"black"} size={25} />
        </TouchableOpacity>
        <View style={styles.searchInputOuter}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={18} />
            <TextInput
              value={query}
              onChangeText={changeQueryHandler}
              style={styles.input}
              placeholder="Search movie..."
              placeholderTextColor={"black"}
            />
          </View>
          <TouchableOpacity disabled={!query} onPress={clearInputHandler}>
            <Feather name="x" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <QueryList query={query} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 12,
    paddingVertical: 5,
    maxHeight: 60,
  },
  searchInputOuter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 8,
    justifyContent: "space-between",
    paddingVertical: 7,
    borderRadius: 100,
  },
  searchInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: "83%",
  },
  input: {
    // width: "70%",
    color: "black",
    paddingHorizontal: 4,
  },
});

export default SearchScreen;
