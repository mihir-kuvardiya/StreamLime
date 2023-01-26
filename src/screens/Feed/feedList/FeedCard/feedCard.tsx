import React, { memo, useState } from "react";
import { Image, Text, View, Pressable } from "react-native";
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

export interface FeedCardProps{
    item: any,
}

const FeedCard = ({item}:FeedCardProps) => {
console.log('item',item)
    const userData = useUserData();
    const naviagtion:any = useNavigation();
    const [liked, setLiked] = useState(false);

    // firestore().collection('likes').doc(`LIKE#${item?.postId}#${userData?.userId}`).get()
    // .then((result)=>{
    //     console.log('called')
    //     if(result.exists){
    //         setLiked(true)
    //     }else{
    //         setLiked(false)
    //     }
    // }) 
    // .catch((err)=>{
    //     console.log(err,'error in get like ot not in feedCard');
    // })

    const onPressComment = () => {
        naviagtion.navigate(screenNameEnum.CommentScreen,{postId:item?.postId});
    }

    const onPressLike = () => {
        setLiked(!liked)
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
    
    return(
        <View style={feedCardStyle.feedContainer}>
            <View style={feedCardStyle.feedHeaderContainer}>
                <View style={feedCardStyle.feedHeaderSecondContainer}>
                    <Image
                        style={feedCardStyle.feedHeaderImage}
                        source={item?.profilePicture ? { uri: item?.profilePicture } : images.dp}
                        resizeMode={"cover"} 
                    />
                    <View style={feedCardStyle.feedHeaderTextContainer}>
                        <Text style={feedCardStyle.feedHeaderUserName}>{item?.userName}</Text>
                        <Text style={feedCardStyle.feedHeaderTime}>{moment(item?.createdAt).local().startOf('seconds').fromNow() || ''}</Text>
                    </View>
                </View>
                <IconEntypo name="dots-three-vertical" size={20} color={colors.grayShade8F} />
            </View> 
            <View style={feedCardStyle.mainFeedContainer}>
                {/* <Image
                    style={feedCardStyle.feedMainImage}
                    source={{
                        uri:item?.postUrl,
                    }}
                    resizeMode={"cover"} 
                /> */}
                <FeedImageLoader url={item?.postUrl}/>
                {item?.postDescription && <Text style={feedCardStyle.feedDescription}>
                    {item?.postDescription}
                </Text>}
            </View>
            <View style={feedCardStyle.FeedBottomContainer}>
                <Pressable style={feedCardStyle.likeContainer} onPress={onPressLike}>
                        <IconAntDesign 
                            name={liked ? "heart" : "hearto"}  
                            size={25} 
                            color={liked ? colorPalates.AppTheme.secondary : colorPalates.AppTheme.text}
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
    )
}

export default memo(FeedCard);