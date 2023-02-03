import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { followFollowingAction, useFollowingListData } from "../../../../../redux/reducers/followFollowingSlice/followFollowingSlice";
import images from "../../../../../theme/images";
import followingStyle from "./followingStyle";
import firestore from '@react-native-firebase/firestore';
import { ms } from "react-native-size-matters";
import colorPalates from "../../../../../theme/colorPalates";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useUserData } from "../../../../../redux/reducers/userSlice/userSlice";

const FollowingsScreen = () => {

    const route:any = useRoute();
    const dispatch = useDispatch();
    const userData = useUserData();
    const followingsListRedux = useFollowingListData();
    const userId = route?.params?.userId;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        getFollowings();
    },[])

    const getFollowings = async () => {
        try {
            setLoading(true);
            const res = firestore().collection('followFollowing').where('userId','==',route?.params?.userId).get()
            let promises: any[] = [];
            let followingList: any[] = [];
            (await res).forEach(element => {
                promises.push(
                    getUserDetail(element.data().oppositeUserId)
                    .then(async (val:any)=>{
                        const isFollow = await firestore().collection('followFollowing').doc(`FOLLOWING#${userData?.userId}#${element.data().oppositeUserId}`).get()
                        followingList = [...followingList,{
                            userId: element.data().oppositeUserId,
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
                dispatch(followFollowingAction.setFollowingListData(followingList))
            })
        } catch (error) {
            setRefreshing(false);
            setLoading(false);
            console.log(error,'error from get followings in followings list')
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
        getFollowings();
    };

    const FollowingRow = ({item}) => {

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
                console.log(error,'error in follow in following list')
            }
        }

        return(
        <View style={followingStyle.rowContainer}>
            <View style={followingStyle.rowSecondContainer}>
            <Image
                 style={followingStyle.image}
                 source={item?.profilePicture ? {
                     uri: item?.profilePicture,
                 } : images.dp}
                 resizeMode={"cover"} 
            />
            <Text style={followingStyle.userName}>{item?.userName}</Text>
            </View>
            {item?.userId === userData?.userId ?
            <View style={followingStyle.followingButton}>
                <Text style={followingStyle.followingText}>You</Text>
            </View>
            :
            <TouchableOpacity style={isFollow ? followingStyle.followingButton : followingStyle.followButton} onPress={onPressFollow}>
                <Text style={isFollow ? followingStyle.followingText : followingStyle.followText}>{isFollow ? 'Following' : 'Follow'}</Text>
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
                        data={followingsListRedux}
                        renderItem={({item,index})=>(<FollowingRow item={item} key={index}/>)}
                        showsVerticalScrollIndicator={false}
                        disableVirtualization={true}
                        keyboardShouldPersistTaps="always"
                        scrollEventThrottle={16}
                        maxToRenderPerBatch={5}
                        windowSize={50}
                        contentContainerStyle={followingStyle.flatListContainer}
                        ListEmptyComponent={
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <IconEntypo name="slideshare" size={150} color={colorPalates.AppTheme.primary}/>
                                <Text style={{fontSize:ms(22),fontFamily:'Ubuntu-Regular',marginTop:ms(20),color:colorPalates.AppTheme.primary}}>0 Followings</Text>
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

export default FollowingsScreen;