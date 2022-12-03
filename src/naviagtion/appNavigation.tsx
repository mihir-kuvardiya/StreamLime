import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from "./authNaviagtion";
import screenNameEnum from "../helper/screenNameEnum";
import FeedList from "../screens/Feed/feedList/feedList";

const AppNavigation = () => {

    const RootStack = createNativeStackNavigator();
    const user = false;

    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {!user 
                ?
                <RootStack.Screen
                    name={screenNameEnum.AuthStack}
                    component={AuthNavigation}
                />
                :
                <RootStack.Screen
                    name={screenNameEnum.FeedList}
                    component={FeedList}
                />
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigation;