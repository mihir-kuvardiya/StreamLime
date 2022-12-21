import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View ,FlatList} from "react-native";
import { ms } from "react-native-size-matters";
import Header from "../../../components/header/header";
import screenNameEnum from "../../../helper/screenNameEnum";
import EditProfileScreen from "../editProfile/editProfile";
import ImageLoader from "./component/imageLoader";
import userProfileScreenStyle from "./userProfileScreenStyle";

const imageData = [
    'https://images.pexels.com/photos/8972265/pexels-photo-8972265.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14704971/pexels-photo-14704971.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/11544093/pexels-photo-11544093.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/7787078/pexels-photo-7787078.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14074800/pexels-photo-14074800.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14610789/pexels-photo-14610789.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14410988/pexels-photo-14410988.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/13539518/pexels-photo-13539518.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/10011640/pexels-photo-10011640.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14691038/pexels-photo-14691038.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/12179758/pexels-photo-12179758.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14505987/pexels-photo-14505987.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/8356400/pexels-photo-8356400.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/13877994/pexels-photo-13877994.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', 
    'https://images.pexels.com/photos/14388715/pexels-photo-14388715.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/11735849/pexels-photo-11735849.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/6530613/pexels-photo-6530613.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/6968340/pexels-photo-6968340.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14589787/pexels-photo-14589787.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/13846070/pexels-photo-13846070.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/13369610/pexels-photo-13369610.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
]

const UserProfileScreen = () => {

    const navigation = useNavigation();
    const [isYou, setYou] = useState(true)

    const onPressEditProfile = () => {
        navigation.navigate(screenNameEnum.EditProfileScreen)
    }

    const onPressFollowers = () => {
        console.log('followers clicked')
        navigation.navigate(screenNameEnum.TopTabBar,{index: 0})
    }

    const onPressFollowing = () => {
        console.log('following clicked')
        navigation.navigate(screenNameEnum.TopTabBar,{index: 1})
    }

    return(
        <>
        <SafeAreaView>
            <Header title='mihir_2811' isBack={true}/>
        </SafeAreaView>
            <View style={userProfileScreenStyle.headerContainer}>
                <Image 
                    style={userProfileScreenStyle.profileImage}
                    source={{
                        uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
                    }}
                    resizeMode={"cover"} 
                />
                <View style={userProfileScreenStyle.CounterContainer}>
                    <Text style={userProfileScreenStyle.Counter}>23.5K</Text>
                    <Text style={userProfileScreenStyle.conterText}>Posts</Text>
                </View>
                <TouchableOpacity style={userProfileScreenStyle.CounterContainer} onPress={onPressFollowers}>
                    <Text style={userProfileScreenStyle.Counter}>23.5K</Text>
                    <Text style={userProfileScreenStyle.conterText}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={userProfileScreenStyle.CounterContainer} onPress={onPressFollowing}>
                    <Text style={userProfileScreenStyle.Counter}>23.5K</Text>
                    <Text style={userProfileScreenStyle.conterText}>Following</Text>
                </TouchableOpacity>
            </View>
            <View style={userProfileScreenStyle.bioContainer}>
                <Text style={userProfileScreenStyle.fullName}>mihir kuvardiya</Text>
                <Text style={userProfileScreenStyle.bio}>hello hiii i am mihir kuvardiya{'\n'}welcome to my profile{'\n'}how are you guys</Text>
            </View>
            {isYou ?
                <TouchableOpacity style={userProfileScreenStyle.editButton} onPress={onPressEditProfile}>
                    <Text style={userProfileScreenStyle.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity style={userProfileScreenStyle.editButton}>
                    <Text style={userProfileScreenStyle.editProfileText}>Unfollow</Text>
                </TouchableOpacity>
            }
            <View style={userProfileScreenStyle.emptyView}/>
                <FlatList
                    data={imageData}
                    renderItem={({item,index})=>(<ImageLoader imageUrl={item} key={index}/>)}
                    keyExtractor={item =>item}
                    numColumns={3}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={true}
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={userProfileScreenStyle.flatListContainer}
                />
        </>
    )
}

export default UserProfileScreen;