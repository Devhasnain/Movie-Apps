import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@/types/navigation";
import HomeScreen from "@/screens/HomeScreen";
import MovieDetailScreen from "@/screens/MovieDetailScreen";
import FullCastScreen from "@/screens/FullCastScreen";
import COLORS from "@/constants/colors";
import ExploreScreen from "@/screens/ExploreScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import SearchScreen from "@/screens/SearchScreen";

const Stack = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="home" color={focused ? "black" : "gray"} size={30} />
          ),
        }}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              color={focused ? "black" : "gray"}
              size={28}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="grid" color={focused ? "black" : "gray"} size={28} />
          ),
        }}
      />
      
      <Stack.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="user" color={focused ? "black" : "gray"} size={28} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
