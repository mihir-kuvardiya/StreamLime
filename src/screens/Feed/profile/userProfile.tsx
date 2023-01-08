import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View ,FlatList, ActivityIndicator} from "react-native";
import Header from "../../../components/header/header";
import screenNameEnum from "../../../helper/screenNameEnum";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";
import colorPalates from "../../../theme/colorPalates";
import ImageLoader from "./component/imageLoader";
import userProfileScreenStyle from "./userProfileScreenStyle";
import firestore from '@react-native-firebase/firestore';
import images from "../../../theme/images";

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

    const userData = useUserData();
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [profileUser, setProfileUser] = useState([]);

    useEffect(()=>{
        getUserDetail();    
    },[])

    const getUserDetail = async () => {
        setLoading(true)
        try {
            const user = await firestore().collection('user').doc(userData?.userId).get();
            setProfileUser(user._data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error,'error from get user data in user profile')
        }
        
    }

    const onPressEditProfile = () => {
        navigation.navigate(screenNameEnum.EditProfileScreen)
    }

    const onPressFollowers = () => {
        navigation.navigate(screenNameEnum.TopTabBar,{index: 0})
    }

    const onPressFollowing = () => {
        navigation.navigate(screenNameEnum.TopTabBar,{index: 1})
    }

    return(
        <SafeAreaView style={{flex:1}}>
        {loading ?
            <View style={userProfileScreenStyle.loadingContainer}>
                <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary}/>
            </View>
        :
            <>
            <Header title={profileUser?.userName} isBack={true}/>
            <View style={userProfileScreenStyle.headerContainer}>
                <Image 
                    style={userProfileScreenStyle.profileImage}
                    source={profileUser?.profilePicture ? { uri: profileUser?.profilePicture }: images.dp}
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
                {profileUser?.displayName && <Text style={userProfileScreenStyle.fullName}>{profileUser?.displayName}</Text>}
                {profileUser?.bio && <Text style={userProfileScreenStyle.bio}>{profileUser?.bio}</Text>}
            </View>
            {route?.params?.userId === userData?.userId ?
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
        }
        </SafeAreaView>
    )
}

export default UserProfileScreen;