import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../../components/header/header";
import colorPalates from "../../../theme/colorPalates";
import commentScreenStyle from "./commentScreenStyle";
import CommentView from "./component/commentView";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { showToast } from "../../../helper/helper";
import { useUserData } from "../../../redux/reducers/userSlice/userSlice";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { commentAction, useCommentistData } from "../../../redux/reducers/commentSlice/commetnSlice";
import NoCommentsView from "./noComments/noComments";

const data = [
    
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    
]

const CommentScreen = () => {

    const route = useRoute();
    const dispatch = useDispatch();
    const userData = useUserData();
    const postId = route?.params?.postId;
    const commentData = useCommentistData();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    console.log(commentData,'ccccccccc')

    useEffect(()=>{
        getInitComments();
    },[])

    const getInitComments = async () => {
        setLoading(true);
        try {
            const res = firestore().collection('comment').orderBy('createdAt', 'desc').where('postId','==',route?.params?.postId).get();
            let promises: any[] = [];
            let comments: any[] = [];
            (await res).forEach(element => {
                let date = new Date(element.data().createdAt.toDate())
                promises.push(getUserDetail(element.data().userId)
                .then((val:any)=>{
                    comments = [...comments,{
                        commentId: element.data().commentId,
                        commentText: element.data().commentText,
                        createdAt: date.toString(),
                        postId: element.data().postId,
                        userId: element.data().userId,
                        profilePicture: val.profilePicture,
                        userName: val.userName,
                    }]
                })
                .catch((e)=>{
                    console.log(e,'erro from get promise rejection');
                    setLoading(false);
                })
                )
            })

            await Promise.all(promises).then(()=>{
                dispatch(commentAction.setCommentData({collectionName:'commentsList', data: comments}));
                setLoading(false);
            })
        } catch (error) {
            console.log(error,'error in get init comments')
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

    const onPressSend = (comment:string) => {

        if(comment.trim() === ''){
            showToast('Enter a comment');
            return;
        }

        const commentId = `comment#${userData.userId}` 

        firestore().collection('comment').doc(commentId)
        .set({
            commentId:commentId,
            postId: postId,
            commentText: comment,
            createdAt: new Date(),
            userId: userData.userId
        })
        .then(() => {
            console.log('comment added!');
            setComment('')
        });
    }

    return(
        <SafeAreaView style={{flex:1}}>
            {loading ?
                <ActivityIndicator size={'large'} color={colorPalates.AppTheme.primary} style={{flex:1,justifyContent:'center',alignItems:'center'}}/>
            :
                <>
                <Header isBack={true} title={'comments'}/>
                <View style={commentScreenStyle.mainContainer}>
                        {commentData.length === 0 || commentData.length===1 ? 
                            <Text style={commentScreenStyle.totalComments}>
                                {commentData.length} comment
                            </Text>:    
                            <Text style={commentScreenStyle.totalComments}>
                                {commentData.length} comments
                            </Text>    
                        }
                    
                </View>
                <FlatList 
                    data={commentData}
                    renderItem={({item,index})=>(<CommentView item={item} key={index}/>)}
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={true}
                    keyboardShouldPersistTaps="always"
                    scrollEventThrottle={16}
                    maxToRenderPerBatch={5}
                    windowSize={50}
                    contentContainerStyle={{flex:1,paddingBottom: 40}}
                    ListEmptyComponent={
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <NoCommentsView/>
                        </View>
                    }
                />
                <View style={commentScreenStyle.CommentTextInputView}>
                    <TextInput
                        placeholder="comment..."
                        placeholderTextColor={colorPalates.AppTheme.border}
                        style={commentScreenStyle.CommentTextInput}
                        multiline={true}
                        value={comment}
                        onChangeText={val=>setComment(val)}
                    />
                    <TouchableOpacity style={commentScreenStyle.sendButton} onPress={()=>onPressSend(comment)}>
                        <IconIonicons name="paper-plane-sharp" size={26} color={colorPalates.AppTheme.primary}/>
                    </TouchableOpacity>
                </View>
                </>
            }
        </SafeAreaView>
    )
}

export default CommentScreen;