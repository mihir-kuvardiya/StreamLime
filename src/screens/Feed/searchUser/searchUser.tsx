import React, { useCallback, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import Header from "../../../components/header/header";
import colorPalates from "../../../theme/colorPalates";
import colors from "../../../theme/colors";
import searchUserScreenStyle from "./searchUserScreenStyle";
import firestore from '@react-native-firebase/firestore';
import { debounce } from "lodash";
import _ from "lodash";
import images from "../../../theme/images";
import { useNavigation } from "@react-navigation/native";
import screenNameEnum from "../../../helper/screenNameEnum";

const SearchUser = () => {

    const navigation:any = useNavigation();
    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState([])

    const changeTextDebouncer = _.debounce((text) =>{
        searchUser(text);
    },200);

    const searchUser = async (e) => {
        setUserName(e)
        try {
            const res = await firestore().collection('user').where('userName', '>=', e).where('userName', '<=', e+ '\uf8ff').get();
            setUserData(res._docs);
        } catch (error) {
            console.log(error,'error in search users')
        }
        
    }


    const UserRow = ({item}) => {

        console.log(item.data().userId,'iiiiiiiii')

        const onPressUserProfile = () => {
            navigation.navigate(screenNameEnum.UserProfileScreen,{userId: item.data().userId});
        }

        return(
            <View style={searchUserScreenStyle.rowContainer}>
                <TouchableOpacity style={searchUserScreenStyle.rowSecondContainer} onPress={onPressUserProfile}>
                <Image
                    style={searchUserScreenStyle.image}
                    source={item.data().profilePicture ? {
                        uri: item.data().profilePicture,
                    } : images.dp}
                    resizeMode={"cover"} 
                />
                <Text style={searchUserScreenStyle.userName}>{item.data().userName}</Text>
                </TouchableOpacity>
                <View/>
            </View>
        )
    }

    return(
        <>
            <SafeAreaView>
                <Header isBack={true} title={'search user'}/>
            </SafeAreaView>
            <View style={searchUserScreenStyle.searchBarContainer}>
                <View style={searchUserScreenStyle.searchIconContainer}>
                    <IconFeather name="search" size={20} color={colorPalates.AppTheme.border}/>
                </View>
                <TextInput 
                    placeholder="username" 
                    value={userName}
                    placeholderTextColor={colors.blackShade1B}
                    style={searchUserScreenStyle.searchBarTextInput}
                    onChangeText={(val)=>searchUser(val)}
                />
            </View>
            <FlatList
                data={userData}
                renderItem={({item,index})=>(<UserRow item={item} key={index}/>)}
            />
        </>
    )
}

export default SearchUser;