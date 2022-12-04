import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenNameEnum from '../helper/screenNameEnum';
import EditProfileScreen from '../screens/Feed/editProfile/editProfile';

const RootStack = createNativeStackNavigator();

const FeedNavigation = () => {
    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
              <RootStack.Screen
                name={screenNameEnum.EditProfileScreen}
                component={EditProfileScreen}
              />
        </RootStack.Navigator>
      );
}
export default FeedNavigation;