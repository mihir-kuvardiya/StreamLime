import React, { useState } from "react";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { ms, ScaledSheet } from "react-native-size-matters";

interface FeedImageProps{
    url?:string;
}

const FeedImageLoader = ({url}:FeedImageProps) => {

    const windowDimensions = Dimensions.get('window');

    let imageAspectRatio=1;
    const [newAspectRatio, setNewAspectRatio] = useState(imageAspectRatio);

    const onLoadImage = (event: { nativeEvent: { width: number; height: number; }; }) => {
        setNewAspectRatio((event.nativeEvent.width)/event.nativeEvent.height)
    }

    return(
        <FastImage
            style={[style.feedMainImage,{aspectRatio:newAspectRatio,width:windowDimensions.width - 20}]}
            source={{
                uri:url,
                priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={onLoadImage}
        />
    )
}

export default FeedImageLoader;

export const style = ScaledSheet.create({
    feedMainImage:{
        borderRadius:ms(10)
    }
})