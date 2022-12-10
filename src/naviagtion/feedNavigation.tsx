import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenNameEnum from '../helper/screenNameEnum';
import EditProfileScreen from '../screens/Feed/editProfile/editProfile';
import CommentScreen from '../screens/Feed/commentScreen/commentScreen';
import BottomTabNavigation from './bottomTabNavigation';

const FeedStack = createNativeStackNavigator();

const FeedNavigation = () => {
    return (
        <FeedStack.Navigator screenOptions={{headerShown: false}}>
              <FeedStack.Screen
                name={screenNameEnum.EditProfileScreen}
                component={EditProfileScreen}
              />
              <FeedStack.Screen
                name={screenNameEnum.CommentScreen}
                component={CommentScreen}
              />
        </FeedStack.Navigator>
      );
}
export default FeedNavigation;