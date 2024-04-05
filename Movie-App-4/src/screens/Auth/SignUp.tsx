import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { ResizeMode, Video } from "expo-av";
import { Feather } from "@expo/vector-icons";

const set1 = ["rgba(0,0,0,0.6)", "rgba(0,0,0,1)", "rgba(0,0,0,0.6)"];
const set2 = ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.6)"];

const { height, width } = Dimensions.get("window");

const SignUp = ({ navigation }: any) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const Auth = useContext(AuthContext);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (
        !form?.email?.trim()?.length ||
        !form?.password?.trim()?.length ||
        !form?.name?.trim()?.length
      ) {
        throw new Error("All fields are required.");
      }

      let credentials = await createUserWithEmailAndPassword(
        auth,
        form?.email,
        form.password
      );

      if (credentials?.user) {
        await updateProfile(credentials.user, { displayName: form?.name });
        Auth?.setUser(credentials?.user);
        await AsyncStorage.setItem("key1", form.email);
        await AsyncStorage.setItem("key2", form.password);
        setIsLoading(false);
      } else {
        throw new Error("Unable to Sign Up, Please tryagain letter.");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.message?.includes("auth/email-already-in-use")) {
        Alert.alert("This email is already in use, Try a different one.");
      } else if (error?.message === "All fields are required.") {
        Alert.alert(error?.message);
      } else {
        console.log(error?.message)
        Alert.alert("Unexpected error occured please tryagain letter.");
      }
    }
  };

  const handleRedirection = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={{
          height,
          width,
          zIndex: -1,
        }}
      >
        <LinearGradient
          colors={!isLoading ? set1 : set2}
          style={{
            height,
            width,
          }}
        >
          {!isLoading ? (
            <View style={styles.mainContainer}>
              <View style={[styles.inputContainer, { paddingHorizontal: 20 }]}>
                <View style={{ height: 250 }}>
                  <View style={{ marginTop: 80 }}>
                    <TouchableOpacity
                      onPress={handleRedirection}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 10,
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "right" }}>
                        Login
                      </Text>
                      <Feather name="arrow-right" size={15} color={"white"} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text
                    variant="headlineMedium"
                    style={{ color: "white", fontWeight: "700" }}
                  >
                    Create Your Account
                  </Text>
                </View>

                <View>
                  <TextInput
                    style={styles.TextInput}
                    cursorColor={"black"}
                    placeholderTextColor={"black"}
                    placeholder="Name"
                    inputMode="text"
                    value={form.name}
                    onChangeText={(e) => {
                      setForm({ ...form, name: e });
                    }}
                  />
                </View>

                <View>
                  <TextInput
                    style={styles.TextInput}
                    cursorColor={"black"}
                    placeholderTextColor={"black"}
                    placeholder="Email address"
                    inputMode="email"
                    value={form.email}
                    onChangeText={(e) => {
                      setForm({ ...form, email: e });
                    }}
                  />
                </View>

                <View>
                  <TextInput
                    style={styles.TextInput}
                    cursorColor={"black"}
                    placeholderTextColor={"black"}
                    placeholder="Password"
                    secureTextEntry
                    inputMode="text"
                    value={form.password}
                    onChangeText={(e) => {
                      setForm({ ...form, password: e });
                    }}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={onSubmit}
                    activeOpacity={0.6}
                    style={styles.SubmitBth}
                    disabled={!form.email || !form.password}
                    touchSoundDisabled={false}
                  >
                    <Text style={{ fontSize: 15, textAlign: "center", color:"black" }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={30} color="white" />
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    gap: 25,
  },
  SubmitBth: {
    paddingVertical: 13,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    fontSize: 17,
  },
  TextInput: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    fontSize: 17,
  },
});

export default SignUp;
