import React from "react";
import { Appearance, Platform, StatusBar } from "react-native";
import AppNavigation from "./src/naviagtion/appNavigation";
import colorPalates from "./src/theme/colorPalates";
import colors from "./src/theme/colors";
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <Provider store={store}>
      <StatusBar
        animated={true}
        backgroundColor={'#f2f2f2'}
        barStyle={'dark-content'}
      />
      <AppNavigation />
    </Provider>
  );
};

export default App;
