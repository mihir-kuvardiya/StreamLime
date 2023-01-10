import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react"
import { SafeAreaView } from "react-native"
import Header from "../../../components/header/header";
import FeedCard from "../feedList/FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedDetailData } from "../../../redux/reducers/feedSlice/feedSlice";

const FeedDetailScreen = () => {

    const route = useRoute();
    const dispatch = useDispatch();
    const feedDetail = useFeedDetailData();

    useEffect(()=>{
        getUniquePost();
    },[])
    
    const getUniquePost = async () => {
        try {
            const postData = await firestore().collection('posts').doc(route?.params?.postId).get();
            let date = new Date(postData._data?.createdAt.toDate())
            const userDetail = await firestore().collection('user').doc(postData._data.userId).get();
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
           
        } catch (error) {
            console.log(error,'error from get unique post')
        }
    }

    return(
        <>
        <SafeAreaView>
            <Header isBack={true} title={'StreamLine'} />
        </SafeAreaView>
        <FeedCard 
            item={feedDetail}
        />
        </>
    )
}

export default FeedDetailScreen;