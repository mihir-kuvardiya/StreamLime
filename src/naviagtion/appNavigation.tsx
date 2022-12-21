import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from "./authNaviagtion";
import screenNameEnum from "../helper/screenNameEnum";
import BottomTabNavigation from "./bottomTabNavigation";
import CommentScreen from "../screens/Feed/commentScreen/commentScreen";
import FeedDetailScreen from "../screens/Feed/feedDetail/feedDetail";
import UserProfileScreen from "../screens/Feed/profile/userProfile";
import TopTabBar from "../screens/Feed/profile/component/followFollowingTopTabNavigation";

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
                        name={screenNameEnum.UserProfileScreen}
                        component={UserProfileScreen}
                    />
                    <RootStack.Screen
                        name={screenNameEnum.TopTabBar}
                        component={TopTabBar}
                    />
                </>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigation;