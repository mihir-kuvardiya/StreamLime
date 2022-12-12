import React from "react"
import { Text, View } from "react-native"
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
        commentCount: '2.1k'}
]

const FeedList = () => {
    return(
        <View>
            <Header title="StreamLine"/>
            <FeedCard item={data[0]}/>  
            <FeedCard item={data[1]}/>  
        </View>
    )
}

export default FeedList;