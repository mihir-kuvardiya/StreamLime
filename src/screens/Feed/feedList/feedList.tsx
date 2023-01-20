import React, { useEffect, useState } from "react"
import { Text, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native"
import { ms } from "react-native-size-matters";
import Header from "../../../components/header/header";
import FeedCard from "./FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedListData } from "../../../redux/reducers/feedSlice/feedSlice";
import colorPalates from "../../../theme/colorPalates";

const FeedList = () => {

    const dispatch = useDispatch();
    const feedData = useFeedListData();
    const [loading, setLoading] = useState(false);
    const [postArray, setPostArray] = useState([])

    useEffect(()=>{
        getInitPosts();
    },[])

    const getInitPosts = () => {
        setLoading(true);
        firestore().collection('posts').orderBy('createdAt', 'desc').get()
        .then((res)=>{
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
                    setLoading(false);
                });
            };
            console.log(postArray,'ppppppppppppppppp')
            dispatch(feedAction.setFeedData({collectionName:'feedList', data:postArray }))
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error,'error in get posts');
            setLoading(false);
        })
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Header title="StreamLine"/>
            {loading?
            <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary} style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
            :<FlatList 
                data={feedData}
                renderItem={({item,index})=>(<FeedCard item={item} key={index}/>)}
                showsVerticalScrollIndicator={false}
                disableVirtualization={true}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                maxToRenderPerBatch={5}
                windowSize={50}
                contentContainerStyle={{paddingBottom: 160}}
            />}
        </SafeAreaView>
    )
}

export default FeedList;