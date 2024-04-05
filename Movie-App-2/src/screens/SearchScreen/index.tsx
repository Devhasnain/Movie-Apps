import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

import QueryList from "@/components/search-screen/QueryList";
import COLORS from "@/constants/colors";
import {
  FlexRow,
  SearchBarContainer,
  SearchInput,
} from "@/components/search-screen/styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  const changeQueryHandler = (value: string) => setQuery(value);
  const clearInputHandler = () => setQuery("");

  return (
    <>
      <SearchBarContainer>
        <FlexRow>
          <Feather name="search" size={20} color={"black"} />
          <SearchInput
            placeholder="Search movie"
            onChangeText={changeQueryHandler}
            value={query}
          />
        </FlexRow>
        {query ? (
          <TouchableOpacity onPress={clearInputHandler}>
            <MaterialIcons name="clear" size={18} color={"black"} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </SearchBarContainer>
      <QueryList query={query} />
    </>
  );
};

export default SearchScreen;
