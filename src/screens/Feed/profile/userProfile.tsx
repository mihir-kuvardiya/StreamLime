import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View ,FlatList, ActivityIndicator, RefreshControl} from "react-native";
import Header from "../../../components/header/header";
import screenNameEnum from "../../../helper/screenNameEnum";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";
import colorPalates from "../../../theme/colorPalates";
import ImageLoader from "./component/imageLoader";
import userProfileScreenStyle from "./userProfileScreenStyle";
import firestore from '@react-native-firebase/firestore';
import images from "../../../theme/images";
import { Emmiter } from "../../../helper/helper";

const UserProfileScreen = () => {

    const userData = useUserData();
    const route:any = useRoute();
    const navigation:any = useNavigation();
    const [loading, setLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [profileUser, setProfileUser] = useState([]);
    const [posts, setPosts] = useState([])
    const [isFollow, setIsFollow] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        getUserDetail();   
        getUserPosts();
        isFollowOrNot();
        getFollowerCount();
        getFollowingCount();
    },[route])

    useEffect (()=>{
        const emit = Emmiter.addListener('addFollowers',() => {
            if (route?.params?.userId === userData?.userId) {
                console.log('+++++++++++++++++')
                setFollowingCount(val => val + 1);
            }
        })
        return () => {emit.remove();};
    },[])

    useEffect (()=>{
        const emit = Emmiter.addListener('removeFollowers', () => {
            if (route?.params?.userId === userData?.userId) {
                console.log('-------------')
                setFollowingCount(val => val - 1);
            }
        })
        return () => {emit.remove();};
    },[])


    const getUserDetail = async () => {
        setLoading(true)
        try {
            const user:any = await firestore().collection('user').doc(route?.params?.userId).get();
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
        .then((res:any)=>{
            setPosts(res._docs);
            setPostLoading(false);
            setRefreshing(false);
        })
        .catch((error)=>{
            setPostLoading(false);
            setRefreshing(false);
            console.log(error,'error from get posts in userprofile');
        })
    }

    const isFollowOrNot = () => {
        firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${route?.params?.userId}`).get()
        .then((result)=>{
            if(result.exists){
                setIsFollow(true)
            }else{
                setIsFollow(false)
            }
        })
    }

    const getFollowerCount = () => {
        firestore().collection('followFollowing').where('oppositeUserId','==',route?.params?.userId).get()
        .then((result)=>setFollowersCount(result.size))
    }

    const getFollowingCount = () => {
        firestore().collection('followFollowing').where('userId','==',route?.params?.userId).get()
        .then((result)=>setFollowingCount(result.size))
    }

    const onPressEditProfile = () => {
        navigation.navigate(screenNameEnum.EditProfileScreen)
    }

    const onPressFollowers = () => {
        navigation.navigate(screenNameEnum.TopTabBar,{index: 0, userId: route?.params?.userId, userName:profileUser?.userName})
    }

    const onPressFollowing = () => {
        navigation.navigate(screenNameEnum.TopTabBar,{index: 1, userId: route?.params?.userId, userName:profileUser?.userName})
    }

    const onPressFollow = () => {
        setIsFollow(!isFollow)
        try {
            firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${route?.params?.userId}`).get()
            .then((result)=>{
                if(result.exists){
                    firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${route?.params?.userId}`).delete()
                    .then(()=>{
                        console.log('unfollow')
                        setFollowersCount(followersCount - 1)
                    })
                }else{
                    firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${route?.params?.userId}`).set({
                        userId: userData?.userId,
                        oppositeUserId: route?.params?.userId
                    }).then(()=>{
                        console.log('following')
                        setFollowersCount(followersCount + 1)
                    })
                }
            })
        } catch (error) {
            console.log(error,'error in is follow in user profile')
        }
    }

    const onRefreshFlatList = () => {
        setRefreshing(true);
        getUserPosts();
    };

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
                    <Text style={userProfileScreenStyle.Counter}>{posts.length}</Text>
                    <Text style={userProfileScreenStyle.conterText}>Posts</Text>
                </View>
                <TouchableOpacity style={userProfileScreenStyle.CounterContainer} onPress={onPressFollowers}>
                    <Text style={userProfileScreenStyle.Counter}>{followersCount}</Text>
                    <Text style={userProfileScreenStyle.conterText}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={userProfileScreenStyle.CounterContainer} onPress={onPressFollowing}>
                    <Text style={userProfileScreenStyle.Counter}>{followingCount}</Text>
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
                <TouchableOpacity style={userProfileScreenStyle.editButton} onPress={onPressFollow}>
                    <Text style={userProfileScreenStyle.editProfileText}>{isFollow ? 'Following' : 'Follow'}</Text>
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
                    refreshControl={
                        <RefreshControl
                          colors={[colorPalates.AppTheme.primary]}
                          refreshing={refreshing}
                          onRefresh={onRefreshFlatList}
                        />
                    }
                />
        </>
        }
        </SafeAreaView>
    )
}

export default UserProfileScreen;