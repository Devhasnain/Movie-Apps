import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const SignUp = ({ navigation }: any) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const Auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (!form?.email?.trim()?.length || !form?.password?.trim()?.length) {
        throw new Error("All fields are required.");
      }

      let credentials = await createUserWithEmailAndPassword(
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
        throw new Error("Unable to Signup, Please tryagain letter.");
      }
    } catch (error: any) {
      setIsLoading(false);
      if(error?.message?.includes("auth/email-already-in-use")){
        Alert.alert("This email is already in use try different one.")
      }else{ 
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
        style={{ flex: 1, height: height }}
        source={require("../../assets/splash.png")}
      >
        <View style={[styles().mainContainer]}>
          <View style={[styles().logoContainer]}>
            {/* <Text variant="displaySmall" style={{ color: "white" }}>
                App Logo
              </Text> */}
          </View>
          <View style={styles().inputContainer}>
            <View>
              <Text variant="headlineSmall" style={{ color: "white" }}>
                Sign Up
              </Text>
            </View>
            <View>
              <TextInput
                mode="outlined"
                style={{ backgroundColor: "black", color: "red" }}
                contentStyle={{ color: "red" }}
                textColor="red"
                cursorColor="red"
                outlineColor="red"
                placeholderTextColor={"red"}
                activeOutlineColor="red"
                value={form.email}
                inputMode="email"
                onChangeText={(e) => setForm({ ...form, email: e })}
                label={<Text style={{ color: "red" }}>Email</Text>}
              />
            </View>
            <View>
              <TextInput
                mode="outlined"
                style={{ backgroundColor: "black", color: "red" }}
                contentStyle={{ color: "red" }}
                textColor="red"
                cursorColor="red"
                outlineColor="red"
                placeholderTextColor={"red"}
                activeOutlineColor="red"
                value={form.password}
                inputMode="text"
                onChangeText={(e) => setForm({ ...form, password: e })}
                label={<Text style={{ color: "red" }}>Password</Text>}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Button
                loading={isLoading}
                onPress={onSubmit}
                disabled={!form?.email || !form.password}
                mode="contained"
                contentStyle={[
                  styles().SubmitBth,
                  styles(!form?.email || !form.password ? "gray" : "red")
                    .SubmitBthBg,
                ]}
                style={styles().SubmitBth}
              >
                Submit
              </Button>
            </View>

            <View style={{ marginTop: 10 }}>
              <Button onPress={handleRedirection} textColor="gray">
                Already have and account?
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = (bg?: string) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginHorizontal: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
      flexDirection: "column",
      gap: 14,
      width: "100%",
    },
    SubmitBth: {
      width: "100%",
      paddingVertical: 2,
      borderRadius: 4,
    },
    SubmitBthBg: {
      backgroundColor: bg,
    },
  });

export default SignUp;
