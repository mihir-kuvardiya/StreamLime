import React from "react"
import { Text, View, FlatList, SafeAreaView } from "react-native"
import { ms } from "react-native-size-matters";
import Header from "../../../components/header/header";
import FeedCard from "./FeedCard/feedCard";

const data = [
    {profileImageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        userName: 'Mihir',
        createdAt: '1 Days Ago',
        feedUrl: 'https://images.pexels.com/photos/5977791/pexels-photo-5977791.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        description: 'First Post here',
        isLiked: true,
        likeCount: '1.1k',
        commentCount: '1.1k'},
    {profileImageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        userName: 'Raj',
        createdAt: '2 Days Ago',
        feedUrl: 'https://images.pexels.com/photos/14690503/pexels-photo-14690503.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        description: 'second Post here',
        isLiked: false,
        likeCount: '2.1k',
        commentCount: '2.1k'},
    {profileImageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
        userName: 'Bhavin',
        createdAt: '3 Days Ago',
        feedUrl: 'https://images.pexels.com/photos/14417246/pexels-photo-14417246.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        description: 'third Post here',
        isLiked: true,
        likeCount: '3.1k',
        commentCount: '3.1k'},
    {profileImageUrl: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=600',
        userName: 'Jaydeep',
        createdAt: '4 Days Ago',
        feedUrl: 'https://images.pexels.com/photos/2946354/pexels-photo-2946354.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        description: 'fourth Post here',
        isLiked: false,
        likeCount: '4.1k',
        commentCount: '4.1k'}
]

const FeedList = () => {
    return(
        <SafeAreaView>
            <Header title="StreamLine"/>
            <FlatList 
                data={data}
                renderItem={({item,i})=>(<FeedCard item={item} key={i}/>)}
                showsVerticalScrollIndicator={false}
                disableVirtualization={true}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                maxToRenderPerBatch={5}
                windowSize={50}
                contentContainerStyle={{paddingBottom: 160}}
            />
        </SafeAreaView>
    )
}

export default FeedList;