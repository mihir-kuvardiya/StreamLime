import React from "react";
import { Image, Text, View } from "react-native";
import images from "../../../../theme/images";
import commentViewStyle from "./commentViewStyle";

export interface commentViewProps{
    item:object;
}
const CommentView = ({item}:commentViewProps) =>{
    return(
        <View style={commentViewStyle.container}>
            <Image
                 style={commentViewStyle.image}
                 source={item?.imageUrl ? {
                     uri: item?.imageUrl,
                 } : images.dp}
                 resizeMode={"cover"} 
            />
            <View style={commentViewStyle.mainTextContainer}>
                <View style={commentViewStyle.userNameContainer}>
                    <Text style={commentViewStyle.userNameText}>{item?.userName}</Text>
                    <Text style={commentViewStyle.timeStamp}>{item?.createdAt}</Text>
                </View>
                <View style={commentViewStyle.commentTextContainer}>
                    <Text style={commentViewStyle.commentText}>
                        {item?.commentText}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default CommentView;