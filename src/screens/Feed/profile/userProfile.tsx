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

const UserProfileScreen = () => {

    const userData = useUserData();
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [profileUser, setProfileUser] = useState([]);
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        getUserDetail();   
        getUserPosts();
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

    const getUserPosts = () => {
        setPostLoading(true);
        firestore().collection('posts').orderBy('createdAt', 'desc').where('userId','==',route?.params?.userId).get()
        .then((res)=>{
            setPosts(res._docs);
            setPostLoading(false);
        })
        .catch((error)=>{
            setPostLoading(false);
            console.log(error,'error from get posts in userprofile');
        })
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
        {loading||postLoading ?
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
                    data={posts}
                    renderItem={({item,index})=>(<ImageLoader item={item} key={index}/>)}
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