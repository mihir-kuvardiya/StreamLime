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
        backgroundColor={'#f2f2f2'}
        barStyle={'dark-content'}
      />
      <AppNavigation />
    </>
  );
};

export default App;
