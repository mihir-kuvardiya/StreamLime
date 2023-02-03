import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../../theme/images";
import followersStyle from "./followersStyle";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { followFollowingAction, useFollowersListData } from "../../../../../redux/reducers/followFollowingSlice/followFollowingSlice";
import colorPalates from "../../../../../theme/colorPalates";
import IconEntypo from "react-native-vector-icons/Entypo";
import { ms } from "react-native-size-matters";
import { useUserData } from "../../../../../redux/reducers/userSlice/userSlice";

const FollowersScreen = () => {

    const route:any = useRoute();
    const dispatch = useDispatch();
    const userData = useUserData();
    const followersListRedux = useFollowersListData();
    const userId = route?.params?.userId;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        getFollowers();
    },[])

    const getFollowers = async () => {
        setLoading(true);
        try {
            const res = firestore().collection('followFollowing').where('oppositeUserId','==',route?.params?.userId).get()
            let promises: any[] = [];
            let followersList: any[] = [];
            (await res).forEach(element => {
                promises.push(
                    getUserDetail(element.data().userId)
                    .then(async (val:any)=>{
                        const isFollow = await firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${element.data().userId}`).get()
                        followersList = [...followersList,{
                            userId: element.data().userId,
                            userName: val.userName,
                            profilePicture: val.profilePicture,
                            isFollow: isFollow.exists ? true : false
                        }] 
                    })
                    .catch((e)=>{
                        setLoading(false);
                        setRefreshing(false);
                        console.log(e,'promise rejection in followers list')
                    })
                )
            })
            await Promise.all(promises).then(()=>{
                setLoading(false);
                setRefreshing(false);
                dispatch(followFollowingAction.setFollowerListData(followersList))
            })
        } catch (error) {
            setLoading(false);
            setRefreshing(false);
            console.log(error,'error in get followers')
        }
    }

    const getUserDetail = (val:string) => {
        return new Promise((resolve, reject) => {
            firestore().collection('user').doc(val).get()
            .then((result)=>{
                resolve(result.data())
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }

    const onRefreshFlatList = () => {
        setRefreshing(true);
        getFollowers();
    };

    const FollowerRow = ({item}) => {

        const [isFollow, setIsFollow] = useState(item?.isFollow);

        const onPressFollow = () => {
            setIsFollow(!isFollow)
            try {
                firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${item?.userId}`).get()
                .then((result)=>{
                    if(result.exists){
                        firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${item?.userId}`).delete()
                        .then(()=>{
                            console.log('unfollow in followers List')
                        })
                    }else{
                        firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${item?.userId}`).set({
                            userId: userData?.userId,
                            oppositeUserId: item?.userId
                        }).then(()=>{
                            console.log('following in followers List')
                        })
                    }
                })
            } catch (error) {
                console.log(error,'error in is follow in followerlist')
            }
        }
        
        return(
        <View style={followersStyle.rowContainer}>
            <View style={followersStyle.rowSecondContainer}>
            <Image
                 style={followersStyle.image}
                 source={item?.profilePicture ? {
                     uri: item?.profilePicture,
                 } : images.dp}
                 resizeMode={"cover"} 
            />
            <Text style={followersStyle.userName}>{item?.userName}</Text>
            </View>
            {item?.userId === userData?.userId ?
            <View style={followersStyle.followingButton}>
                <Text style={followersStyle.followingText}>You</Text>
            </View>
            :
            <TouchableOpacity style={isFollow ? followersStyle.followingButton : followersStyle.followButton} onPress={onPressFollow}>
                <Text style={isFollow ? followersStyle.followingText : followersStyle.followText}>{isFollow ? 'Following' : 'Follow'}</Text>
            </TouchableOpacity>
            }
        </View>
        )
    }

    return(
        <View style={{flex:1}}>
            {loading ? 
                <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary} style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
            : 
                <FlatList 
                    data={followersListRedux}
                    renderItem={({item,index})=>(<FollowerRow item={item} key={index}/>)}
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={true}
                    keyboardShouldPersistTaps="always"
                    scrollEventThrottle={16}
                    maxToRenderPerBatch={5}
                    windowSize={50}
                    contentContainerStyle={followersStyle.flatListContainer}
                    ListEmptyComponent={
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <IconEntypo name="slideshare" size={150} color={colorPalates.AppTheme.primary}/>
                            <Text style={{fontSize:ms(22),fontFamily:'Ubuntu-Regular',marginTop:ms(20),color:colorPalates.AppTheme.primary}}>0 Followers</Text>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                          colors={[colorPalates.AppTheme.primary]}
                          refreshing={refreshing}
                          onRefresh={onRefreshFlatList}
                        />
                    }
                />
            }
        </View>
    )
}

export default FollowersScreen;