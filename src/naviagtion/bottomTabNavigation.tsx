import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedList from "../screens/Feed/feedList/feedList";
import CreateFeedScreen from "../screens/Feed/createFeed/createFeed";
import screenNameEnum from "../helper/screenNameEnum";
import { ms, ScaledSheet } from "react-native-size-matters";
import colorPalates from "../theme/colorPalates";
import IconFeather from 'react-native-vector-icons/Feather';
import SearchUser from "../screens/Feed/searchUser/searchUser";

const BottomTabNavigation = () => {

    const bottomTab = createBottomTabNavigator();

    const routes = [
        {
            route: screenNameEnum.FeedList,
            label: 'FeedList',
            component: FeedList,
            icon: 'home'
        },
        {
            route: screenNameEnum.CreateFeedScreen,
            label: 'CreateFeedScreen',
            component: CreateFeedScreen,
            icon: 'plus-square'
        },
        {
            route: screenNameEnum.SearchUser,
            label: 'SearchUser',
            component: SearchUser,
            icon: 'user'
        }
    ]
    
    const TabButton = (props: {item: any;onPress: any;accessibilityState: any}) => {

        const {item, onPress, accessibilityState} = props;
        const focused = accessibilityState.selected;

        return(
            <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
              <View
                style={styles.button}>
                <IconFeather
                    name={item?.icon}
                    size={30}
                    color={focused ? colorPalates.AppTheme.primary : colorPalates.AppTheme.text}
                />
              </View>
          </TouchableOpacity>
        )
    }

    return(
        <bottomTab.Navigator screenOptions={{headerShown: false}}>
            {routes.map(item=>{
                return(
                    <bottomTab.Screen 
                        key={item.label}
                        name={item.route} 
                        component={item.component} 
                        options={{
                            tabBarShowLabel: false,
                            tabBarStyle:{
                                position:"absolute",
                                marginHorizontal:ms(12),
                                marginBottom:ms(12),
                                borderRadius:ms(15),
                                height:ms(50)
                            },
                            tabBarButton: props => <TabButton {...props} item={item} />,
                        }}
                    />
                )
            })}
        </bottomTab.Navigator>
    )
}

export default BottomTabNavigation;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      borderColor: colorPalates.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });