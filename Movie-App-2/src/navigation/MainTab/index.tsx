import HomeStack from "../HomeStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailScreen from "@/screens/MovieDetailScreen";
import FullCastScreen from "@/screens/FullCastScreen";
import Login from "@/screens/Auth/Login";
import SignUp from "@/screens/Auth/SignUp";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import Category from "@/screens/Listing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingScreen from "@/components/LoadingScreen";

const Tab = createNativeStackNavigator();

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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: route.name.slice(0, -3),
      })}
      initialRouteName="Login"
    >
      {isLoading ? (
        <Tab.Screen name="SplashScreen" component={LoadingScreen} />
      ) : Auth?.user ? (
        <>
          <Tab.Screen name="HomeTab" component={HomeStack} options={{
            animation:"slide_from_bottom"
          }} />

          <Tab.Screen
            name="MovieDetail"
            component={MovieDetailScreen}
            options={{
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="Category"
            component={Category}
            options={{
              headerShown: true,
            }}
          />

          <Tab.Screen
            name="FullCast"
            component={FullCastScreen}
            options={{
              headerShown: true,
              title: "Full Cast",
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, animation: "slide_from_left" }}
          />
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainTab;
