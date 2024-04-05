import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MainTab from "@/navigation/MainTab";
import { FavoriteMoviesProvider } from "@/context/FavoriteMoviesContext";
import COLORS from "@/constants/colors";
import StackNavigations from "@/navigation/StackNavigations";
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
          <StatusBar
            barStyle="dark-content"
            backgroundColor="white"
          />
          <NavigationContainer theme={MyTheme}>
            <SafeAreaProvider>
              <StackNavigations />
            </SafeAreaProvider>
          </NavigationContainer>
        </FavoriteMoviesProvider>
      </AuthContextProvider>
    </PaperProvider>
  );
}
