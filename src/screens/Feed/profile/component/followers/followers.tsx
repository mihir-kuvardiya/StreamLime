import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";
import colorPalates from "../../../../../theme/colorPalates";
import images from "../../../../../theme/images";
import followersStyle from "./followersStyle";

const data = [
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin123',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty',
    isFollow: true},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty',
    isFollow: false},
]

const FollowersScreen = () => {

    const FollowerRow = ({item}) => {
        return(
        <View style={followersStyle.rowContainer}>
            <View style={followersStyle.rowSecondContainer}>
            <Image
                 style={followersStyle.image}
                 source={item?.imageUrl ? {
                     uri: item?.imageUrl,
                 } : images.dp}
                 resizeMode={"cover"} 
            />
            <Text style={followersStyle.userName}>{item?.userName}</Text>
            </View>
            {item?.isFollow ?
            <TouchableOpacity style={followersStyle.followingButton}>
                <Text style={followersStyle.followingText}>Following</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={followersStyle.followButton}>
                <Text style={followersStyle.followText}>Follow</Text>
            </TouchableOpacity>
            }
        </View>
        )
    }
    return(
        <View style={{flex:1}}>
        <FlatList 
            data={data}
            renderItem={({item,index})=>(<FollowerRow item={item} key={index}/>)}
            showsVerticalScrollIndicator={false}
            disableVirtualization={true}
            keyboardShouldPersistTaps="always"
            scrollEventThrottle={16}
            maxToRenderPerBatch={5}
            windowSize={50}
            contentContainerStyle={followersStyle.flatListContainer}
        />
        </View>
    )
}

export default FollowersScreen;