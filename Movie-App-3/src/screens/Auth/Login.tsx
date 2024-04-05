import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

const Login = ({ navigation }: any) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const Auth = useContext(AuthContext);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (!form?.email?.trim()?.length || !form?.password?.trim()?.length) {
        throw new Error("All fields are required.");
      }

      let credentials = await signInWithEmailAndPassword(
        auth,
        form?.email,
        form.password
      );

      if (credentials?.user) {
        Auth?.setUser(credentials?.user);
        await AsyncStorage.setItem("id", credentials?.user?.uid);
        await AsyncStorage.setItem("key1", form.email);
        await AsyncStorage.setItem("key2", form.password);
        setIsLoading(false);
      } else {
        throw new Error("Unable to Login, Please tryagain letter.");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.message?.includes("auth/invalid-credential")) {
        Alert.alert("Invalid Credentails.");
      } else {
        Alert.alert("Unexpected Error.");
      }
    }
  };

  const handleRedirection = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <ImageBackground
        style={{ flex: 1, height: height }}
        source={require("../../assets/bg.png")}
      >
        <LinearGradient
          style={{ flex: 1, height: height }}
          colors={[
            "rgba(0,0,0,0.3)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0.7)",
          ]}
        >
          <View style={styles().mainContainer}>

          <Image
              style={{
                height: 250,
                width: 250,
                alignSelf: "center",
              }}
              source={require("../../assets/logo.png")}
            />

            <View style={[styles().inputContainer, { paddingHorizontal: 20 }]}>
              <View>
                <Text
                  variant="headlineSmall"
                  style={{ color: "white", fontWeight: "700" }}
                >
                  Login
                </Text>
              </View>

              <TextInput
                mode="flat"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                }}
                contentStyle={{ color: "black" }}
                textColor="black"
                cursorColor="black"
                placeholderTextColor={"black"}
                underlineColor="red"
                activeUnderlineColor="red"
                value={form.email}
                inputMode="email"
                onChangeText={(e) => setForm({ ...form, email: e })}
                label={<Text style={{ color: "black" }}>Email</Text>}
              />
              <TextInput
                mode="flat"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                }}
                contentStyle={{ color: "black" }}
                textColor="black"
                cursorColor="black"
                placeholderTextColor={"black"}
                underlineColor="red"
                activeUnderlineColor="red"
                value={form.password}
                inputMode="text"
                onChangeText={(e) => setForm({ ...form, password: e })}
                label={<Text style={{ color: "black" }}>Password</Text>}
              />

              <View style={{ marginTop: 10, width: "100%" }}>
                <Button
                  loading={isLoading}
                  onPress={onSubmit}
                  disabled={!form?.email || !form.password}
                  mode="contained"
                  contentStyle={[styles().SubmitBth]}
                  style={styles().SubmitBth}
                  textColor="black"
                  labelStyle={{ fontSize: 18 }}
                >
                  Login
                </Button>
              </View>

              <View style={{ marginTop: 10 }}>
                <Button onPress={handleRedirection} textColor="white">
                  Don't have and account?
                </Button>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = (bg?: string) =>
  StyleSheet.create({
    mainContainer: {
      width: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    logoContainer: {
      height: 150,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 15,
    },
    SubmitBth: {
      fontSize: 20,
      color: "black",
      width: "100%",
      paddingVertical: 4,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: "white",
    },
    SubmitBthBg: {
      backgroundColor: bg,
    },
  });

export default Login;
