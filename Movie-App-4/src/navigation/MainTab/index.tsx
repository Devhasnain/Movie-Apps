import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainTabParamList } from "@/types/navigation";
import HomeStack from "../HomeStack";
import ExploreStack from "../ExploreStack";
import ProfileStack from "../ProfileStack";
import COLORS from "@/constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Auth/Login";

const Stack = createNativeStackNavigator();

const MainTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
    // <Sta.Navigator
    //   screenOptions={({ route }) => ({
    //     headerShown: false,
    //     tabBarLabel: route.name.slice(0, -3),
    //     tabBarStyle: { backgroundColor: COLORS.primary },
    //     tabBarActiveTintColor: COLORS.secondary,
    //     tabBarInactiveTintColor: COLORS.text,
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;

    //       if (route.name === "HomeTab") {
    //         iconName = focused ? "home" : "home-outline";
    //       } else if (route.name === "ExploreTab") {
    //         iconName = focused ? "compass" : "compass-outline";
    //       } else if (route.name === "ProfileTab") {
    //         iconName = focused ? "account" : "account-outline";
    //       }

    //       return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
    //     },
    //   })}

    // >
    //   <Tab.Screen name="HomeTab" component={HomeStack} />
    //   <Tab.Screen name="ExploreTab" component={ExploreStack} />
    //   <Tab.Screen name="ProfileTab" component={ProfileStack} />
    // </Sta.Navigator>
  );
};

export default MainTab;
