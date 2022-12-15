import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";
import screenNameEnum from "../../../../helper/screenNameEnum";

export interface imageLoaderProps{
    imageUrl:string;
}
const ImageLoader = ({imageUrl}:imageLoaderProps) => {

    const naviagtion = useNavigation();

    return(
        <TouchableOpacity onPress={()=>{
            naviagtion.navigate(screenNameEnum.FeedDetailScreen)
        }}
        style={{width:'49%',
        margin:ms(2)}}>
        <Image
            source={{uri: imageUrl}}
            resizeMode={'cover'}
            style={{
                width:'100%',
                // height:500,
                minHeight:ms(150),
                maxHeight:ms(300),
                borderRadius:ms(5)
            }}
        />
        </TouchableOpacity>
    )
}

export default memo(ImageLoader);