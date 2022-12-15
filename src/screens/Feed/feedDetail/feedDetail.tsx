import React from "react"
import { SafeAreaView } from "react-native"
import Header from "../../../components/header/header";
import FeedCard from "../feedList/FeedCard/feedCard";

const item ={
    profileImageUrl: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Jaydeep',
    createdAt: '4 Days Ago',
    feedUrl: 'https://images.pexels.com/photos/2946354/pexels-photo-2946354.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    description: 'fourth Post here',
    isLiked: false,
    likeCount: '4.1k',
    commentCount: '4.1k'
}

const FeedDetailScreen = () => {
    return(
        <>
        <SafeAreaView>
            <Header isBack={true} title={'Jaydeep'} />
        </SafeAreaView>
        <FeedCard 
            item={item}
        />
        </>
    )
}

export default FeedDetailScreen;