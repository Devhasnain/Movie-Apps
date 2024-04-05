import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import SearchScreen from "@/screens/SearchScreen";
import WatchList from "@/screens/WatchList";
import ProfileScreen from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomStackNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          backgroundColor: "white",
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          color: "black",
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          headerTintColor: "black",
          tabBarIcon: ({ focused }) => <Feather name={"search"} size={28} />,
          tabBarStyle: {
            height: 65,
            paddingBottom: 10,
          },
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Feather name={"grid"} size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStackNavigations;
