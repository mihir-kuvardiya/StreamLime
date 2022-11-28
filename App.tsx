import React from "react";
import { Appearance, Platform, StatusBar } from "react-native";
import AppNavigation from "./src/naviagtion/appNavigation";

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'#2b325f'}
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
