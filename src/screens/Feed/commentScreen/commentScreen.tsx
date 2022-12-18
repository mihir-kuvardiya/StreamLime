import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import Header from "../../../components/header/header";
import commentScreenStyle from "./commentScreenStyle";
import CommentView from "./component/commentView";

const data = [
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
]

const CommentScreen = () => {
    return(
        <>
            <SafeAreaView>
                <Header isBack={true} title={'comments'}/>
            </SafeAreaView>
            <View style={commentScreenStyle.mainContainer}>
                <Text style={commentScreenStyle.totalComments}>
                    25.k Comments
                </Text>
            </View>
            <FlatList 
                data={data}
                renderItem={({item,index})=>(<CommentView item={item} key={index}/>)}
                showsVerticalScrollIndicator={false}
                disableVirtualization={true}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                maxToRenderPerBatch={5}
                windowSize={50}
                contentContainerStyle={{paddingBottom: 40}}
            />
        </>
    )
}

export default CommentScreen;