import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfileScreen from "../screens/Feed/profile/userProfile";
import FeedList from "../screens/Feed/feedList/feedList";
import CreateFeedScreen from "../screens/Feed/createFeed/createFeed";
import screenNameEnum from "../helper/screenNameEnum";
import { ms } from "react-native-size-matters";

const BottomTabNavigation = () => {

    const bottomTab = createBottomTabNavigator();

    const routes = [
        {
            route: screenNameEnum.FeedList,
            label: 'FeedList',
            component: FeedList,
        },
        {
            route: screenNameEnum.CreateFeedScreen,
            label: 'CreateFeedScreen',
            component: CreateFeedScreen,
        },
        {
            route: screenNameEnum.UserProfileScreen,
            label: 'UserProfileScreen',
            component: UserProfileScreen,
        }
    ]
    

    return(
        <bottomTab.Navigator screenOptions={{headerShown: false}}>
            {routes.map(item=>{
                return(
                    <bottomTab.Screen 
                        key={item.label}
                        name={item.route} 
                        component={item.component} 
                        options={{
                            tabBarShowLabel: true,
                            tabBarStyle:{
                                position:"absolute",
                                margin:ms(15),
                                borderRadius:ms(10)
                            }
                        }}
                    />
                )
            })}
        </bottomTab.Navigator>
    )
}

export default BottomTabNavigation;