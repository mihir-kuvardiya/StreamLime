import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from "./authNaviagtion";
import screenNameEnum from "../helper/screenNameEnum";
import FeedList from "../screens/Feed/feedList/feedList";
import BottomTabNavigation from "./bottomTabNavigation";
import FeedNavigation from "./feedNavigation";
import CommentScreen from "../screens/Feed/commentScreen/commentScreen";

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
                        name={screenNameEnum.FeedStack}
                        component={FeedNavigation} 
                    />
                    <RootStack.Screen
                        name={screenNameEnum.CommentScreen}
                        component={CommentScreen}
                    />
                </>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigation;