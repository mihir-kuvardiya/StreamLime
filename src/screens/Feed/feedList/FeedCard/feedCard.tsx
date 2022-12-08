import React from "react";
import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import IconEntypo from "react-native-vector-icons/Entypo"

const FeedCard = () => {
    return(
        <View>
            <View>
            <FastImage 
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={{color:'black',fontSize:16,fontWeight:'400'}}>@mihirKuvardiyait3</Text>
            <Text>2 days ago </Text>
            <IconEntypo name="dots-three-vertical" size={10} color={'red'}/>
            </View>
        </View>
    )
}

export default FeedCard