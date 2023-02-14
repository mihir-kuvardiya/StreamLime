import React, { useState } from "react";
import { Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import { ms, ScaledSheet } from "react-native-size-matters";
import ImageView from "react-native-image-viewing";

interface FeedImageProps{
    url?:string;
}

const FeedImageLoader = ({url}:FeedImageProps) => {

    let imageAspectRatio=1;
    const [newAspectRatio, setNewAspectRatio] = useState(imageAspectRatio);
    const [isVisible, setIsVisible] = useState(false);

    const onLoadImage = (event: { nativeEvent: { width: number; height: number; }; }) => {
        setNewAspectRatio((event.nativeEvent.width)/event.nativeEvent.height)
    }

    return(
        <>
        <Pressable onPress={()=>setIsVisible(true)}>
        <FastImage
            style={[style.feedMainImage,{aspectRatio:newAspectRatio}]}
            source={{
                uri:url,
                priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={onLoadImage}
        />
        </Pressable>
        <ImageView
            images={[{uri: url},]}
            imageIndex={0}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        />
        </>
    )
}

export default FeedImageLoader;

export const style = ScaledSheet.create({
    feedMainImage:{
        width:'100%',
        borderRadius:ms(10)
    }
})