import React from "react";
import { Appearance, Platform, StatusBar } from "react-native";
import AppNavigation from "./src/naviagtion/appNavigation";
import colorPalates from "./src/theme/colorPalates";
import colors from "./src/theme/colors";

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <>
      <StatusBar
        animated={true}
        // backgroundColor={colors.white}
        barStyle={
          Platform.OS === 'ios'
            ? colorScheme === 'dark'
              ? 'dark-content'
              : null
            : null
        }
      />
      <AppNavigation />
    </>
  );
};

export default App;
