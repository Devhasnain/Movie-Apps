import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MainTab from "@/navigation/MainTab";
import { FavoriteMoviesProvider } from "@/context/FavoriteMoviesContext";
import { AuthContextProvider } from "@/context/AuthContext";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider>
      <AuthContextProvider>
        <FavoriteMoviesProvider>
          <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
          <SafeAreaProvider>
            <NavigationContainer theme={MyTheme}>
              <MainTab />
            </NavigationContainer>
          </SafeAreaProvider>
        </FavoriteMoviesProvider>
      </AuthContextProvider>
    </PaperProvider>
  );
}
