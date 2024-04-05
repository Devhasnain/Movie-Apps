import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeStack from "../HomeStack";
import ExploreStack from "../ExploreStack";
import ProfileStack from "../ProfileStack";
import COLORS from "@/constants/colors";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import Login from "@/screens/Auth/Login";
import SignUp from "@/screens/Auth/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailScreen from "@/screens/MovieDetailScreen";
import FullCastScreen from "@/screens/FullCastScreen";
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";

const Stack = createNativeStackNavigator();

const MainTab = () => {
  const Auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      Auth?.setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const checkAuthState = async () => {
    setIsLoading(true);
    try {
      let key1 = await AsyncStorage.getItem("key1");
      let key2 = await AsyncStorage.getItem("key2");

      if (key1 && key2) {
        let credentails = await signInWithEmailAndPassword(auth, key1, key2);
        if (credentails?.user) {
          Auth?.setUser(credentails?.user);
        } else {
          setIsLoading(false);
          await AsyncStorage.removeItem("key1");
          await AsyncStorage.removeItem("key2");
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!Auth?.user) {
      checkAuthState();
    }
  }, [Auth?.user]);

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      {isLoading ? (
        <Stack.Screen name="SplashScreen" component={LoadingScreen} />
      ) : Auth?.user ? (
        <>
          <Stack.Screen name="HomeTab" component={HomeStack} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
          <Stack.Screen name="FullCast" component={FullCastScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainTab;
