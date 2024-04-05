import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Auth/Login";
import SignUp from "@/screens/Auth/SignUp";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingScreen from "@/components/LoadingScreen";
import BottomStackNavigations from "./BottomStackNavigations";
import MovieDetailScreen from "@/screens/MovieDetailScreen";

const Stack = createNativeStackNavigator();

const StackNavigations = () => {
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
    <Stack.Navigator>
      {isLoading ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SplashScreen"
          component={LoadingScreen}
        />
      ) : Auth?.user ? (
        <>
          <Stack.Screen
            name="Main"
            options={{
              headerShown: false,
              animation: "slide_from_left",
            }}
            component={BottomStackNavigations}
          />

          <Stack.Screen
            name="MovieDetail"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
            component={MovieDetailScreen}
          />
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
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigations;
