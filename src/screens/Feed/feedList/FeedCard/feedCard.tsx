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

export interface FeedCardProps{
    item: object[],
    userProfile: object[],
}

const FeedCard = ({item,userProfile}:FeedCardProps) => {

    const naviagtion = useNavigation();
    const [liked, setLiked] = useState(false);

    console.log(userProfile,'uuuuuuuuu')

    const onPressComment = () => {
        naviagtion.navigate(screenNameEnum.CommentScreen);
    }
    return(
        <View style={feedCardStyle.feedContainer}>
            <View style={feedCardStyle.feedHeaderContainer}>
                <View style={feedCardStyle.feedHeaderSecondContainer}>
                    <Image
                        style={feedCardStyle.feedHeaderImage}
                        source={userProfile?.profilePicture ? { uri: userProfile?.profilePicture } : images.dp}
                        resizeMode={"cover"} 
                    />
                    <View style={feedCardStyle.feedHeaderTextContainer}>
                        <Text style={feedCardStyle.feedHeaderUserName}>{userProfile?.userName}</Text>
                        <Text style={feedCardStyle.feedHeaderTime}>{123}</Text>
                    </View>
                </View>
                <IconEntypo name="dots-three-vertical" size={20} color={colors.grayShade8F} />
            </View>
            <View style={feedCardStyle.mainFeedContainer}>
                <Image
                    style={feedCardStyle.feedMainImage}
                    source={{
                        uri:item?.postUrl,
                    }}
                    resizeMode={"cover"} 
                />
                {item?.postDescription && <Text style={feedCardStyle.feedDescription}>
                    {item?.postDescription}
                </Text>}
            </View>
            <View style={feedCardStyle.FeedBottomContainer}>
                <Pressable style={feedCardStyle.likeContainer} onPress={()=>setLiked(!liked)}>
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
    )
}

export default memo(FeedCard);