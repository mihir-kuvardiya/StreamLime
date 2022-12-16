import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from "./authNaviagtion";
import screenNameEnum from "../helper/screenNameEnum";
import FeedList from "../screens/Feed/feedList/feedList";
import BottomTabNavigation from "./bottomTabNavigation";
import FeedNavigation from "./feedNavigation";
import CommentScreen from "../screens/Feed/commentScreen/commentScreen";
import FeedDetailScreen from "../screens/Feed/feedDetail/feedDetail";
import EditProfileScreen from "../screens/Feed/editProfile/editProfile";
import UserProfileScreen from "../screens/Feed/profile/userProfile";

const AppNavigation = () => {

    const RootStack = createNativeStackNavigator();
    const user = true;

    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {!user ?
                <RootStack.Screen
                    name={screenNameEnum.AuthStack}
                    component={AuthNavigation}
                />
                :
                <>
                    <RootStack.Screen
                        name={screenNameEnum.BottomTabNavigation}
                        component={BottomTabNavigation}
                    />
                    <RootStack.Screen
                        name={screenNameEnum.CommentScreen}
                        component={CommentScreen}
                    />
                    <RootStack.Screen
                        name={screenNameEnum.FeedDetailScreen}
                        component={FeedDetailScreen}
                    />
                    <RootStack.Screen
                        name={screenNameEnum.EditProfileScreen}
                        component={EditProfileScreen}
                    />
                    <RootStack.Screen
                        name={screenNameEnum.UserProfileScreen}
                        component={UserProfileScreen}
                    />
                </>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigation;