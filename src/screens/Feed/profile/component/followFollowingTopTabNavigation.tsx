import React from 'react';
import { useRoute } from '@react-navigation/native';
import {SafeAreaView,Text,View} from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import {TabBar, TabView} from 'react-native-tab-view';
import Header from '../../../../components/header/header';
import colorPalates from '../../../../theme/colorPalates';
import FollowersScreen from './followers/followers';
import FollowingsScreen from './followings/followings';

const TopTabBar = () => {

    const route = useRoute();
    const [index, setIndex] = React.useState(route?.params?.index || 0);
    const [routes] = React.useState([
      {key: 'followers', title: 'followers'},
      {key: 'following', title: 'following'},
    ]);

    const renderScene = ({route, jumpTo}: {route: any; jumpTo: any}) => {
        switch (route?.key) {
          case 'followers':
            return (
              <FollowersScreen {...route} jumpTo={jumpTo} />
            );
          case 'following':
            return (
              <FollowingsScreen {...route} jumpTo={jumpTo}/>
            );
        }
      };

    const renderTabBar = (props: any) => (
        <TabBar
          {...props}
          pressColor={'transparent'}
          style={style.renderTabBar}
          indicatorStyle={{backgroundColor: 'transparent'}}
          renderLabel={({route,focused}) => {
            const isFollowers = route?.key === 'followers';
            return (
              <Text
                style={focused ? style.renderFocusedTabBarText : style.renderTabBarText}>
                {isFollowers ? 'Followers' : 'Following'}
              </Text>
            );
          }}
        />
      );

    return(
        <SafeAreaView style={{flex:1}}>
            <Header title='mihir_2811' isBack={true}/>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                style={{marginTop:ms(5)}}
                onIndexChange={setIndex}
            />
        </SafeAreaView>
    )
}

export default TopTabBar;

const style = ScaledSheet.create({
  renderTabBar:{
    backgroundColor: 'white',
    elevation: 0,
    borderWidth:1,
    borderColor:colorPalates.AppTheme.border,
    borderRadius:ms(10),
    margin:ms(10),
    height: ms(45),
    justifyContent:'center'
  },
  renderTabBarText:{
    color: colorPalates.AppTheme.text,
    fontSize: ms(15),
    fontWeight:'500'
  },
  renderFocusedTabBarText:{
    color: colorPalates.AppTheme.primary,
    fontSize: ms(15),
    fontWeight:'500'
  }
})