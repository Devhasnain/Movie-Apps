import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  deleteUser,
  getAuth,
  initializeAuth,
  setPersistence,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBInYHyFiN76ayyUEf-nvmiIUGsg3sFDCA",
  authDomain: "movie-app-bfbfb.firebaseapp.com",
  projectId: "movie-app-bfbfb",
  storageBucket: "movie-app-bfbfb.appspot.com",
  messagingSenderId: "476486922412",
  appId: "1:476486922412:web:2f44c87fe9968856f66f09",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);

const deleteAccount = async () => {
  try {
    const user = auth.currentUser;
    if(!user){
      throw new Error("Unexpected Error Occured while deleting your account.")
    }
    await deleteUser(user);
  } catch (error) {}
};

const db = getFirestore(app);

export { auth, db, deleteAccount };
