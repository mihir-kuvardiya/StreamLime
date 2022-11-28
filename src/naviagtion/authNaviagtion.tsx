import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import LoginScreen from '../screens/Auth/Login/Login';

const AuthNavigation = () => {

    const AuthStack = createNativeStackNavigator();

    return (
      <AuthStack.Navigator>
            <AuthStack.Screen
              name={screenNameEnum.LoginScreen}
              component={LoginScreen}
              options={{headerShown: false}}
            />
      </AuthStack.Navigator>
    );
  };
  
  export default AuthNavigation;