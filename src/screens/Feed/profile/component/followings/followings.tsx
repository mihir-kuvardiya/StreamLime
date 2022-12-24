import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../../theme/images";
import followingStyle from "./followingStyle";

const data = [
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin123',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
]

const FollowingsScreen = () => {

    const FollowingRow = ({item}) => {
        return(
        <View style={followingStyle.rowContainer}>
            <View style={followingStyle.rowSecondContainer}>
            <Image
                 style={followingStyle.image}
                 source={item?.imageUrl ? {
                     uri: item?.imageUrl,
                 } : images.dp}
                 resizeMode={"cover"} 
            />
            <Text style={followingStyle.userName}>{item?.userName}</Text>
            </View>
            {item?.isFollow ?
            <TouchableOpacity style={followingStyle.followingButton}>
                <Text style={followingStyle.followingText}>Following</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={followingStyle.followButton}>
                <Text style={followingStyle.followText}>Follow</Text>
            </TouchableOpacity>
            }
        </View>
        )
    }

    return(
        <View style={{flex:1}}>
        <FlatList 
            data={data}
            renderItem={({item,index})=>(<FollowingRow item={item} key={index}/>)}
            showsVerticalScrollIndicator={false}
            disableVirtualization={true}
            keyboardShouldPersistTaps="always"
            scrollEventThrottle={16}
            maxToRenderPerBatch={5}
            windowSize={50}
            contentContainerStyle={followingStyle.flatListContainer}
        />
        </View>
    )
}

export default FollowingsScreen;