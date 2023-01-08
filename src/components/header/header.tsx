import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import colorPalates from "../../theme/colorPalates";
import headerStyle from "./headerStyle";
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import screenNameEnum from "../../helper/screenNameEnum";
import { useUserData } from "../../redux/reducers/userSlice/userSlice";
import images from "../../theme/images";

export interface HeaderProps {
    title?: string,
    isBack?: boolean,
    isProfileSave?: boolean,
    onPressProfileSave?: ()=>void,
}

const Header = ({title='Header', isBack=false, isProfileSave=false,onPressProfileSave}:HeaderProps) => {
    
    const userData = useUserData();
    const naviagtion = useNavigation();

    const onPressProfile = () => {
        naviagtion.navigate(screenNameEnum.UserProfileScreen,{userId: userData?.userId});
    }

    const onPressBack = () => {
        naviagtion.goBack();
    }
    
    return(
        <SafeAreaView style={headerStyle.mainContainer}>
            <View style={headerStyle.container}>
                {
                    isBack ?
                    <TouchableOpacity style={headerStyle.iconContainer} onPress={onPressBack}>
                        <IconFeather name='chevron-left' color={colorPalates.AppTheme.text} size={25}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={onPressProfile}>
                        <Image
                            style={headerStyle.profileImage}
                            source={userData?.profilePicture ? { uri: userData?.profilePicture }: images.dp}
                            resizeMode={"cover"} 
                        />
                    </TouchableOpacity>
                }
                <Text style={headerStyle.headerTitle}>{title}</Text>
                {!isProfileSave ? <View style={headerStyle.emptyView}/> :
                <TouchableOpacity style={headerStyle.iconContainer} onPress={onPressProfileSave}>
                    <IconFeather name="user-check" size={25} color={colorPalates.AppTheme.text}/>
                </TouchableOpacity>}
            </View>
        </SafeAreaView>
    )
}

export default Header;