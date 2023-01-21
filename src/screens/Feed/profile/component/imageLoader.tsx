import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";
import screenNameEnum from "../../../../helper/screenNameEnum";

export interface imageLoaderProps{
    item: any
}
const ImageLoader = ({item}:imageLoaderProps) => {

    const naviagtion = useNavigation();

    return(
        <TouchableOpacity onPress={()=>{
            naviagtion.navigate(screenNameEnum.FeedDetailScreen,{postId: item._data?.postId})
        }}
        style={{width:'32.5%',
        margin:ms(1)}}>
        <Image
            source={{uri: item._data?.postUrl}}
            resizeMode={'cover'}
            style={{
                width:'100%',
                // height:500,
                height:ms(120),
                borderRadius:ms(5)
            }}
        />
        </TouchableOpacity>
    )
}

export default memo(ImageLoader);