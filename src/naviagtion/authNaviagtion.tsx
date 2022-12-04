import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from '../helper/screenNameEnum';
import LoginScreen from '../screens/Auth/Login/Login';
import SignUpScreen from '../screens/Auth/signUp/signUp';
import ForgotPasswordScreen from '../screens/Auth/forgotPassword/forgotPassword';
import ChangePasswordScreen from '../screens/Auth/changePassword/changePassword';
import VerifyEmailScreen from '../screens/Auth/verifyEmail/verifyEmail';

const AuthNavigation = () => {

    const AuthStack = createNativeStackNavigator();

    return (
      <AuthStack.Navigator>
            <AuthStack.Screen
              name={screenNameEnum.LoginScreen}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <AuthStack.Screen
              name={screenNameEnum.SignUpScreen}
              component={SignUpScreen}
              options={{headerShown: false}}
            />
            <AuthStack.Screen
              name={screenNameEnum.ForgotPasswordScreen}
              component={ForgotPasswordScreen}
              options={{headerShown: false}}
            />
            <AuthStack.Screen
              name={screenNameEnum.ChangePasswordScreen}
              component={ChangePasswordScreen}
              options={{headerShown: false}}
            />
            <AuthStack.Screen
              name={screenNameEnum.VerifyEmailScreen}
              component={VerifyEmailScreen}
              options={{headerShown: false}}
            />
      </AuthStack.Navigator>
    );
  };
  
  export default AuthNavigation;