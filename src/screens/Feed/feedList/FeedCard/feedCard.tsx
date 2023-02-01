import React, { memo, useState } from "react";
import { Image, Text, View, Pressable, TouchableOpacity } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colorPalates from "../../../../theme/colorPalates";
import colors from "../../../../theme/colors";
import feedCardStyle from "./feedCardStyle";
import { useNavigation } from "@react-navigation/native";
import screenNameEnum from "../../../../helper/screenNameEnum";
import images from "../../../../theme/images";
import moment from "moment";
import FeedImageLoader from "../../../../components/feedImageLoader/feedImageLoader";
import firestore from '@react-native-firebase/firestore';
import { useUserData } from "../../../../redux/reducers/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { feedAction } from "../../../../redux/reducers/feedSlice/feedSlice";
import DeleteModal from "../../../../components/deleteModal/deleteModal";
import { err } from "react-native-svg/lib/typescript/xml";

export interface FeedCardProps{
    item: any,
}

const FeedCard = ({item}:FeedCardProps) => {
    const userData = useUserData();
    const dispatch = useDispatch();
    const naviagtion:any = useNavigation();
    const [visible, setIsVisible] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const onPressProfile = () => {
        naviagtion.navigate(screenNameEnum.UserProfileScreen,{userId: item?.userId})
    }

    const onPressComment = () => {
        naviagtion.navigate(screenNameEnum.CommentScreen,{postId:item?.postId});
    }

    const onPressLike = () => {
        dispatch(feedAction.updateLike({
            id:item?.postId
        }))
        try {
            firestore().collection('likes').doc(`LIKE#${item?.postId}#${userData?.userId}`).get()
            .then((result)=>{
                if(result.exists){
                    firestore().collection('likes').doc(`LIKE#${item?.postId}#${userData?.userId}`).delete()
                    .then(() => {
                        console.log('like removed !');
                    });
                }else{
                    firestore().collection('likes').doc(`LIKE#${item?.postId}#${userData?.userId}`).set({
                        postId: item?.postId,
                        userId: userData?.userId,
                        createdAt: new Date()
                    })
                    .then(()=>{
                        console.log('like added !');
                    })
                }
            })
            .catch((err)=>{
                console.log(err,'error in get like ot not in feedCard');
            })
            
        } catch (error) {
            console.log(error,'error in like post')
        }
    }

    const onPressMenu = () => {
        if(item?.userId === userData?.userId){
            setIsVisible(true);
        }
    }

    const onPressDelete = () => {
        console.log('deleteClicked')
        // setDeleteLoading(true);
        dispatch(feedAction.deletePost({
            id:item?.postId
        }))
        setDeleteLoading(true);
        try {
            firestore().collection('posts').where('postId','==',item?.postId).get()
            .then((querySnapshot)=>{
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                });
            })
            firestore().collection('likes').where('postId','==',item?.postId).get()
            .then((querySnapshot)=>{
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                });
            })
            firestore().collection('comment').where('postId','==',item?.postId).get()
            .then((querySnapshot)=>{
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                });
            })
            setDeleteLoading(false);
            setIsVisible(false);
        } catch (error) {
            console.log(error,'error from delete post')
            setDeleteLoading(false);
            setIsVisible(false);
            
        }
    }
    
    return(
        <>
        <View style={feedCardStyle.feedContainer}>
            <View style={feedCardStyle.feedHeaderContainer}>
                <View style={feedCardStyle.feedHeaderSecondContainer}>
                    <Image
                        style={feedCardStyle.feedHeaderImage}
                        source={item?.profilePicture ? { uri: item?.profilePicture } : images.dp}
                        resizeMode={"cover"} 
                    />
                    <TouchableOpacity style={feedCardStyle.feedHeaderTextContainer} onPress={onPressProfile}>
                        <Text style={feedCardStyle.feedHeaderUserName}>{item?.userName}</Text>
                        <Text style={feedCardStyle.feedHeaderTime}>{moment(item?.createdAt).local().startOf('seconds').fromNow() || ''}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onPressMenu}>
                    <IconEntypo name="dots-three-vertical" size={20} color={colors.grayShade8F} />
                </TouchableOpacity>
            </View> 
            <View style={feedCardStyle.mainFeedContainer}>
                <FeedImageLoader url={item?.postUrl}/>
                {item?.postDescription && <Text style={feedCardStyle.feedDescription}>
                    {item?.postDescription}
                </Text>}
            </View>
            <View style={feedCardStyle.FeedBottomContainer}>
                <Pressable style={feedCardStyle.likeContainer} onPress={onPressLike}>
                        <IconAntDesign 
                            name={item?.isLiked ? "heart" : "hearto"}  
                            size={25} 
                            color={item?.isLiked ? colorPalates.AppTheme.secondary : colorPalates.AppTheme.text}
                        />
                    <Text style={feedCardStyle.likeCount}>{item?.likeCount}</Text>
                </Pressable>
                <Pressable style={feedCardStyle.likeContainer} onPress={onPressComment}>
            		<IconMaterialIcons name="comment" size={25} color={colors.blueShade00}/>
         			<Text style={feedCardStyle.likeCount}>{item?.commentCount}</Text>
                </Pressable>
            <IconFontAwesome5 name="share" size={25} color={colorPalates.AppTheme.primary}/>
            </View>
        </View>
        <DeleteModal loading={deleteLoading} isVisible={visible} onClose={()=>setIsVisible(false)} onPressDelete={onPressDelete}/>
        </>
    )
}

export default memo(FeedCard);