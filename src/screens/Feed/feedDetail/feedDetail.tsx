import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import Header from "../../../components/header/header";
import FeedCard from "../feedList/FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedDetailData } from "../../../redux/reducers/feedSlice/feedSlice";
import colorPalates from "../../../theme/colorPalates";

const FeedDetailScreen = () => {

    const route:any = useRoute();
    const dispatch = useDispatch();
    const feedDetail = useFeedDetailData();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getUniquePost();
    },[])
    
    const getUniquePost = async () => {
        setLoading(true);
        try {
            const postData:any = await firestore().collection('posts').doc(route?.params?.postId).get();
            let date = new Date(postData._data?.createdAt.toDate())
            const userDetail:any = await firestore().collection('user').doc(postData._data.userId).get();
            dispatch(feedAction.setFeedData({
                collectionName:'feedDetail',
                data:{
                    postId:postData._data?.postId,
                    postUrl:postData._data?.postUrl,
                    postDescription:postData._data?.postDescription,
                    createdAt:date.toString(),
                    isLiked:postData._data?.isLiked,
                    userId:postData._data?.userId,
                    profilePicture:userDetail._data?.profilePicture,
                    userName:userDetail._data?.userName,
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
        <SafeAreaView style={{flex:1}}>
            <Header isBack={true} title={'StreamLine'} />
            {loading ?
                <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary} style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
                :
                <FeedCard 
                    item={feedDetail}
                />
            }
        </SafeAreaView>
        </>
    )
}

export default FeedDetailScreen;