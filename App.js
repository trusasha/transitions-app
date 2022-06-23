import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "navigation/MainStack";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import {
  SourceSansPro_400Regular_Italic,
  SourceSansPro_700Bold,
} from "@expo-google-fonts/source-sans-pro";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
} from "@expo-google-fonts/playfair-display";

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    SourceSansPro_700Bold,
    SourceSansPro_400Regular_Italic,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
  });

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
