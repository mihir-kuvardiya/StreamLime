import React, { useEffect, useState } from "react"
import { Text, View, FlatList, SafeAreaView } from "react-native"
import { ms } from "react-native-size-matters";
import Header from "../../../components/header/header";
import FeedCard from "./FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedListData } from "../../../redux/reducers/feedSlice/feedSlice";

const FeedList = () => {

    const dispatch = useDispatch();
    const feedData = useFeedListData();
    const [postArray, setPostArray] = useState([])

    useEffect(()=>{
        getInitPosts();
    },[])

    const getInitPosts = async () => {
        const res = await firestore().collection('posts').get();
        setPostArray([])
        for(let i=0; i<res._docs.length;i++){
            let date = new Date(res._docs[i]._data?.createdAt.toDate())
            firestore().collection('user').doc(res._docs[i]._data?.userId).get()
            .then((userRes)=>{
                setPostArray((old)=>[...old,{
                    postId: res._docs[i]._data?.postId,
                    postUrl: res._docs[i]._data?.postUrl,
                    postDescription: res._docs[i]._data?.postDescription,
                    createdAt: date.toString(),
                    isLiked: res._docs[i]._data?.isLiked,
                    userId: res._docs[i]._data?.userId,
                    profilePicture: userRes._data?.profilePicture,
                    userName: userRes._data?.userName,
                }])
            })
            .catch((e)=>{
                console.log(e,'error in get user in feed screen');
            });
        };
        dispatch(feedAction.setFeedData({collectionName:'feedList', data:postArray }))
       
    }

    return(
        <SafeAreaView>
            <Header title="StreamLine"/>
            <FlatList 
                data={feedData}
                renderItem={({item,index})=>(<FeedCard item={item} key={index}/>)}
                showsVerticalScrollIndicator={false}
                disableVirtualization={true}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                maxToRenderPerBatch={5}
                windowSize={50}
                contentContainerStyle={{paddingBottom: 160}}
            />
        </SafeAreaView>
    )
}

export default FeedList;