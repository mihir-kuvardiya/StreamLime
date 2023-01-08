import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native"
import Header from "../../../components/header/header";
import FeedCard from "../feedList/FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';

const FeedDetailScreen = () => {

    const route = useRoute();
    const [post, setPost] = useState('');
    const [userProfile, setUserProfile] = useState([])

    useEffect(()=>{
        getUniquePost();
    },[])

    const getUniquePost = async () => {
        try {
            const postData = await firestore().collection('posts').doc(route?.params?.postId).get();
            setPost(postData._data)
            const userDetail = await firestore().collection('user').doc(postData._data.userId).get();
            setUserProfile(userDetail._data)
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
            item={post}
            userProfile={userProfile}
        />
        </>
    )
}

export default FeedDetailScreen;