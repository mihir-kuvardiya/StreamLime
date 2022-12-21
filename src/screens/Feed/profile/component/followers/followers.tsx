import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import colorPalates from "../../../../../theme/colorPalates";
import images from "../../../../../theme/images";

const data = [
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin123',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin65465456',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin54',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin9632',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin78945',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin165',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
    {imageUrl: '',
    userName: 'Bhavin',
    createdAt: '3d',
    commentText: 'hey looking Nice and Pretty'},
]

const FollowersScreen = () => {

    const FollowerRow = ({item}) => {
        return(
        <View style={{flexDirection: 'row',
        marginHorizontal: ms(16),
        marginVertical: ms(3),
        padding:ms(5),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor:colorPalates.AppTheme.border,
        borderWidth:1,backgroundColor:colorPalates.white,borderRadius:ms(10)}}>
            <View style={{flexDirection:'row',alignItems:'center',}}>
            <Image
                 style={{height: ms(40),
                    width: ms(40),
                    borderRadius: ms(20),margin:ms(2)}}
                 source={item?.imageUrl ? {
                     uri: item?.imageUrl,
                 } : images.dp}
                 resizeMode={"cover"} 
            />
            <Text style={{color: colorPalates.AppTheme.text,
        fontSize: ms(15),
        marginLeft:ms(10),
        fontFamily:'Ubuntu-Regular'}}>{item?.userName}</Text>
            </View>
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
            contentContainerStyle={{paddingBottom: 40,paddingTop:ms(3)}}
        />
        </View>
    )
}

export default FollowersScreen;