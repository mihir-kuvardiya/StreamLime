import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { followFollowingAction, useFollowingListData } from "../../../../../redux/reducers/followFollowingSlice/followFollowingSlice";
import images from "../../../../../theme/images";
import followingStyle from "./followingStyle";
import firestore from '@react-native-firebase/firestore';
import { ms } from "react-native-size-matters";
import colorPalates from "../../../../../theme/colorPalates";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useUserData } from "../../../../../redux/reducers/userSlice/userSlice";

const data = [
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin123',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
]

const FollowingsScreen = () => {

    const route:any = useRoute();
    const dispatch = useDispatch();
    const userData = useUserData();
    const followingsListRedux = useFollowingListData();
    const userId = route?.params?.userId;
    const [loading, setLoading] = useState(false);

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
                        console.log(e,'promise rejection in followers list')
                    })
                )
            })
            await Promise.all(promises).then(()=>{
                setLoading(false);
                dispatch(followFollowingAction.setFollowingListData(followingList))
            })
        } catch (error) {
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

    const FollowingRow = ({item}) => {
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
            item?.isFollow ?
            <TouchableOpacity style={followingStyle.followingButton}>
                <Text style={followingStyle.followingText}>Following</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity style={followingStyle.followButton}>
                <Text style={followingStyle.followText}>Follow</Text>
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
                                <Text style={{fontSize:ms(22),fontFamily:'Ubuntu-Regular',marginTop:ms(20),color:colorPalates.AppTheme.primary}}>No Followers</Text>
                            </View>
                        }
                    />
            }
       
        </View>
    )
}

export default FollowingsScreen;