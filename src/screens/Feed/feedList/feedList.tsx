import React, { useEffect, useState } from "react"
import { Text, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native"
import { ms } from "react-native-size-matters";
import Header from "../../../components/header/header";
import FeedCard from "./FeedCard/feedCard";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { feedAction, useFeedListData } from "../../../redux/reducers/feedSlice/feedSlice";
import colorPalates from "../../../theme/colorPalates";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";

const FeedList = () => {

    const dispatch = useDispatch();
    const userData = useUserData();
    const feedData = useFeedListData();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getInitPosts()
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
                        const isLike = await firestore().collection('likes').doc(`LIKE#${element.data().postId}#${userData?.userId}`).get()
                        posts = [...posts,{
                            postId:element.data().postId,
                            postUrl:element.data().postUrl,
                            postDescription:element.data().postDescription,
                            createdAt: date.toString(),
                            isLiked: isLike.exists ? true : false,
                            userId:element.data().userId,
                            profilePicture: val.profilePicture,
                            userName: val.userName,
                        }]
                })
                .catch((e)=>{
                    console.log(e,'erro from get promise rejection');
                    setLoading(false);
                })
                )
            });

            await Promise.all(promises).then(()=>{
                console.log('called')
                dispatch(feedAction.setFeedData({collectionName:'feedList', data: posts}));
                setLoading(false);
            })

        } catch (error) {
            console.log(error,'error from get posts');
            setLoading(false);
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

    const getLikeDetail = (val:string) => {
        return new Promise((resolve,reject)=>{
            firestore().collection('likes').doc(val).get()
            .then((result)=>{
                if(result.exists){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
            .catch((err)=>{
                reject(err);
            })
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