import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import Header from "../../../components/header/header";
import FeedCard from "../feedList/FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedDetailData } from "../../../redux/reducers/feedSlice/feedSlice";
import colorPalates from "../../../theme/colorPalates";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";

const FeedDetailScreen = () => {

    const route:any = useRoute();
    const dispatch = useDispatch();
    const userData = useUserData();             
    const feedDetail = useFeedDetailData();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getUniquePost();
    },[route])
    
    const getUniquePost = async () => {
        setLoading(true);
        try {
            const postData:any = await firestore().collection('posts').doc(route?.params?.postId).get();
            let date = new Date(postData._data?.createdAt.toDate())
            const userDetail:any = await firestore().collection('user').doc(postData._data.userId).get();
            const isLike = await firestore().collection('likes').doc(`LIKE#${postData._data?.postId}#${userData?.userId}`).get()
            const likeCount = await firestore().collection('likes').where('postId','==',postData._data?.postId).get();
            const commentCount = await firestore().collection('comment').where('postId','==',postData._data?.postId).get();
            
            dispatch(feedAction.setFeedData({
                collectionName:'feedDetail',
                data:{
                    postId:postData._data?.postId,
                    postUrl:postData._data?.postUrl,
                    postDescription:postData._data?.postDescription,
                    createdAt:date.toString(),
                    isLiked: isLike.exists ? true : false,
                    userId:postData._data?.userId,
                    profilePicture:userDetail._data?.profilePicture,
                    userName:userDetail._data?.userName,
                    likeCount: likeCount.size,
                    commentCount: commentCount.size,
                }
            }))
           setLoading(false);
        } catch (error) {
            console.log(error,'error from get unique post')
            setLoading(false);
        }
    }

    return(
        <>
            <SafeAreaView >
                <Header isBack={true} title={'StreamLine'} />
            </SafeAreaView>
            <KeyboardAwareScrollView style={{flex:1}}>
            {loading ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary} style={{flex:1,}}/>
            </View>
                :
                <View style={{marginBottom:ms(40)}}>
                <FeedCard 
                    item={feedDetail}
                />
                </View>
            }
            </KeyboardAwareScrollView>
        </>
    )
}

export default FeedDetailScreen;