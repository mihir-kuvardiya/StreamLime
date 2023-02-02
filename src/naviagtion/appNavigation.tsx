import React, { useEffect } from "react";
import { LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from "./authNaviagtion";
import screenNameEnum from "../helper/screenNameEnum";
import BottomTabNavigation from "./bottomTabNavigation";
import CommentScreen from "../screens/Feed/commentScreen/commentScreen";
import FeedDetailScreen from "../screens/Feed/feedDetail/feedDetail";
import UserProfileScreen from "../screens/Feed/profile/userProfile";
import TopTabBar from "../screens/Feed/profile/component/followFollowingTopTabNavigation";
import { useUserData } from "../redux/reducers/userSlice/userSlice";
import { openUrl } from "../helper/helper";
import dynamicLinks from '@react-native-firebase/dynamic-links';

const deepLinksConf = {
    initialRouteName: 'BottomTabNavigation',
    screens: {
        FeedDetailScreen: {
            path: 'feed/:postId',
            parse: {postId: id => id},
        }
    },
};


const linking: LinkingOptions = {
    prefixes: ['streamline://', 'https://streamlline.page.link'],
    config: deepLinksConf,
};

const AppNavigation = () => {

    const userData = useUserData();
    const RootStack = createNativeStackNavigator();

    useEffect(()=>{

        setTimeout(() => {
            const unsubscribe = dynamicLinks().onLink(link => {
                if (link) {
                  openUrl(link?.url);
                }
            });
            //background listener
            dynamicLinks().getInitialLink().then(link => {
                if (link) {
                    openUrl(link?.url);
                }
            });
            return () => unsubscribe();
        }, 8000);
    },[])

    return(
        <NavigationContainer linking={linking}>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {!userData ?
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