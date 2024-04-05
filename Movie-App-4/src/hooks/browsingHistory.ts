import { Movie } from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateBrowsingHistory = async (movie: Movie) => {
  try {
    const existingMovies = await AsyncStorage.getItem("browsing_history");
    let existingArr = existingMovies ? JSON.parse(existingMovies) : [];

    let isItemExists = existingArr.find((item: Movie) => item.id === movie.id);

    if (!isItemExists) {
      await AsyncStorage.setItem(
        "browsing_history",
        JSON.stringify([...existingArr, movie])
      );
    }else{
      await AsyncStorage.setItem(
        "browsing_history",
        JSON.stringify([...existingArr])
      );
    }
  } catch (error) {}
};

const getBrowsingHistory = async () => {
  const browsingHistory = await AsyncStorage.getItem("browsing_history");
  if (browsingHistory) {
    let existingArr = await JSON.parse(browsingHistory);
    return existingArr;
  } else {
    return [];
  }
};

const clearBrowsingHistory = async () => {
   await AsyncStorage.removeItem("browsing_history");
};

export { updateBrowsingHistory, getBrowsingHistory, clearBrowsingHistory };
