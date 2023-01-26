import React, { useEffect, useRef, useState } from "react"
import { Text, View, FlatList, SafeAreaView, ActivityIndicator, RefreshControl } from "react-native"
import { ms } from "react-native-size-matters";
import Header from "../../../components/header/header";
import FeedCard from "./FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedListData } from "../../../redux/reducers/feedSlice/feedSlice";
import colorPalates from "../../../theme/colorPalates";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";
import { Emmiter } from "../../../helper/helper";

const FeedList = () => {

    const dispatch = useDispatch();
    const userData = useUserData();
    const feedData = useFeedListData();
    const FlatListRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        getInitPosts()
        const emit = Emmiter.addListener('getFeed', () => {
            getInitPosts();
            if(feedData.length <= 1){
                return;
            }
            FlatListRef.current?.scrollToIndex({
                index: 0,
                animated: true,
            });
        })
        return () => {emit.remove();};
    },[])

    const getInitPosts = async () => {
        setLoading(true);
        try {
            const res = firestore().collection('posts').orderBy('createdAt', 'desc').get();
            let promises: any[] = [];
            let posts: any[] = [];
            (await res).forEach(element => {
                let date = new Date(element.data().createdAt.toDate())
                promises.push(
                    getUserDetail(element.data().userId)
                    .then(async (val:any)=>{
                        const isLike = await firestore().collection('likes').doc(`LIKE#${element.data().postId}#${userData?.userId}`).get();
                        const likeCount = await firestore().collection('likes').where('postId','==',element.data().postId).get();
                        const commentCount = await firestore().collection('comment').where('postId','==',element.data().postId).get();

                        posts = [...posts,{
                            postId:element.data().postId,
                            postUrl:element.data().postUrl,
                            postDescription:element.data().postDescription,
                            createdAt: date.toString(),
                            isLiked: isLike.exists ? true : false,
                            userId:element.data().userId,
                            profilePicture: val.profilePicture,
                            userName: val.userName,
                            likeCount: likeCount.size,
                            commentCount: commentCount.size,
                        }]
                })
                .catch((e)=>{
                    console.log(e,'erro from get promise rejection');
                    setLoading(false);
                    setRefreshing(false);
                })
                )
            });

            await Promise.all(promises).then(()=>{
                console.log('called')
                dispatch(feedAction.setFeedData({collectionName:'feedList', data: posts}));
                setLoading(false);
                setRefreshing(false);
            })

        } catch (error) {
            console.log(error,'error from get posts');
            setLoading(false);
            setRefreshing(false);
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
        getInitPosts();
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <Header title="StreamLine"/>
            {loading?
            <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary} style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
            :<FlatList 
                data={feedData}
                ref={FlatListRef}
                renderItem={({item,index})=>(<FeedCard item={item} key={index}/>)}
                showsVerticalScrollIndicator={false}
                disableVirtualization={true}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                maxToRenderPerBatch={5}
                windowSize={50}
                contentContainerStyle={{paddingBottom: 160}}
                refreshControl={
                    <RefreshControl
                      colors={[colorPalates.AppTheme.primary]}
                      refreshing={refreshing}
                      onRefresh={onRefreshFlatList}
                    />
                }
            />}
        </SafeAreaView>
    )
}

export default FeedList;