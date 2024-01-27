import * as Font from "expo-font";

const useFonts = async () =>
  await Font.loadAsync({
    limelight: require("../assets/fonts/Roboto-Medium.ttf"),
    indie: require("../assets/fonts/Roboto-black.ttf"),
  });

export default useFonts;
